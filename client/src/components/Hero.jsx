import { Link } from "react-router-dom";
import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-container">

        <div className="hero-left">

          <span className="tag">
            🗳 Secure College Election Platform
          </span>

          <h1>
            Online Election
            <br />
            <span>Voting System</span>
          </h1>

          <p>
            Conduct college elections securely with one vote per student,
            real-time result calculation, admin management, and PDF report
            generation.
          </p>

          <div className="hero-buttons">

            <Link to="/login" className="primary-btn">
              Student Login
            </Link>

            <Link to="/register" className="secondary-btn">
              Register Now
            </Link>

            <Link to="/admin" className="admin-btn">
              Admin Login
            </Link>

          </div>

          <div className="hero-stats">

            <div>
              <h2>1500+</h2>
              <p>Students</p>
            </div>

            <div>
              <h2>12</h2>
              <p>Candidates</p>
            </div>

            <div>
              <h2>100%</h2>
              <p>Secure</p>
            </div>

          </div>

        </div>

        <div className="hero-right">

          <div className="hero-image">

            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="hero-video"
            >
              <source src="/videos/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;