// src/routes/private/PrivateRoute.tsx
import {  Outlet } from "react-router-dom";

export default function PrivateRoute() {
  // TODO: replace with your real auth check
  // const isAuthenticated = Boolean(localStorage.getItem("token"));

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return <Outlet />;
}
