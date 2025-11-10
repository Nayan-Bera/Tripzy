import React from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

const Nav: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <div className="logo-icon"></div>
          <div className="logo-text">
            <span className="logo-title">MyDearProperty</span>
            <span className="logo-subtitle">Convert Dreams into Reality</span>
          </div>
        </Link>

        {/* Navigation Menu */}
        <div className="nav-menu">
          <div className="nav-item dropdown">
            <span>Buy</span>
            <span className="dropdown-arrow">▼</span>
          </div>
          <div className="nav-item dropdown">
            <span>Rent</span>
            <span className="dropdown-arrow">▼</span>
          </div>
          <div className="nav-item dropdown">
            <span>Sell</span>
            <span className="dropdown-arrow">▼</span>
          </div>
          <Link to="/about" className="nav-item">
            About
          </Link>
          <Link to="/contact" className="nav-item">
            Contact Us
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="nav-actions">
          <button className="prime-btn">
            <span className="crown-icon">👑</span>
            Be Prime
          </button>
          <button className="post-property-btn">
            Post Free Property
          </button>
          <div className="auth-links">
            <Link to="/login" className="auth-link">Sign In</Link>
            <Link to="/register" className="auth-link">Join Free</Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Nav;