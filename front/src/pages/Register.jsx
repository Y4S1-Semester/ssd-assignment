import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { registerUser } from "../service/auth.service";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Basic email regex for validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = () => {
    let formErrors = {};

    // Username validation
    if (!inputs.username) {
      formErrors.username = "Username is required";
    }

    // Email validation
    if (!inputs.email) {
      formErrors.email = "Email is required";
    } else if (!validateEmail(inputs.email)) {
      formErrors.email = "Invalid email format";
    }

    // Password validation
    if (!inputs.password) {
      formErrors.password = "Password is required";
    } else if (inputs.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return; // If validation fails, prevent form submission
    }

    try {
      // Use the service to make the API call
      await registerUser(inputs);

      // Show success message using Swal
      await Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You can now login with your new account.",
        showConfirmButton: true,
      });

      // Redirect to login after successful registration
      navigate("/login");
    } catch (err) {
      // Handle error using Swal
      await Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.message || "An unexpected error occurred.",
      });
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
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
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          value={inputs.email}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={inputs.password}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <button onClick={handleSubmit}>Register</button>
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
