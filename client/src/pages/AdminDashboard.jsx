import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    students: 0,
    candidates: 0,
    votes: 0,
    status: "Stopped",
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const [users, candidates, results, election] = await Promise.all([
        API.get("/users"),
        API.get("/candidates"),
        API.get("/votes/result"),
        API.get("/election/status"),
      ]);

      const totalVotes = results.data.results.reduce(
        (sum, item) => sum + item.votes,
        0
      );

      setStats({
        students: users.data.data.length,
        candidates: candidates.data.data.length,
        votes: totalVotes,
        status: election.data.data.status,
      });

    } catch (err) {
      console.log(err);
    }

  };

  const logout = () => {

    localStorage.removeItem("admin");

    navigate("/admin");

  };

  return (

    <div className="admin-dashboard">

      <header>

        <div>

          <h1>Admin Dashboard</h1>

          <p>Online Election Voting System</p>

        </div>

        <button onClick={logout}>
          Logout
        </button>

      </header>

      <div className="cards">

        <div className="card">

          <h3>Total Students</h3>

          <h2>{stats.students}</h2>

        </div>

        <div className="card">

          <h3>Total Candidates</h3>

          <h2>{stats.candidates}</h2>

        </div>

        <div className="card">

          <h3>Total Votes</h3>

          <h2>{stats.votes}</h2>

        </div>

        <div className="card">

          <h3>Election Status</h3>

          <h2 className={stats.status === "Active" ? "active" : "stop"}>

            {stats.status}

          </h2>

        </div>

      </div>

      <div className="actions">

        <button onClick={() => navigate("/admin/candidates")}>
          Candidate Management
        </button>

        <button onClick={() => navigate("/admin/election")}>
          Election Control
        </button>

        <button onClick={() => navigate("/result")}>
          View Results
        </button>

      </div>

    </div>

  );

}

export default AdminDashboard;