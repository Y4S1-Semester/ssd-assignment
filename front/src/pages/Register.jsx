import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {registerUser} from "../service/auth.service";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      // Optionally, set the error in the state if needed
      setError(err.response?.data);
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
          />
          <input
              required
              type="email"
              placeholder="email"
              name="email"
              onChange={handleChange}
          />
          <input
              required
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
          />
          <button onClick={handleSubmit}>Register</button>
          {err && <p>{err}</p>}
          <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
        </form>
      </div>
  );
};

export default Register;
