import * as userService from "../services/user.service.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Call the service method and get the response
    const response = await userService.registerUser(username, email, password);

    // Pass the result back to the client
    if (response.success) {
      return res.status(201).json({ message: response.message });
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
      return res
          .cookie("access_token", response.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only secure cookies in production
            sameSite: "none",
          })
          .status(200)
          .json(response.user);
    } else {
      return res.status(403).json({ message: response.message });
    }
  } catch (error) {
    return res.status(500).json({ message: "An unexpected error occurred." });
  }
};

export const logout = (req, res) => {
  res
      .clearCookie("access_token", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json("User has been logged out.");
};
