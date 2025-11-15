import React from 'react';
import './footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>MyDearProperty</h3>
            <p>Convert Dreams into Reality</p>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <div className="footer-links">
              <a href="/about">About Us</a>
              <a href="/contact">Contact</a>
              <a href="/careers">Careers</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <div className="footer-links">
              <a href="/buy">Buy Property</a>
              <a href="/rent">Rent Property</a>
              <a href="/sell">Sell Property</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <div className="footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 MyDearProperty. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;