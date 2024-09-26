import { createContext, useEffect, useState } from "react";
import { loginUser, googleLogin } from "../service/auth.service";  // Import googleLogin

export const AuthContext = createContext(undefined, undefined);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
      JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const userData = await loginUser(inputs);
      setCurrentUser(userData);
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const googleLoginHandler = async (googleToken) => {
    try {
      const userData = await googleLogin(googleToken);
      console.log(userData)
      setCurrentUser(userData);
    } catch (err) {
      console.error("Google login failed:", err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
      <AuthContext.Provider value={{ currentUser, login, googleLoginHandler, logout }}>
        {children}
      </AuthContext.Provider>
  );
};
