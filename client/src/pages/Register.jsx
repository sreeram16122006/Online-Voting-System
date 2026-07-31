import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    registerNumber: "",
    department: "",
    year: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/users/register", {
        name: form.name,
        mobile: form.mobile,
        registerNumber: form.registerNumber,
        department: form.department,
        year: form.year,
        password: form.password,
      });

      console.log("SUCCESS :", res.data);

      alert("Registration Successful");

      navigate("/login");

    } catch (err) {

      console.log("========== REGISTER ERROR ==========");
      console.log(err);
      console.log(err.response);
      console.log(err.response?.status);
      console.log(err.response?.data);
      console.log("===================================");

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Cannot connect to server");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>Create Student Account</h1>

        <p>
          Register to participate in the Online Election Voting System.
        </p>

        <form onSubmit={register}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="registerNumber"
            placeholder="Register Number"
            value={form.registerNumber}
            onChange={handleChange}
            required
          />

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="CSE">Computer Science</option>
            <option value="IT">Information Technology</option>
            <option value="ECE">Electronics & Communication</option>
            <option value="EEE">Electrical & Electronics</option>
            <option value="MECH">Mechanical</option>
            <option value="CIVIL">Civil</option>
          </select>

          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            required
          >
            <option value="">Select Year</option>
            <option value="1">First Year</option>
            <option value="2">Second Year</option>
            <option value="3">Third Year</option>
            <option value="4">Final Year</option>
          </select>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Register Now"}
          </button>

        </form>

        <p style={{ marginTop: "20px" }}>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;