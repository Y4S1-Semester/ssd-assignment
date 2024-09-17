import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as userRepository from "../repository/user.repository.js";

dotenv.config();

export const registerUser = async (username, email, password) => {
    try {
        // Check if the user already exists
        const existingUsers = await userRepository.findUserByEmailOrUsername(email, username);
        if (existingUsers.length) {
            return { success: false, message: "User already exists!" };
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create the user
        await userRepository.createUser(username, email, hashedPassword);
        return { success: true, message: "User has been created." };
    } catch (error) {
        console.error("Error in registerUser service:", error);

        if (error.code === "ER_NO_SUCH_TABLE") {
            return { success: false, message: "Database error: Required table is missing." };
        }

        // Handle general errors
        return { success: false, message: "An error occurred during registration. Please try again later." };
    }
};

export const loginUser = async (username, password) => {
    try {
        // Find the user by username
        const users = await userRepository.findUserByUsername(username);
        if (users.length === 0) {
            return { success: false, message: "User not found!" };
        }

        const user = users[0];

        // Check if the password is correct
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return { success: false, message: "Wrong username or password!" };
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        const { password: userPassword, ...otherUserData } = user;
        return { success: true, token, user: otherUserData };
    } catch (error) {
        console.error("Error in loginUser service:", error);

        if (error.code === "ER_NO_SUCH_TABLE") {
            return { success: false, message: "Database error: Required table is missing." };
        }

        return { success: false, message: "An error occurred during login. Please try again later." };
    }
};
