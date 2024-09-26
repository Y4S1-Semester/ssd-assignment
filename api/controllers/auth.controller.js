import * as userService from "../services/user.service.js";
import {handleGoogleSignIn, verifyGoogleToken} from "../services/user.service.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Call the service method and get the response
    const response = await userService.registerUser(username, email, password);

    // Pass the result back to the client
    if (response.success) {
      return res.status(201).json({ message: response });
    } else {
      return res.status(400).json({ message: response.message });
    }
  } catch (error) {
    return res.status(500).json({ message: "An unexpected error occurred." });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Call the service method and get the response
    const response = await userService.loginUser(username, password);

    // Pass the result back to the client
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(403).json({ message: response.message });
    }
  } catch (error) {
    return res.status(500).json({ message: "An unexpected error occurred." });
  }
};

export const googleSignIn = async (req, res) => {
  const { token } = req.body;

  try {
    const googleUser = await verifyGoogleToken(token);
    const jwtToken = await handleGoogleSignIn(googleUser);

    res.json({ token: jwtToken });
  } catch (error) {
    console.error('Google Authentication Error:', error);
    res.status(401).json({ message: 'Invalid Google token' });
  }
};
