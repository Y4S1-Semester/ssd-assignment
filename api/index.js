import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import { ensureLoggedIn } from "connect-ensure-login";

const app = express();
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

app.get('/auth/google', passport.authenticate('openidconnect'));

app.get('/auth/google/callback',
    passport.authenticate('openidconnect', {
        failureRedirect: 'http://localhost:3000/login',
        failureMessage: true
    }),
    function(req, res) {
        res.redirect('http://localhost:3000/');
    });

app.get ('/auth/protected', isLoggedIn, (req, res) => {
  let name = req.user.displayName;
  res.send (`Hello ${name}!`);
});

app.get ('/auth/google/failure', (req, res) => {
  res.sendStatus ('Something went wrong!');
});

app.get('/auth/logout', (req, res) => {
    req.session.destroy();
    res.send('See you again!');
});

app.get('/login', passport.authenticate('openidconnect'));
app.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

var ensureLogged = ensureLoggedIn();

const upload = multer({ storage });
app.post('/api/upload', ensureLogged, upload.single('file'), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename)
})

app.use("/api/posts", ensureLogged, postRoutes);
app.use("/api/auth", authRoutes);

app.listen(8080, () => {
  console.log("Connected!!!!");
});
