import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <div className="container">

        <div className="logo">
          <h2>🗳 VoteSecure</h2>
        </div>

        <nav>

          <a href="#home">Home</a>

          <a href="#features">Features</a>

          <a href="#about">About</a>

        </nav>

        <div className="buttons">

          <Link to="/login" className="login-btn">
            Student Login
          </Link>

          <Link to="/register" className="register-btn">
            Register
          </Link>

          <Link to="/admin" className="admin-btn">
            Admin Login
          </Link>

        </div>

      </div>

    </header>
  );
}

export default Navbar;