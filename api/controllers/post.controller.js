import * as postService from "../services/post.service.js";

// Get all posts
import { body, param, query, validationResult } from 'express-validator';

// Get multiple posts with category filter
export const getPosts = [
  query('cat').optional().isAlphanumeric().withMessage('Category must be alphanumeric'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const response = await postService.getPosts(req.query.cat);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(500).json(response.message);
    }
  }
];

// Get a single post by ID
export const getPost = [
  param('id').isUUID().withMessage('Invalid post ID'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const response = await postService.getPost(req.params.id);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(500).json(response.message);
    }
  }
];

// Add a new post
export const addPost = [
  body('title').isString().notEmpty().withMessage('Title is required'),
  body('content').isString().notEmpty().withMessage('Content is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const response = await postService.addPost(req.user, req.body);
    if (response.success) {
      return res.status(201).json(response);
    } else {
      return res.status(400).json(response.message);
    }
  }
];

// Delete a post by ID
export const deletePost = [
  param('id').isUUID().withMessage('Invalid post ID'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const response = await postService.deletePost(req.user, req.params.id);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(403).json(response.message);
    }
  }
];

// Update a post by ID
export const updatePost = [
  param('id').isUUID().withMessage('Invalid post ID'),
  body('title').optional().isString().withMessage('Title must be a string'),
  body('content').optional().isString().withMessage('Content must be a string'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const response = await postService.updatePost(req.user, req.body, req.params.id);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response.message);
    }
  }
];
