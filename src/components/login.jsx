import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.scss";
import logo from "/$$.png"; // Make sure this path is correct

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isTriangle, setIsTriangle] = useState(false);
  const cursorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTriangle((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursor = cursorRef.current;
      if (cursor) {
        const cursorSize = 20;
        cursor.style.left = `${e.clientX - cursorSize / 2}px`;
        cursor.style.top = `${e.clientY - cursorSize / 2}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!identifier.trim() || !password.trim()) {
      toast.warn("Please fill in all fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (user) =>
        (user.email === identifier || user.username === identifier) &&
        user.password === password
    );

    if (matchedUser) {
      toast.success("Login successful!");

      // ✅ Store the logged-in user so the profile page can access it
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="app-wrapper">
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="particles">
        {[...Array(40)].map((_, i) => (
          <span key={i} className="particle"></span>
        ))}
      </div>

      <div ref={cursorRef} className={`custom-cursor ${isTriangle ? "triangle" : "circle"}`} />

      <div className="login">
        <div className="logo-title">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Login</h1>
        </div>

        <form onSubmit={submitHandler} autoComplete="off">
          <div>
            <label htmlFor="identifier">Username or Email:</label>
            <input
              type="text"
              id="identifier"
              placeholder="Enter your username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <div className="signup-redirect">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
