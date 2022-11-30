import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute(props) {
  return props.user?.uid ? <Outlet /> : <Navigate to="/" />;
}
export default PrivateRoute;
