import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./css/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        if (result.data.message === "Success") {
          localStorage.setItem('userEmail', result.data.user.email);
          setSuccessMessage("Successfully logged in!");
          setTimeout(() => navigate('/home'), 2000);
        } else {
          setError(result.data.message);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError("An error occurred during login.");
        setIsLoading(false);
      });
  };

  return (
    <div className="game-container">
      <div className="overlay"></div>
      <div className="login-box">
        <h2 className="text-center game-title">🍌 Game Login</h2>
        {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email:</strong></label>
            <input
              type="email"
              placeholder="Enter email"
              autoComplete="off"
              name="email"
              className="form-control game-input"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password:</strong></label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control game-input"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success game-btn w-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : "Login"}
          </button>
        </form>
        <p className="text-center mt-3">Don't have an account?</p>
        <Link to="/register" className="btn btn-default game-signup-btn w-100 text-decoration-none">Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
