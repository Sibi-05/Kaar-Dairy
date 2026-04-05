import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-overlay">
        

        <div className="footer-section">
          <h2>Kaar Dairy</h2>
          <p>Fresh dairy products delivered to your home.</p>
        </div>

     
        <div className="footer-section">
          <h3>Quick Links</h3>
          <p>Home</p>
          <p>About</p>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>+91 9876543210</p>
          <p>kaardairy@gmail.com</p>
        </div>

      </div>


      <div className="footer-bottom">
        © 2026 Kaar Dairy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;