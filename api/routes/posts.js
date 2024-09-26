import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";
import {authenticateJWT} from "../middleware/authenticate.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", authenticateJWT, addPost);
router.delete("/:id", authenticateJWT, deletePost);
router.patch("/:id", authenticateJWT, updatePost);

export default router;
