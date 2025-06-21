import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./profile.scss";
import { UserCircle } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const cursorRef = useRef(null);
  const [isTriangle, setIsTriangle] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!userData) {
      alert("No user logged in. Redirecting to login.");
      return navigate("/login");
    }

    setProfile({
      name: userData.username || "",
      email: userData.email || "",
      phone: userData.phone || "",
      bio: "", // default empty; can be modified
    });
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Profile Updated:\n${JSON.stringify(profile, null, 2)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("Logged out.");
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

  return (
    <div className="profile-wrapper">
      <div
        ref={cursorRef}
        className={`custom-cursor ${isTriangle ? "triangle" : "circle"}`}
      />

      <div className="profile-container">
        <div className="profile-header">
          <UserCircle size={48} />
          <h2>Profile</h2>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            readOnly
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            readOnly
          />

          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            readOnly
          />

          <label>Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Write something about yourself..."
          />

          <button type="submit">Update Profile</button>
        </form>

        <Link
          to="/dashboard"
          style={{ marginTop: "1rem", display: "inline-block", color: "#00ffe0" }}
        >
          Back to Dashboard
        </Link>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
