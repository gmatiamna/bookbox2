
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo || userInfo?.user?.role !== "admin") {
    return <Navigate to="/admin-login" />;
  }

  return children;
};

export default AdminRoute;
