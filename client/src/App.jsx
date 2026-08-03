import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Vote from "./pages/Vote";
import Result from "./pages/Result";
import ThankYou from "./pages/ThankYou";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CandidateManagement from "./pages/CandidateManagement";
import ElectionControl from "./pages/ElectionControl";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Home />} />

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<AdminLogin />} />

      <Route path="/result" element={<Result />} />

      <Route path="/thankyou" element={<ThankYou />} />

      {/* Student Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vote"
        element={
          <ProtectedRoute>
            <Vote />
          </ProtectedRoute>
        }
      />

      {/* Admin Protected Routes */}

      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/candidates"
        element={
          <AdminProtectedRoute>
            <CandidateManagement />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/election"
        element={
          <AdminProtectedRoute>
            <ElectionControl />
          </AdminProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;