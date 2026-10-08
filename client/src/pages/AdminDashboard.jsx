import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalStudents: 0,
    votedStudents: 0,
    notVotedStudents: 0,
    totalCandidates: 0,
    totalVotes: 0,
    turnoutPercentage: 0,
    remainingPercentage: 100,
    electionStatus: "Stopped",
    lastUpdated: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      const response = await API.get("/admin/dashboard");
      const data = response.data?.data;

      if (!data) {
        throw new Error("Dashboard statistics are unavailable.");
      }

      setStats({
        totalStudents: data.totalStudents ?? 0,
        votedStudents: data.votedStudents ?? 0,
        notVotedStudents: data.notVotedStudents ?? 0,
        totalCandidates: data.totalCandidates ?? 0,
        totalVotes: data.totalVotes ?? 0,
        turnoutPercentage: data.turnoutPercentage ?? 0,
        remainingPercentage: data.remainingPercentage ?? 100,
        electionStatus: data.electionStatus ?? "Stopped",
        lastUpdated: data.lastUpdated ?? new Date().toISOString(),
      });

      setError("");
    } catch (err) {
      console.error("Dashboard loading error:", err);
      setError("Unable to refresh dashboard. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();

    const intervalId = setInterval(loadDashboard, 5000);

    return () => clearInterval(intervalId);
  }, [loadDashboard]);

  const resetElection = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset the election and start a new election?"
    );

    if (!confirmed) return;

    try {
      await API.put("/election/reset");
      await API.put("/election/start");

      window.alert("New election started successfully.");
      await loadDashboard();
    } catch (err) {
      console.error("Election reset error:", err);
      window.alert(
        err.response?.data?.message || "Unable to reset the election."
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const formattedTime = stats.lastUpdated
    ? new Date(stats.lastUpdated).toLocaleTimeString()
    : "--";

  return (
    <main className="admin-dashboard">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">CONTROL CENTER</p>
          <h1>Admin Dashboard</h1>
          <p>Online Election Voting System</p>
        </div>

        <div className="dashboard-header-actions">
          <span className="dashboard-live-status">
            <span className="ticker-live-dot"></span>
            LIVE
          </span>

          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {/* LIVE VOTING NEWS TICKER */}
      <section className="live-ticker" aria-label="Live voting updates">
        <div className="ticker-label">
          <span className="ticker-live-dot"></span>
          LIVE UPDATE
        </div>

        <div className="ticker-window">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <div className="ticker-group" key={copy}>
                <span>
                  <strong>{stats.votedStudents}</strong> students have voted
                </span>

                <span className="ticker-divider">◆</span>

                <span>
                  <strong>{stats.notVotedStudents}</strong> students remaining
                </span>

                <span className="ticker-divider">◆</span>

                <span>
                  Voting percentage:{" "}
                  <strong>{stats.turnoutPercentage}%</strong>
                </span>

                <span className="ticker-divider">◆</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {error && (
        <div className="dashboard-error" role="alert">
          {error}
          <button type="button" onClick={loadDashboard}>
            Retry
          </button>
        </div>
      )}

      <section className="dashboard-welcome">
        <div>
          <h2>Election Overview</h2>
          <p>Monitor election participation and system activity.</p>
        </div>

        <div className="dashboard-updated">
          <span className="ticker-live-dot"></span>
          {loading ? "Loading statistics..." : `Updated at ${formattedTime}`}
        </div>
      </section>

      {/* STATISTICS CARDS */}
      <section className="cards" aria-label="Election statistics">
        <article className="card">
          <p>Total Students</p>
          <h2>{stats.totalStudents}</h2>
          <span>Registered voters</span>
        </article>

        <article className="card">
          <p>Total Candidates</p>
          <h2>{stats.totalCandidates}</h2>
          <span>Election candidates</span>
        </article>

        <article className="card">
          <p>Students Voted</p>
          <h2>{stats.votedStudents}</h2>
          <span>Completed voting</span>
        </article>

        <article className="card">
          <p>Votes Recorded</p>
          <h2>{stats.totalVotes}</h2>
          <span>Total recorded votes</span>
        </article>

        <article className="card">
          <p>Not Yet Voted</p>
          <h2>{stats.notVotedStudents}</h2>
          <span>Remaining participants</span>
        </article>

        <article className="card">
          <p>Election Status</p>
          <h2
            className={
              String(stats.electionStatus).toLowerCase() === "active"
                ? "active"
                : "stop"
            }
          >
            {stats.electionStatus}
          </h2>
          <span>Current election state</span>
        </article>
      </section>

      {/* VOTER TURNOUT */}
      <section className="turnout-panel">
        <div className="turnout-heading">
          <div>
            <h2>Voter Turnout</h2>
            <p>Overall student participation</p>
          </div>

          <strong>{stats.turnoutPercentage}%</strong>
        </div>

        <div
          className="turnout-progress"
          role="progressbar"
          aria-label="Voter turnout"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={stats.turnoutPercentage}
        >
          <div
            className="turnout-progress-fill"
            style={{
              width: `${Math.min(
                100,
                Math.max(0, stats.turnoutPercentage)
              )}%`,
            }}
          />
        </div>

        <div className="turnout-footer">
          <span>{stats.votedStudents} voted</span>
          <span>{stats.notVotedStudents} remaining</span>
        </div>
      </section>

      {/* ADMIN ACTIONS */}
      <section className="admin-actions-section">
        <div className="actions-heading">
          <h2>Management & Actions</h2>
          <p>Manage candidates, students, and election results.</p>
        </div>

        <div className="actions">
          <button
            type="button"
            onClick={() => navigate("/admin/candidates")}
          >
            Candidate Management
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/election")}
          >
            Election Control
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/students")}
          >
            👨‍🎓 Registered Students
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/voters")}
          >
            🗳️ Voted Students
          </button>

          <button
            type="button"
            className="reset-election-button"
            onClick={resetElection}
          >
            🔄 Reset Election
          </button>

          <button type="button" onClick={() => navigate("/result")}>
            🏆 View Results
          </button>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;