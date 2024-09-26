import * as postService from "../services/post.service.js";

// Input sanitization function
export const sanitizeInputValues = (values) => {
  Object.keys(values).forEach(key => {
    if (typeof values[key] === 'string') {
      values[key] = values[key].trim();
    }
  });
  return values;
};

// Get multiple posts with an optional category filter
export const getPosts = [
  async (req, res) => {
    try {
      const sanitizedQuery = sanitizeInputValues(req.query);
      const response = await postService.getPosts(sanitizedQuery.cat);

      if (response.success) {
        return res.status(200).json(response);
      } else {
        return res.status(500).json(response.message);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
];

// Get a single post by ID
export const getPost = [
  async (req, res) => {
    try {
      const response = await postService.getPost(req.params.id);

      if (response.success) {
        return res.status(200).json(response);
      } else {
        return res.status(500).json(response.message);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
];

// Add a new post
export const addPost = [
  async (req, res) => {
    try {
      const sanitizedBody = sanitizeInputValues(req.body);
      const response = await postService.addPost(req.user, sanitizedBody);

      if (response.success) {
        return res.status(201).json(response);
      } else {
        return res.status(400).json(response.message);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
];

// Delete a post by ID
export const deletePost = [
  async (req, res) => {
    try {
      const response = await postService.deletePost(req.user, req.params.id);

      if (response.success) {
        return res.status(200).json(response);
      } else {
        return res.status(403).json(response.message);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
];

// Update a post by ID
export const updatePost = [
  async (req, res) => {
    try {
      const sanitizedBody = sanitizeInputValues(req.body);
      const response = await postService.updatePost(req.user, sanitizedBody, req.params.id);

      if (response.success) {
        return res.status(200).json(response);
      } else {
        return res.status(400).json(response.message);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
];
