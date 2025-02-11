import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const authToken = localStorage.getItem("authToken");

  return authToken ? <Outlet /> : <Navigate to="/register" />;
};

export default ProtectedRoutes;
