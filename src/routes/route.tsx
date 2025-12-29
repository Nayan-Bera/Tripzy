import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Route guards
import PrivateRoute from "./private/PrivateRoute";
import AdminRoute from "./private/AdminRoute";
import ProviderRoute from "./private/ProviderRoute";

/* ================= NOT LAZY (FAST FIRST LOAD) ================= */

// Public pages
import HomePage from "@/pages/Home/page";
import LoginPage from "@/pages/auth/login/page";
import SignupPage from "@/pages/auth/signup/page";
import OTPPage from "@/pages/auth/otp/page";
import { Roles } from "@/pages/provider/Role/page";

/* ================= LAZY (HEAVY PANELS) ================= */

// Admin
const AdminLayout = lazy(() => import("@/pages/admin/layout"));
const AdminDashboard = lazy(() => import("@/pages/admin/page"));

// Provider
const ProviderLayout = lazy(() => import("@/pages/provider/Providerlayout"));
const ProviderDashboard = lazy(() => import("@/pages/provider/page"));

/* ================= LOADER ================= */

const PanelLoader = () => (
  <div className="flex h-screen items-center justify-center">
    <span className="text-sm text-muted-foreground">Loading panel…</span>
  </div>
);

/* ================= ROUTES ================= */

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌍 Public (FAST) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp" element={<OTPPage />} />

        {/* Logged-in only */}
        <Route element={<PrivateRoute />}>
          {/* Admin (LAZY) */}
          <Route
            element={
              <Suspense fallback={<PanelLoader />}>
                <AdminRoute />
              </Suspense>
            }
          >
            <Route
              path="/admin"
              element={
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              }
            />
          </Route>

          {/* Provider (LAZY) */}
          <Route
            element={
              <Suspense fallback={<PanelLoader />}>
                <ProviderRoute />
              </Suspense>
            }
          >
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
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
