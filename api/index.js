import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import {rateLimiter} from "./middleware/rateLimiter.js";
import helmet from "helmet";
import cors from "cors";

const app = express();
app.use(helmet.frameguard({ action: 'deny' }));
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(cookieParser());
app.use(rateLimiter);

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
