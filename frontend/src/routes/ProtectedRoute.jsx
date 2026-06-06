import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import PropTypes from "prop-types";

export default function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  let role;
  try {
    const decoded = jwtDecode(token);
    role = decoded.role;
  } catch (e) {
    // token is malformed or cannot be decoded; fallback to stored role
    const storedRole = localStorage.getItem("role");
    role = storedRole || null;
  }
  // If a specific role is required, enforce it
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/login" />;
  }

  // Render the protected component(s)
  return <>{children}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRole: PropTypes.string,
};
