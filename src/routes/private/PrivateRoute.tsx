// src/routes/private/PrivateRoute.tsx
import { Outlet } from "react-router-dom";

export default function PrivateRoute() {
  // no auth logic yet while testing
  return <Outlet />;
}
