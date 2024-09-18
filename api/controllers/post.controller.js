import * as postService from "../services/post.service.js";

// Get all posts
export const getPosts = async (req, res) => {
  const response = await postService.getPosts(req.query.cat);
  if (response.success) {
    return res.status(200).json(response);
  } else {
    return res.status(500).json(response.message);
  }
};

// Get a single post by ID
export const getPost = async (req, res) => {
  const response = await postService.getPost(req.params.id);
  if (response.success) {
    return res.status(200).json(response);
  } else {
    return res.status(500).json(response.message);
  }
};

// Add a new post
export const addPost = async (req, res) => {
  const response = await postService.addPost(req.user, req.body);
  if (response.success) {
    return res.status(201).json(response);
  } else {
    return res.status(400).json(response.message);
  }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
  const response = await postService.deletePost(req.user, req.params.id);
  if (response.success) {
    return res.status(200).json(response);
  } else {
    return res.status(403).json(response.message);
  }
};

// Update a post by ID
export const updatePost = async (req, res) => {
  const response = await postService.updatePost(req.user, req.body, req.params.id);
  if (response.success) {
    return res.status(200).json(response);
  } else {
    return res.status(400).json(response.message);
  }
};
