import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  console.log("ProtectedRoute Running");
  console.log("Token:", token);
  console.log("Role:", userRole);
  console.log("Required Role:", role);

  if (!token) {
    console.log("No token → Redirecting");
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    console.log("Role mismatch → Redirecting");
    return <Navigate to="/login" replace />;
  }

  console.log("Access Granted");
  return children;
}

export default ProtectedRoute;