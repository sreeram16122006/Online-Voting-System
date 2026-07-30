import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-box">

          <h2>🗳 VoteSecure</h2>

          <p>
            A secure and transparent Online Election Voting System
            developed for college elections.
          </p>

        </div>

        <div className="footer-box">

          <h3>Quick Links</h3>

          <ul>

            <li><a href="#home">Home</a></li>

            <li><a href="#features">Features</a></li>

            <li><a href="#about">About</a></li>

          </ul>

        </div>

        <div className="footer-box">

          <h3>Services</h3>

          <ul>

            <li>Student Registration</li>

            <li>Online Voting</li>

            <li>Live Results</li>

            <li>PDF Report</li>

          </ul>

        </div>

        <div className="footer-box">

          <h3>Contact</h3>

          <p>📧 votesecure@gmail.com</p>

          <p>📞 +91 9876543210</p>

          <p>📍 Tamil Nadu, India</p>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 VoteSecure | Online Election Voting System | All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;