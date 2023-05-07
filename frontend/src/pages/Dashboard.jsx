import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const Dashboard = () => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div>Dashboard</div>
      <Outlet />
    </>
  );
};

export default Dashboard;
