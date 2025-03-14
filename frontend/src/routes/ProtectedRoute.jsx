import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/authService";

function ProtectedRoute({ requiredRole }) {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if requiredRole is an array or a single role
  if (requiredRole) {
    const hasRequiredRole = Array.isArray(requiredRole)
      ? authService.hasAnyRole(requiredRole)
      : authService.hasRole(requiredRole);

    if (!hasRequiredRole) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
}

export default ProtectedRoute;
