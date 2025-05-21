import React from 'react';
import '../stylesheets/Footer.css'; // Assuming you will create a separate CSS file for styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Made my Raunak Singh. All rights reserved.</p>

        <div className="footer-links">
          <a href="about" className="footer-link">About</a>
          <a href="services" className="footer-link">Services</a>
          <a href="contact" className="footer-link">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
