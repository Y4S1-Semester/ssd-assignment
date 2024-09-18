import { createContext, useEffect, useState } from "react";
import {loginUser} from "../service/auth.service";

export const AuthContext = createContext(undefined, undefined);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
      JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const userData = await loginUser(inputs);  // Use loginUser from auth.service.js
      setCurrentUser(userData);
    } catch (err) {
      console.error("Login failed:", err);
      throw err;  // Re-throw the error so that it can be handled in the component
    }
  };

  const logout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("user");

    // Set currentUser to null
    setCurrentUser(null);
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
      <AuthContext.Provider value={{ currentUser, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};
