import axios from "axios";

// Fetch posts related to the category
export const fetchPostsByCategory = async (cat) => {
    try {
        const response = await axios.get(`/posts/?cat=${cat}`);
        return response.data.data; // Adjust based on response
    } catch (error) {
        console.error("Error fetching posts by category:", error);
        throw error;
    }
};

// Fetch a single post by postId
export const fetchPostById = async (postId) => {
    try {
        const response = await axios.get(`/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
};

// Delete a post by postId
export const deletePostById = async (postId) => {
    try {
        const response = await axios.delete(`/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};

// API call to create a new post
export const createPost = async (postData) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.post('/posts/', postData, {
            headers: {
                Authorization: `Bearer ${user.token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

// API call to update an existing post
export const updatePost = async (postId, postData) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.put(`/posts/${postId}`, postData, {
            headers: {
                Authorization: `Bearer ${user.token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};

// API call to upload an image
export const uploadImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.post('/upload', formData, {
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};
