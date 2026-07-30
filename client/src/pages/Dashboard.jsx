import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  useEffect(() => {

    const data = JSON.parse(localStorage.getItem("student"));

    if (!data) {
      navigate("/login");
      return;
    }

    setStudent(data);

  }, []);

  const logout = () => {

    localStorage.removeItem("student");

    navigate("/login");

  };

  if (!student) return null;

  return (

    <div className="dashboard">

      <div className="dashboard-card">

        <h1>Student Dashboard</h1>

        <p>Welcome back 👋</p>

        <div className="profile">

          <div className="row">
            <span>Name</span>
            <strong>{student.name}</strong>
          </div>

          <div className="row">
            <span>Register No</span>
            <strong>{student.registerNumber}</strong>
          </div>

          <div className="row">
            <span>Department</span>
            <strong>{student.department}</strong>
          </div>

          <div className="row">
            <span>Year</span>
            <strong>{student.year}</strong>
          </div>

          <div className="row">
            <span>Voting Status</span>

            <strong className={student.hasVoted ? "voted" : "notvoted"}>

              {student.hasVoted ? "Already Voted" : "Not Voted"}

            </strong>

          </div>

        </div>

        <div className="buttons">

          <button
            className="vote"
            onClick={() => navigate("/vote")}
          >
            Vote Now
          </button>

          <button
            className="result"
            onClick={() => navigate("/result")}
          >
            View Result
          </button>

          <button
            className="logout"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;