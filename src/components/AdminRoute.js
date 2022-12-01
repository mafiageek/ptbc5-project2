import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function AdminRoute(props) {
  const admins = [
    process.env.REACT_APP_ADMIN_WK,
    process.env.REACT_APP_ADMIN_AK,
  ];

  return admins.includes(props.user?.uid) ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoute;
