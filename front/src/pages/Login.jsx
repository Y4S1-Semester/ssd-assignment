import React, {useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Swal from "sweetalert2";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { googleLoginHandler } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    let formErrors = {};

    if (!inputs.username) {
      formErrors.username = "Username is required";
    }

    if (!inputs.password) {
      formErrors.password = "Password is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return; // If validation fails, do not proceed
    }

    try {
      await login(inputs);  // Call the login function
      navigate("/");
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Login failed",
        text: err.response?.data?.message || "An unexpected error occurred",
      });
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: '625034524799-1bm6rsgv0n93iupmcu0k4aeed6qqnt5u.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button"),
          { theme: "outline", size: "large" }
      );
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    const googleToken = response.credential;
    try {
      await googleLoginHandler(googleToken);
      console.log("Google login successful");

      // const user = JSON.parse(localStorage.getItem("user"));
      // console.log(user)
      // const response = await fetch('http://localhost:8080/api/protected', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${user.token}`
      //   },
      // });
      // if (!response.ok) {
      //   throw new Error("Failed to authenticate with Google");
      // }
      // const data = await response.json();
      // console.log(data)


      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error);
      await Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: error.response?.data?.message || "An unexpected error occurred",
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
          value={inputs.username}
        />
        {errors.username && <span className="error">{errors.username}</span>}
        
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={inputs.password}
        />
        {errors.password && <span className="error">{errors.password}</span>}
        
        <button onClick={handleSubmit}>Login</button>
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
        <span>
          <div id="google-signin-button"></div>
        </span>
      </form>
    </div>
  );
};

export default Login;
