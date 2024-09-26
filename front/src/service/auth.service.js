import axios from "axios";

export const loginUser = async (inputs) => {
    try {
        const response = await axios.post("http://localhost:8080/auth/login", inputs);
        return response.data;  // Return the user data on successful login
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    return await axios.post("http://localhost:8080/auth/register", userData);
};

export const googleLogin = async (googleToken) => {
    const response = await fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: googleToken }),
    });

    if (!response.ok) {
        throw new Error("Failed to authenticate with Google");
    }

    return await response.json();
};
