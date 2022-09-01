import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

  const ProtectedRoute = ({ component: Component, ...props }) => {
    console.log('loggedIn', props.loggedIn)
  return props.loggedIn ? Component : <Navigate to="/sign-in" />
};

export default ProtectedRoute;