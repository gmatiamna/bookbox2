import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import prop-types

const ProtectedRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  if (!userInfo) {
    // Not logged in → redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Logged in → show the requested page
  return children;
};

// Add prop type validation for children
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
