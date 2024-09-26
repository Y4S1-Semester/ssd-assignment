import { db } from "../db.js";

// Get all posts, optionally filtered by category
export const getAllPosts = (category) => {
    const query = category
        ? "SELECT * FROM posts WHERE cat=?"
        : "SELECT * FROM posts";
    return new Promise((resolve, reject) => {
        db.query(query, [category], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

// Get a single post by ID
export const getPostById = (postId) => {
    const query =
        "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [postId], (err, data) => {
            if (err) return reject(err);
            resolve(data[0]);
        });
    });
};

// Create a new post
export const createPost = (post) => {
    console.log(post)
    const query =
        "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)";
    return new Promise((resolve, reject) => {
        db.query(query, [post], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

// Delete a post by ID and user ID
export const deletePostById = (postId, userId) => {
    const query = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [postId, userId], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

// Update an existing post by ID and user ID
export const updatePostById = (post, postId, userId) => {
    const query =
        "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [...post, postId, userId], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};
