import axios from "axios";

// API call for user login
export const loginUser = async (inputs) => {
    try {
        const response = await axios.post("/auth/login", inputs);
        return response.data;  // Return the user data on successful login
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

// API call to register a new user
export const registerUser = async (userData) => {
    return await axios.post("/auth/register", userData);
};
