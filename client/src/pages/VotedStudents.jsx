import { useEffect, useState } from "react";
import API from "../api/axios";

function VotedStudents() {

  const [votes, setVotes] = useState([]);

  useEffect(() => {
    loadVotes();
  }, []);

  const loadVotes = async () => {

    try {

      const res = await API.get("/votes");

      setVotes(res.data.data);

    } catch (err) {

      console.log(err);

      alert("Unable to load voted students");

    }

  };

  const downloadExcel = () => {

    window.open(
      "https://online-voting-system-4rvm.onrender.com/api/excel/voters",
      "_blank"
    );

  };

  return (

    <div style={{ padding: "30px" }}>

      <h1>🗳️ Students Who Voted</h1>

      <br />

      <button
        onClick={downloadExcel}
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "12px 25px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        📊 Download Excel
      </button>

      <table border="1" cellPadding="10" width="100%">

        <thead>

          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Register No</th>
            <th>Department</th>
            <th>Candidate</th>
            <th>Voted Date & Time</th>
          </tr>

        </thead>

        <tbody>

          {votes.map((vote, index) => (

            <tr key={vote._id}>

              <td>{index + 1}</td>

              <td>{vote.studentName}</td>

              <td>{vote.registerNumber}</td>

              <td>{vote.department}</td>

              <td>{vote.candidateName}</td>

              <td>
                {new Date(vote.createdAt).toLocaleString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default VotedStudents;