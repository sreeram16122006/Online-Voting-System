import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/CandidateManagement.css";

function CandidateManagement() {

  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    department: "",
    photo: "",
    symbol: "",
  });

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const res = await API.get("/candidates");
      setCandidates(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addCandidate = async (e) => {
    e.preventDefault();

    try {
      await API.post("/candidates", form);

      alert("Candidate Added Successfully");

      setForm({
        name: "",
        department: "",
        photo: "",
        symbol: "",
      });

      loadCandidates();

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const deleteCandidate = async (id) => {

    if (!window.confirm("Delete this candidate?")) return;

    try {

      await API.delete(`/candidates/${id}`);

      loadCandidates();

    } catch (err) {

      console.log(err);

    }
  };

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="candidate-page">

      <div className="page-header">

        <h1>👤 Candidate Management</h1>

        <p>Manage election candidates quickly and securely.</p>

      </div>

      <form className="candidate-form" onSubmit={addCandidate}>

        <input
          type="text"
          name="name"
          placeholder="Candidate Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="photo"
          placeholder="Candidate Photo URL"
          value={form.photo}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="symbol"
          placeholder="Election Symbol URL"
          value={form.symbol}
          onChange={handleChange}
          required
        />

        <button type="submit">
          ➕ Add Candidate
        </button>

      </form>

      {form.photo && (
        <div className="preview-card">

          <h3>Candidate Photo Preview</h3>

          <img
            src={form.photo}
            alt="Preview"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/150?text=No+Image";
            }}
          />

        </div>
      )}

      {form.symbol && (
        <div className="preview-card">

          <h3>Election Symbol Preview</h3>

          <img
            src={form.symbol}
            alt="Symbol"
            className="candidate-symbol"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/80?text=No+Symbol";
            }}
          />

        </div>
      )}

      <div className="search-box">

        <span style={{fontSize:"22px"}}>🔍</span>

        <input
          type="text"
          placeholder="Search Candidate..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="list-title">

        <h2>
          👥 Candidate List ({filteredCandidates.length})
        </h2>

      </div>

      <div className="candidate-grid">

        {filteredCandidates.length === 0 ? (

          <div className="empty">
            No Candidates Found
          </div>

        ) : (

          filteredCandidates.map((candidate) => (

            <div
              className="candidate-card"
              key={candidate._id}
            >

              <img
                src={candidate.photo}
                alt={candidate.name}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/150?text=No+Image";
                }}
              />

              <h3>{candidate.name}</h3>

              <p>{candidate.department}</p>

              {candidate.symbol && (

                <img
                  src={candidate.symbol}
                  alt="Election Symbol"
                  className="candidate-symbol"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

              )}

              <button
                className="delete-btn"
                onClick={() => deleteCandidate(candidate._id)}
              >
                🗑 Delete Candidate
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );

}

export default CandidateManagement;