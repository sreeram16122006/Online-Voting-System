import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/ElectionControl.css";

function ElectionControl() {

  const [status, setStatus] = useState("Loading...");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    try {

      const res = await API.get("/election/status");

      setStatus(res.data.data.status);

    } catch (err) {

      console.log(err);

      setStatus("Unknown");

    }
  };

  const startElection = async () => {

    try {

      setLoading(true);

      await API.put("/election/start");

      setStatus("Active");

      alert("Election Started Successfully");

    } catch (err) {

      console.log(err);

      alert("Unable to Start Election");

    } finally {

      setLoading(false);

    }

  };

  const endElection = async () => {

    try {

      setLoading(true);

      await API.put("/election/stop");

      setStatus("Stopped");

      alert("Election Ended Successfully");

    } catch (err) {

      console.log(err);

      alert(err.response?.data?.message || "Unable to End Election");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="election-container">

      <div className="election-card">

        <h1>Election Control Panel</h1>

        <p>
          Manage the election status from the admin dashboard.
        </p>

        <div className="status-box">

          Current Status :

          <span
            className={
              status === "Active"
                ? "active"
                : "inactive"
            }
          >
            {status}
          </span>

        </div>

        <div className="button-group">

          <button
            className="start-btn"
            onClick={startElection}
            disabled={loading}
          >
            ▶ Start Election
          </button>

          <button
            className="end-btn"
            onClick={endElection}
            disabled={loading}
          >
            ⏹ End Election
          </button>

          <button
            className="refresh-btn"
            onClick={getStatus}
            disabled={loading}
          >
            🔄 Refresh
          </button>

        </div>

      </div>

    </div>

  );

}

export default ElectionControl;