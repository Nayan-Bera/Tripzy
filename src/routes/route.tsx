import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import PrivateRoute from "./private/PrivateRoute";

// Admin
import AdminLayout from "../pages/admin/layout";

// Provider (adjust paths if different)
import LoginPage from "@/pages/auth/login/page";
import SignupPage from "@/pages/auth/signup/page";
import OTPPage from "@/pages/auth/otp/page";
import HomePage from "@/pages/Home/page";
import ProviderLayout from "@/pages/provider/Providerlayout";
import ProviderDashboard from "@/pages/provider/page";
import AdminDashboard from "@/pages/admin/page";
import { Roles } from "@/pages/provider/Role/page";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect "/" -> "/admin" for convenience */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp" element={<OTPPage />} />
        

        {/* All protected routes */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <AdminDashboard/>
              </AdminLayout>
            }
          />

          <Route
            path="/provider"
            element={
              <ProviderLayout>
                <ProviderDashboard />
              </ProviderLayout>
            }
          />
          <Route
            path="/provider/role"
            element={
              <ProviderLayout>
                <Roles />
              </ProviderLayout>
            }
          />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<h1>404 - Not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
