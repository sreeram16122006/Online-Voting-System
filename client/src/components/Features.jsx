import "../styles/Features.css";

function Features() {
  return (
    <section className="features" id="features">

      <div className="section-title">

        <h2>Why Choose VoteSecure?</h2>

        <p>
          A secure, transparent and user-friendly platform designed
          for conducting college elections digitally.
        </p>

      </div>

      <div className="feature-grid">

        <div className="feature-card">

          <div className="icon">🔐</div>

          <h3>Secure Login</h3>

          <p>
            Student authentication with encrypted password security.
          </p>

        </div>

        <div className="feature-card">

          <div className="icon">🗳</div>

          <h3>One Vote Only</h3>

          <p>
            Every student can vote only once with duplicate protection.
          </p>

        </div>

        <div className="feature-card">

          <div className="icon">📊</div>

          <h3>Live Result</h3>

          <p>
            Instant vote counting and automatic winner calculation.
          </p>

        </div>

        <div className="feature-card">

          <div className="icon">📄</div>

          <h3>PDF Report</h3>

          <p>
            Export election results as a professional PDF report.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Features;