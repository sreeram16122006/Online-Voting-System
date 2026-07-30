import "../styles/About.css";
import { FaUniversity, FaUserShield, FaChartBar } from "react-icons/fa";

function About() {
  return (
    <section className="about" id="about">

      <div className="about-container">

        <div className="about-left">

          <span className="about-tag">
            ABOUT OUR PROJECT
          </span>

          <h2>
            Secure & Transparent
            <span> Online Election System</span>
          </h2>

          <p>
            Our Online Election Voting System is designed for colleges to
            conduct elections in a secure, transparent and efficient manner.
            Students can vote only once, while administrators can manage
            candidates, monitor elections and generate PDF reports instantly.
          </p>

          <div className="about-points">

            <div className="point">
              ✅ Secure Student Authentication
            </div>

            <div className="point">
              ✅ One Student - One Vote
            </div>

            <div className="point">
              ✅ Live Result & PDF Report
            </div>

            <div className="point">
              ✅ Admin Dashboard
            </div>

          </div>

        </div>

        <div className="about-right">

          <div className="about-card">

            <FaUniversity
              className="about-icon"
            />

            <h3>College Election</h3>

            <p>
              Designed especially for colleges and universities.
            </p>

          </div>

          <div className="about-card">

            <FaUserShield
              className="about-icon"
            />

            <h3>100% Secure</h3>

            <p>
              Encrypted login and one-time voting system.
            </p>

          </div>

          <div className="about-card">

            <FaChartBar
              className="about-icon"
            />

            <h3>Real-Time Results</h3>

            <p>
              Automatic vote counting with instant result display.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;