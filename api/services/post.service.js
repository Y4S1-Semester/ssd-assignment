import * as postRepository from "../repository/post.repository.js";
import Joi from "joi";
import dotenv from "dotenv";
import moment from "moment";  // Add moment.js for custom date validation

dotenv.config();

// Validation Schemas
const postSchema = Joi.object({
    title: Joi.string().trim().min(3).max(255).required(),
    desc: Joi.string().min(10).required(),
    img: Joi.string().pattern(/\.(jpeg|jpg|png|gif)$/i).optional(),
    cat: Joi.string().required(),
    date: Joi.string().optional(),
});

const userSchema = Joi.object({
    id: Joi.string().uuid().required(),
});

// Fetch all posts
const categorySchema = Joi.string().max(100).alphanum().optional();

// Service function to fetch posts with input validation
export const getPosts = async (category) => {
    // Validate the category input to prevent harmful input
    const { error } = categorySchema.validate(category);
    if (error) {
        return { success: false, message: "Invalid category input." };
    }

    try {
        // Safely fetch posts from the repository
        const posts = await postRepository.getAllPosts(category);
        return { success: true, data: posts };
    } catch (error) {
        console.error("Error in getPosts service:", error);
        return { success: false, message: "Failed to retrieve posts." };
    }
};

// Fetch a single post
export const getPost = async (postId) => {
    // Validate that postId is an integer
    const { error: postIdError } = Joi.number().integer().min(1).validate(postId);
    if (postIdError) {
        return { success: false, message: "Invalid Post ID. It must be a positive integer." };
    }
    
    
    try {
        const post = await postRepository.getPostById(postId);
        
            return { success: true, data: post };
        
    } catch (error) {
        console.error("Error in getPost service:", error);
        return { success: false, message: "Failed to retrieve post." };
    }
};

// Add a new post
export const addPost = async (user, postDetails) => {
    

    const { error } = postSchema.validate(postDetails);
    if (error) {
        return { success: false, message: error.details[0].message };
    }

    try {
        const post = [
            postDetails.title,
            postDetails.desc,
            postDetails.img,
            postDetails.cat,
            postDetails.date,
            user.id,
        ];

        await postRepository.createPost(post);
        return { success: true, message: "Post has been created." };
    } catch (error) {
        console.error("Error in addPost service:", error);
        return { success: false, message: "Failed to create post." };
    }
};

// Delete a post
export const deletePost = async (user, postId) => {
    

    const { error: postIdError } = Joi.number().integer().min(1).validate(postId);
    if (postIdError) {
        return { success: false, message: "Invalid Post ID. It must be a positive integer." };
    }
    const existingPost = await postRepository.getPostById(postId);
    if (!existingPost) {
        return { success: false, message: "Post not found." };
    }
    try {
        await postRepository.deletePostById(postId, user.id);
        return { success: true, message: "Post has been deleted." };
    } catch (error) {
        console.error("Error in deletePost service:", error);
        return { success: false, message: "Failed to delete post." };
    }
};

// Update a post
export const updatePost = async (user, postDetails, postId) => {
    // Validate that postId is a positive integer
    const { error: postIdError } = Joi.number().integer().min(1).validate(postId);
    if (postIdError) {
        return { success: false, message: "Invalid Post ID. It must be a positive integer." };
    }

    try {
        // Check if the post exists before attempting to update
        const existingPost = await postRepository.getPostById(postId);
        if (!existingPost) {
            return { success: false, message: "Post not found." };
        }

        // Validate postDetails against your postSchema
        const { error } = postSchema.validate(postDetails);
        if (error) {
            return { success: false, message: error.details[0].message };
        }

        // Prepare the post data for the update
        const post = [
            postDetails.title,
            postDetails.desc,
            postDetails.img,
            postDetails.cat,
        ];

        // Update the post in the repository
        await postRepository.updatePostById(post, postId, user.id);
        return { success: true, message: "Post has been updated." };
    } catch (error) {
        console.error("Error in updatePost service:", error);
        return { success: false, message: "Failed to update post." };
    }
};
