import "../styles/HowItWorks.css";

function HowItWorks() {
  return (
    <section className="howitworks">

      <div className="title">

        <h2>How It Works</h2>

        <p>
          Complete your election in four simple steps.
        </p>

      </div>

      <div className="timeline">

        <div className="step">

          <div className="circle">1</div>

          <h3>Register</h3>

          <p>Create your student account.</p>

        </div>

        <div className="arrow">➜</div>

        <div className="step">

          <div className="circle">2</div>

          <h3>Login</h3>

          <p>Login with your credentials.</p>

        </div>

        <div className="arrow">➜</div>

        <div className="step">

          <div className="circle">3</div>

          <h3>Vote</h3>

          <p>Cast your vote securely.</p>

        </div>

        <div className="arrow">➜</div>

        <div className="step">

          <div className="circle">4</div>

          <h3>Result</h3>

          <p>View election winner instantly.</p>

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;