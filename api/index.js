import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import {authenticate} from "./middleware/authenticate-auth.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

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

app.get("/api/protected", authenticate, (req, res) => {
  res.json({ message: "You are authenticated!", user: req.user });
});

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

app.listen(8800, () => {
  console.log("Connected!!!!");
});
