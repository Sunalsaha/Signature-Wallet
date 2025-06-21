import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  IconMenu2,
  IconLayoutDashboard,
  IconCreditCard,
  IconUserCircle,
  IconSettings,
  IconLogout2,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import "./Sidebar.scss";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open, isMobile]);

  const handleLogout = () => {
    if (window.confirm("Do you want to log out?")) {
      navigate("/login");
    }
  };

  const sidebarVariants = {
    expanded: {
      width: 260,
      x: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
    collapsed: {
      width: isMobile ? 0 : 260,
      x: isMobile ? "-100%" : 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  const menuItems = [
    { to: "/dashboard", icon: <IconLayoutDashboard size={22} />, label: "Dashboard" },
    { to: "/transactions", icon: <IconCreditCard size={22} />, label: "Transactions" },
    { to: "/profile", icon: <IconUserCircle size={22} />, label: "Profile" },
    { to: "/settings", icon: <IconSettings size={22} />, label: "Settings" },
  ];

  return (
    <div className="layout-wrapper">
      {/* Modern Toggle Button (Visible on Mobile Only) */}
      {isMobile && (
        <button
          className="sidebar-toggle-btn modern-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close sidebar" : "Open sidebar"}
          aria-expanded={open}
          aria-controls="sidebar"
          type="button"
        >
          <IconMenu2 size={22} stroke={2.2} />
        </button>
      )}

      {/* Sidebar overlay on mobile */}
      {isMobile && open && (
        <div className="sidebar-overlay" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <motion.div
        className="sidebar-container"
        variants={sidebarVariants}
        animate={open || !isMobile ? "expanded" : "collapsed"}
        initial={false}
      >
        <div className="sidebar-logo" id="sidebar">
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: open || !isMobile ? 1 : 0, y: open || !isMobile ? 0 : -5 }}
            transition={{ duration: 0.3 }}
            className="sidebar-label label-below"
          >
            Multi Signature Wallet
          </motion.span>
        </div>

        <div className="sidebar-links">
          {menuItems.map(({ to, icon, label }) => (
            <NavLink
              key={label}
              to={to}
              className="sidebar-link"
              data-tooltip={label}
              onClick={() => isMobile && setOpen(false)}
            >
              {icon}
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: open || !isMobile ? 1 : 0, x: open || !isMobile ? 0 : -10 }}
                transition={{ duration: 0.2 }}
                className="sidebar-label"
              >
                {label}
              </motion.span>
            </NavLink>
          ))}

          <button
            onClick={() => {
              handleLogout();
              if (isMobile) setOpen(false);
            }}
            className="sidebar-link logout-btn"
            data-tooltip="Logout"
          >
            <IconLogout2 size={22} />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: open || !isMobile ? 1 : 0, x: open || !isMobile ? 0 : -10 }}
              transition={{ duration: 0.2 }}
              className="sidebar-label"
            >
              Logout
            </motion.span>
          </button>
        </div>
      </motion.div>

      {/* Main content area */}
      <motion.div
        className="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default Sidebar;
