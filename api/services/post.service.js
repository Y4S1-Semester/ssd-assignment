import * as postRepository from "../repository/post.repository.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Fetch all posts
export const getPosts = async (category) => {
    try {
        const posts = await postRepository.getAllPosts(category);
        return { success: true, data: posts };
    } catch (error) {
        console.error("Error in getPosts service:", error);
        return { success: false, message: "Failed to retrieve posts." };
    }
};

// Fetch a single post
export const getPost = async (postId) => {
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
    try {
        const post = [
            postDetails.title,
            postDetails.desc,
            postDetails.img,
            postDetails.cat,
        ];

        await postRepository.updatePostById(post, postId, user.id);
        return { success: true, message: "Post has been updated." };
    } catch (error) {
        console.error("Error in updatePost service:", error);
        return { success: false, message: "Failed to update post." };
    }
};
