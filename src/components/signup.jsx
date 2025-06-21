import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Particles from "./particles.jsx";
import "./SignUp.scss";
import logo from "/$$.png";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  const navigate = useNavigate();
  const [isTriangle, setIsTriangle] = useState(false);
  const cursorRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    otp: "",
  });

  const [generatedOtp, setGeneratedOtp] = useState("");

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);

    setTimeout(() => {
      alert(`Demo OTP sent: ${otp}`);
      setShowOtpInput(true);
      setLoading(false);
    }, 1000);
  };

  const handleVerify = () => {
    if (!formData.otp.trim()) {
      alert("Please enter the OTP");
      return;
    }

    if (formData.otp !== generatedOtp) {
      alert("Incorrect OTP");
      setOtpError(true);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(
      (user) =>
        user.username === formData.username || user.email === formData.email
    );

    if (userExists) {
      alert("User with this username or email already exists.");
      return;
    }

    users.push({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    });

    localStorage.setItem("users", JSON.stringify(users));

    setShowPopup(true);
    setOtpError(false);
  };

  const handleResendOtp = () => {
    if (resendCount >= 3) {
      alert("Maximum OTP resend attempts reached.");
      return;
    }

    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setFormData((prev) => ({ ...prev, otp: "" }));
    setOtpError(false);
    setResendCount((prev) => prev + 1);

    setTimeout(() => {
      alert(`New OTP sent: ${newOtp}`);
    }, 500);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/login");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTriangle((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 10}px`;
        cursorRef.current.style.top = `${e.clientY - (isTriangle ? 20 : 10)}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isTriangle]);

  return (
    <div className="signup-page-wrapper">
      <Particles
        className="particles-background"
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleColors={["#ffffff", "#cccccc", "#999999"]}
        moveParticlesOnHover={true}
        particleHoverFactor={1}
        alphaParticles={false}
        particleBaseSize={100}
        sizeRandomness={1}
        cameraDistance={20}
        disableRotation={false}
      />

      <div
        ref={cursorRef}
        className={`custom-cursor ${isTriangle ? "triangle" : "circle"}`}
      />

      <div className="signup-container">
        <img src={logo} alt="Logo" className="signup-logo" />
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          <label htmlFor="username" className="animated-label">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            required
            value={formData.username}
            onChange={handleInputChange}
            disabled={showOtpInput}
          />

          <label htmlFor="email" className="animated-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            required
            value={formData.email}
            onChange={handleInputChange}
            disabled={showOtpInput}
          />

          <label htmlFor="password" className="animated-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            required
            value={formData.password}
            onChange={handleInputChange}
            disabled={showOtpInput}
          />

          <label htmlFor="phone" className="animated-label">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Enter phone number"
            required
            value={formData.phone}
            onChange={handleInputChange}
            disabled={showOtpInput}
          />

          {showOtpInput && (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
              >
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  required
                  value={formData.otp}
                  onChange={handleInputChange}
                  style={{
                    flex: 1,
                    marginRight: "0.5rem",
                    padding: "0.5rem",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
                <button
                  type="button"
                  onClick={handleVerify}
                  className="animated-button"
                  disabled={loading}
                  style={{ padding: "0.5rem 1rem" }}
                >
                  {loading ? <span className="loader"></span> : "Verify"}
                </button>
              </div>

              {otpError && (
                <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="animated-button"
                    style={{
                      backgroundColor: "#333",
                      padding: "0.4rem 0.8rem",
                      fontSize: "0.95rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    Resend OTP
                  </button>
                </div>
              )}
            </>
          )}

          {!showOtpInput && (
            <button
              type="submit"
              className="animated-button"
              disabled={loading}
              style={{ marginTop: "1rem" }}
            >
              {loading ? <span className="loader"></span> : "Sign Up"}
            </button>
          )}
        </form>

        {showPopup && (
          <div className="otp-modal-backdrop">
            <div className="otp-modal">
              <h3>Mobile Number Verified!</h3>
              <p>Thank you. Your account has been created.</p>
              <button onClick={handleClosePopup} className="animated-button">
                Close
              </button>
            </div>
          </div>
        )}

        <p className="switch-auth">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
