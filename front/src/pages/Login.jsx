import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Swal from "sweetalert2";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);  // Call the login function
      navigate("/");
    } catch (err) {
      // Show SweetAlert2 with the error message
      await Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: err.response?.data?.message || "An unexpected error occurred",
      });
    }
  };

  return (
      <div className="auth">
        <h1>Login</h1>
        <form>
          <input
              required
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
          />
          <input
              required
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
          />
          <button onClick={handleSubmit}>Login</button>
          <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
        </form>
      </div>
  );
};

export default Login;
