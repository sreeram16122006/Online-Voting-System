import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import API from "../api/axios";
import "../styles/Result.css";

function Result() {

  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("Stopped");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadElection();
  }, []);

  const loadElection = async () => {
    try {

      const electionRes = await API.get("/election/status");

      const currentStatus = electionRes.data.data.status;

      setStatus(currentStatus);

      if (currentStatus === "Active") {
        setResults([]);
        setLoading(false);
        return;
      }

      const resultRes = await API.get("/votes/result");

      const sorted = resultRes.data.results.sort(
        (a, b) => b.votes - a.votes
      );

      setResults(sorted);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  const downloadPDF = () => {
    window.open(
      "https://online-voting-system-4rvm.onrender.com/api/pdf",
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (status === "Active") {
    return (
      <div className="result-page">

        <div className="winner-card">

          <h1>🗳 Election Running</h1>

          <h3>
            Results will be available after the Admin stops the election.
          </h3>

        </div>

      </div>
    );
  }

  return (
    <>
      {results.length > 0 && (
        <Confetti recycle={false} numberOfPieces={250} />
      )}

      <div className="result-page">

        <h1>Election Results</h1>

        <p className="subtitle">
          Final Election Result
        </p>

        {results.length === 0 ? (

          <h2>No Results Available</h2>

        ) : (

          <>
            <div className="winner-card">

              <div className="trophy">🏆</div>

              <img
                src={results[0].photo}
                alt={results[0].name}
                className="winner-photo"
              />

              <h2>{results[0].name}</h2>

              <p>{results[0].department}</p>

              {results[0].symbol && (
                <img
                  src={results[0].symbol}
                  alt="Symbol"
                  className="winner-symbol"
                />
              )}

              <h3>{results[0].votes} Votes</h3>

            </div>

            <div className="table-card">

              <table>

                <thead>

                  <tr>
                    <th>Rank</th>
                    <th>Photo</th>
                    <th>Candidate</th>
                    <th>Department</th>
                    <th>Votes</th>
                  </tr>

                </thead>

                <tbody>

                  {results.map((item, index) => (

                    <tr key={item._id}>

                      <td>
                        {index === 0
                          ? "🥇"
                          : index === 1
                          ? "🥈"
                          : index === 2
                          ? "🥉"
                          : index + 1}
                      </td>

                      <td>

                        <img
                          src={item.photo}
                          alt={item.name}
                          width="50"
                          height="50"
                          style={{
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />

                      </td>

                      <td>{item.name}</td>

                      <td>{item.department}</td>

                      <td>{item.votes}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            <button
              className="pdf-btn"
              onClick={downloadPDF}
            >
              📄 Download PDF Report
            </button>

          </>
        )}

      </div>
    </>
  );
}

export default Result;