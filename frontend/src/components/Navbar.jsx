import "../styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>

      <div className="logo">
        <Link to="/" className="logo-link">
          PolitiSense AI
        </Link>
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <a href="#features">Features</a>
        </li>

        <li>
          <a href="#about">About</a>
        </li>

        <li>
          <a href="#contact">Contact</a>
        </li>

      </ul>

      <Link to="/login">
        <button className="login-btn">
          Login
        </button>
      </Link>

    </nav>
  );
}

export default Navbar;