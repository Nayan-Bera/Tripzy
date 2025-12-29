import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import PrivateRoute from "./private/PrivateRoute";
import AdminRoute from "./private/AdminRoute";
import ProviderRoute from "./private/ProviderRoute";

// Public
import LoginPage from "@/pages/auth/login/page";
import SignupPage from "@/pages/auth/signup/page";
import OTPPage from "@/pages/auth/otp/page";
import HomePage from "@/pages/Home/page";

// Admin
import AdminLayout from "@/pages/admin/layout";
import AdminDashboard from "@/pages/admin/page";

// Provider
import ProviderLayout from "@/pages/provider/Providerlayout";
import ProviderDashboard from "@/pages/provider/page";
import { Roles } from "@/pages/provider/Role/page";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp" element={<OTPPage />} />

    
        <Route element={<PrivateRoute />}>
          <Route element={<AdminRoute />}>
            <Route
              path="/admin"
              element={
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              }
            />
          </Route>

          <Route element={<ProviderRoute />}>
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
        </Route>

        {/* 404 */}
        <Route path="*" element={<h1>404 - Not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
