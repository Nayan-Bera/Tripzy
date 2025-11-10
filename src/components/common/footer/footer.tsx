import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">MyDearProperty</h3>
          <p className="footer-tagline">Convert Dreams into Reality</p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            <li><Link to="/buy">Buy Property</Link></li>
            <li><Link to="/rent">Rent Property</Link></li>
            <li><Link to="/sell">Sell Property</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Legal</h4>
          <ul className="footer-links">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 MyDearProperty. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;