import express from "express";
import {googleSignIn, login, register} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post('/google', googleSignIn);

export default router;
