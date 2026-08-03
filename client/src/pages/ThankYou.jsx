import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import "../styles/ThankYou.css";

function ThankYou() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/result");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Confetti recycle={false} numberOfPieces={250} />

      <div className="thankyou-page">

        <div className="thankyou-card">

          <div className="check-icon">✅</div>

          <h1>Thank You For Voting!</h1>

          <p>
            Your vote has been submitted successfully.
          </p>

          <h3>
            Redirecting to Results...
          </h3>

        </div>

      </div>
    </>
  );
}

export default ThankYou;