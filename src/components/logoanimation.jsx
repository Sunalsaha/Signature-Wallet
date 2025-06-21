import React, { useEffect, useState } from 'react';
import './logoanimation.scss';
import logo from "/$$.png"; // Adjust the path as necessary

const LogoAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="logo-animation">
      <div className="logo-container">
        <img src={logo} alt="App Logo" className="logo" />
        <h1 className="logo-text">MULTI-SIGNATURE WALLET</h1>
      </div>
    </div>
  );
};

export default LogoAnimation;
