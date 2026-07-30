import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/Vote.css";

function Vote() {

  const [candidates, setCandidates] = useState([]);

  const [loading, setLoading] = useState(true);

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {

    try {

      const res = await API.get("/candidates");

      setCandidates(res.data.data);

    } catch (err) {

      console.log(err);

      alert("Failed to load candidates");

    } finally {

      setLoading(false);

    }

  };

  const vote = async (candidateId) => {

    if (student.hasVoted) {

      alert("You have already voted.");

      return;

    }

    const confirmVote = window.confirm(
      "Are you sure you want to vote for this candidate?"
    );

    if (!confirmVote) return;

    try {

      const res = await API.post("/votes/cast", {
        userId: student._id,
        candidateId: candidateId,
      });

      alert(
        res.data.message ||
        "Vote Submitted Successfully"
      );

      student.hasVoted = true;

      localStorage.setItem(
        "student",
        JSON.stringify(student)
      );

      window.location.href = "/result";

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Voting Failed"
      );

    }

  };
  return (
  <div className="vote-page">

    <h1>🗳 Cast Your Vote</h1>

    <p>Select your preferred candidate carefully.</p>

    {loading ? (

      <h2>Loading Candidates...</h2>

    ) : (

      <div className="candidate-grid">

        {candidates.length === 0 ? (

          <h2>No Candidates Available</h2>

        ) : (

          candidates.map((candidate) => (

            <div
              className="candidate-card"
              key={candidate._id}
            >

              {/* Candidate Photo */}

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

              {/* Election Symbol */}

              {candidate.symbol && (

                <div className="symbol-box">

                  <h4>Election Symbol</h4>

                  <img
                    className="candidate-symbol"
                    src={candidate.symbol}
                    alt="Election Symbol"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
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

          ))

        )}

      </div>

    )}

  </div>
);

}

export default Vote;