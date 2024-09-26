import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import {OAuth2Client} from 'google-auth-library';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import multer from "multer";
import {authenticateJWT} from "./middleware/authenticate.js";
import {createUser, findUserByEmailOrUsername} from "./repository/user.repository.js";
import cors from "cors";

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(cookieParser());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

async function verifyGoogleToken(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
}

app.post('/api/auth/google', async (req, res) => {
    const {token} = req.body;

    try {
        const googleUser = await verifyGoogleToken(token);

        let user = await findUserByEmailOrUsername(googleUser.email, null)
        if (!user) {
            await createUser(googleUser.name, googleUser.email, googleUser.sub)
        }

        const jwtToken = jwt.sign(
            {userId: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );

        res.json({token: jwtToken});
    } catch (error) {
        console.error('Google Authentication Error:', error);
        res.status(401).json({message: 'Invalid Google token'});
    }
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../front/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  },
});


const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename)
})

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

app.listen(8080, () => {
  console.log("Connected!!!!");
});
