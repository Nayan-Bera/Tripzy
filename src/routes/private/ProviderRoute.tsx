import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentAuth } from "@/features/auth/authSlice";

export default function ProviderRoute() {
  const auth = useSelector(selectCurrentAuth);

  const hasHotelAccess = auth.hotelAccess.length > 0;

  if (!hasHotelAccess) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
