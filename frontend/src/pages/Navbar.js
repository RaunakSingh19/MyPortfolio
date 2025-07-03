import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GymLogo from "../assets/images/logo/logo.png";
import ButtonComponent from "../components/ButtonComponent";
import "../stylesheets/Navbar.css";

const NAV_LINKS = [
  { label: "ABOUT", path: "/about" },
  { label: "PROJECTS", path: "/projects" },
  { label: "CONTACT", path: "/contact" },
  { label: "BLOG", path: "/Blog" },
];

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
    setSidebarOpen(false);
  };

  return (
    <>
      <nav className="navbar-root">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img src={GymLogo} alt="Logo" className="logo" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="nav-links">
          {NAV_LINKS.map(link => (
            <Link key={link.path} to={link.path} className="nav-link">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="nav-cta">
          <ButtonComponent label="Login" onClick={handleLogin} />
        </div>

        {/* Hamburger Icon */}
        <button
          className="menu-icon"
          aria-label="Open navigation menu"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </nav>

      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar Menu */}
      <aside className={`sidebar-menu${sidebarOpen ? " open" : ""}`}>
        <button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close navigation menu">&times;</button>
        <div className="sidebar-logo">
          <img src={GymLogo} alt="Logo" style={{ height: 38 }} />
        </div>
        <div className="sidebar-links">
          {NAV_LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className="sidebar-link"
              onClick={() => setSidebarOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button className="sidebar-link sidebar-btn" onClick={handleLogin}>Admin</button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;