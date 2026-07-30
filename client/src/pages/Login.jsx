import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const res = await API.post("/users/login", form);

      localStorage.setItem("student", JSON.stringify(res.data.data));

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {

      alert(err.response?.data?.message || "Login Failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Student Login</h1>

        <p>
          Login to cast your vote securely.
        </p>

        <form onSubmit={login}>

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">

            {loading ? "Please Wait..." : "Login"}

          </button>

        </form>

        <div className="login-links">

          <Link to="/register">
            Create Account
          </Link>

          <Link to="/admin">
            Admin Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;