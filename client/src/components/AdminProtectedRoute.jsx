import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {

  const admin = localStorage.getItem("adminToken");

  if (!admin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default AdminProtectedRoute;