import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './InfoPage.scss';

import './Mobile.scss'; // Import mobile styles
import StarBorder from './StarBorder';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX // ✅ Modern Twitter (X) logo
} from '@tabler/icons-react';

const infoPage = () => {
  const cubeSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const cube = entry.target.querySelector('.ai-cube');
        if (entry.isIntersecting) {
          cube?.classList.add('cube-rise');
        } else {
          cube?.classList.remove('cube-rise');
        }
      });
    }, { threshold: 0.3 });

    const section = cubeSectionRef.current;
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="info-page-container">
      <div className="page-wrapper">

        {/* Logo */}
        <div className="logo-top centered-logo">
          <div className="logo-main">Multi</div>
          <div className="logo-sub">Signature Wallet</div>
        </div>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          <Link to="/signup">
            <StarBorder as="div" className="auth-btn">Sign Up</StarBorder>
          </Link>
          <Link to="/login">
            <StarBorder as="div" className="auth-btn">Login</StarBorder>
          </Link>
        </div>

        {/* Info Section */}
        <div className="info-container">
          <div className="info-left">
            <div className="half-circle-bg" />
            <h1>
              One <span className="white-text">Wallet</span>
            </h1>
            <h2>
              Many <span className="blue-text">Safeguards</span>
            </h2>
            <p>
              A secure and user-friendly multisig wallet designed to protect your digital assets
              with layered approval systems.
            </p>
            <Link to="/signup">
              <StarBorder as="div" className="explore-button">EXPLORE NOW</StarBorder>
            </Link>
          </div>

          <div className="info-right">
            <div className="lock-wrapper">
              <img src="/image 1.png" alt="Secure Lock" className="lock-image" />
            </div>
          </div>
        </div>

        {/* AI Cube Section */}
        <div className="ai-cube-section fade-in-on-scroll" ref={cubeSectionRef}>
          <div className="ai-cube-left">
            <div className="ai-cone">
              <img src="/image 2.png" alt="AI Cube" className="ai-cube" />
              <img src="/image 3.png" alt="AI Hand" className="ai-hand" />
            </div>
          </div>

          <div className="ai-cube-right">
            <h2>
              <span className="highlight-purple">Smart  </span> &<br />
              <span className="bold-white"> Trust-Based</span>
            </h2>
            <p>
              A smart and trust-based system leverages intelligent automation with robust security, ensuring seamless functionality and user confidence. It blends AI-powered insights with transparent, multi-layered verification, fostering reliability and control. By prioritizing user safety and clarity, it builds a foundation where innovation meets accountability in every digital interaction.
            </p>
            <Link to="/signup">
              <button className="explore-smart">EXPLORE NOW</button>
            </Link>
          </div>
        </div>

        {/* Short & Catchy Section */}
        <div className="catchy-section">
          <div className="catchy-left">
            <h2>
              <span className="bold">Short &</span> <br />
              <span className="highlight">Catchy</span>
            </h2>
            <p>
              Our platform blends cutting-edge intelligence with trust-first design. Experience seamless interactions, real-time insights, and fortified protection—all in one place. From fast actions to future-ready solutions, we redefine convenience and security with style. Join the evolution. Be smart, be safe, be unstoppable—with us.
            </p>
            <Link to="/signup">
              <button className="explore-now">EXPLORE NOW</button>
            </Link>
          </div>
          <div className="catchy-right">
            <img src="/image 4.png" alt="Glowing Cubes" />
          </div>
        </div>

        {/* Modern Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-left">
              <h3>Multi Signature Wallet</h3>
              <p>Securing your digital future.</p>
            </div>

            <div className="footer-right">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms</a>
              <a href="#">Support</a>
            </div>

            <div className="social-icons">
              <a href="https://github.com/Sunalsaha" target="_blank" rel="noopener noreferrer">
                <IconBrandGithub />
              </a>
              <a href="https://www.linkedin.com/in/sunal-saha-9b258128b/" target="_blank" rel="noopener noreferrer">
                <IconBrandLinkedin />
              </a>
              <a href="https://x.com/sunalsaha5656" target="_blank" rel="noopener noreferrer">
                <IconBrandX /> {/* ✅ Modern X Logo */}
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            © {new Date().getFullYear()} Multi Signature Wallet. All rights reserved.
          </div>
        </footer>

        {/* Bottom Line Animation */}
        <div className="some-wrapper">
      
          <div className="bottom-line" />
        </div>
        
      </div> 
    </div>   
  );
};

export default infoPage;
