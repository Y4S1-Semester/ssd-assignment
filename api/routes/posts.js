import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";
// import {authenticate} from "../middleware/authenticate.js";
import { authenticate } from "../middleware/authenticate-auth.js";
const router = express.Router();
console.log(authenticate)
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", authenticate, addPost);
router.delete("/:id", authenticate, deletePost);
router.patch("/:id", authenticate, updatePost);

export default router;
