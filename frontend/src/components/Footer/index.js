import React from "react";
import "./Footer.css"; // Make sure to create this CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="https://github.com/ChrisBeaman11" className="footer-link">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/christopher-beaman-2a852b153/" className="footer-link">
          LinkedIn
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} This is a project unaffiliated with airbnb.</p>
    </footer>
  );
}

export default Footer;
