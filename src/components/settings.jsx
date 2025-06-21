import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./settings.scss";
import StarBorder from "./StarBorder"; // Your styled wrapper component

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="settings-container">
      {/* Background Video */}
      <video
        className="background-video"
        src="/bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="overlay" />

      {/* Button with StarBorder Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="center-button"
      >
        <StarBorder
          as="div"
          color="#00f2fe"
          speed="5s"
          className="custom-star-button"
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="dashboard-btn"
          >
            ⬅ Back to Dashboard
          </button>
        </StarBorder>
      </motion.div>
    </div>
  );
};

export default Settings;
