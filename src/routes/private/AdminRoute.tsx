import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentAuth } from "@/features/auth/authSlice";

export default function AdminRoute() {
  const auth = useSelector(selectCurrentAuth);

  const isAdmin =
    auth.user?.platformRole === "ADMIN" ||
    auth.user?.platformRole === "SUPER_ADMIN";

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
