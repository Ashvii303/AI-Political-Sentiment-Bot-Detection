import "../styles/Footer.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-left">
        <h2>PolitiSense AI</h2>
        <p>
          AI-powered political sentiment analysis and intelligent bot
          detection platform.
        </p>
      </div>

      <div className="footer-center">
        <h3>Quick Links</h3>
        <a href="#">Home</a>
        <a href="#">Features</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>

      <div className="footer-right">
        <h3>Connect</h3>

        <div className="social-icons">
          <FaGithub />
          <FaLinkedin />
          <FaEnvelope />
        </div>
      </div>

    </footer>
  );
}

export default Footer;