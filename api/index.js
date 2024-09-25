import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import session from "express-session";
import passport from "passport";
import cors from "cors"

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

import './auth.passport.js';

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use (
  session ({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},
  })
);
app.use (passport.initialize ());
app.use (passport.session ());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../front/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  },
});

function isLoggedIn (req, res, next) {
  req.user ? next () : res.sendStatus (401);
}
app.get (
  '/auth/google',
  passport.authenticate ('google', {
    scope: ['email'],
  })
);

app.get (
  '/auth/google/callback',
  passport.authenticate ('google', {
    successRedirect: '/auth/protected',
    failureRedirect: '/auth/google/failure',
  })
);

app.get ('/auth/protected', isLoggedIn, (req, res) => {
  let name = req.user.displayName;
  res.send (`Hello ${name}!`);
});
app.get ('/auth/google/failure', (req, res) => {
  res.sendStatus ('Something went wrong!');
});

app.get ('/auth/logout', (req, res) => {
  req.session.destroy ();
  res.send ('See you again!');
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
