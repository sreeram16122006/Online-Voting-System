import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/Vote.css";

function Vote() {

  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {

      const localStudent = JSON.parse(localStorage.getItem("student"));

      if (!localStudent) {
        alert("Please Login Again");
        navigate("/login");
        return;
      }

      const [candidateRes, userRes] = await Promise.all([
        API.get("/candidates"),
        API.get("/users"),
      ]);

      setCandidates(candidateRes.data.data);

      const updatedStudent = userRes.data.data.find(
        (u) => u._id === localStudent._id
      );

      if (updatedStudent) {

        localStorage.setItem(
          "student",
          JSON.stringify(updatedStudent)
        );

        setStudent(updatedStudent);

      }

    } catch (err) {

      console.log(err);

      alert("Failed to Load Data");

    } finally {

      setLoading(false);

    }
  };

  const vote = async (candidateId) => {

    if (student.hasVoted) {
      alert("You have already voted.");
      return;
    }

    if (!window.confirm("Are you sure you want to vote?")) return;

    try {

      const res = await API.post("/votes/cast", {
        userId: student._id,
        candidateId,
      });

      const updatedStudent = {
        ...student,
        hasVoted: true,
      };

      setStudent(updatedStudent);

      localStorage.setItem(
        "student",
        JSON.stringify(updatedStudent)
      );

      alert(res.data.message || "Vote Submitted Successfully");

      // ✅ Thank You Page
      navigate("/thankyou");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message || "Voting Failed"
      );

    }

  };

  return (

    <div className="vote-page">

      <h1>🗳 Cast Your Vote</h1>

      <p>Select your preferred candidate carefully.</p>

      {loading || !student ? (

        <h2>Loading...</h2>

      ) : (

        <div className="candidate-grid">

          {candidates.map((candidate) => (

            <div
              className="candidate-card"
              key={candidate._id}
            >

              <img
                className="candidate-photo"
                src={candidate.photo}
                alt={candidate.name}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/150?text=No+Photo";
                }}
              />

              <h2>{candidate.name}</h2>

              <p>{candidate.department}</p>

              {candidate.symbol && (

                <div className="symbol-box">

                  <h4>Election Symbol</h4>

                  <img
                    className="candidate-symbol"
                    src={candidate.symbol}
                    alt="Symbol"
                  />

                </div>

              )}

              <button
                disabled={student.hasVoted}
                onClick={() => vote(candidate._id)}
              >

                {student.hasVoted
                  ? "Already Voted"
                  : "Vote Now"}

              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default Vote;