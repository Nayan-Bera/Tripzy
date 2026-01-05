import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Route guards
import PrivateRoute from "./private/PrivateRoute";
import AdminRoute from "./private/AdminRoute";
import ProviderRoute from "./private/ProviderRoute";

// Public pages
import HomePage from "@/pages/Home/page";
import LoginPage from "@/pages/auth/login/page";
import SignupPage from "@/pages/auth/signup/page";
import OTPPage from "@/pages/auth/otp/page";
import ContactUs from "@/pages/Home/contactus/ContactUs";
import { Roles } from "@/pages/provider/Role/page";
import PublicLayout from "@/layouts/PublicLayout";
import { AdminContactUs } from "@/pages/admin/contact-us/page";
import { AllHotels } from "@/pages/admin/all-hotels/page";

// Lazy pages
const AdminLayout = lazy(() => import("@/pages/admin/layout"));
const AdminDashboard = lazy(() => import("@/pages/admin/page"));
const ProviderLayout = lazy(() => import("@/pages/provider/Providerlayout"));
const ProviderDashboard = lazy(() => import("@/pages/provider/page"));

const PanelLoader = () => (
  <div className="flex h-screen items-center justify-center">
    <span className="text-sm text-muted-foreground">Loading panel…</span>
  </div>
);

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌍 Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp" element={<OTPPage />} />

        {/* 🔒 Protected */}
        <Route element={<PrivateRoute />}>
          {/* Admin */}
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
            <Route
              path = "/admin/all-hotels"
              element={
                <AdminLayout>
                  <AllHotels />
                </AdminLayout>
              }
              />
            <Route
              path="/admin/contact-us"
              element={
                <AdminLayout>
                  <AdminContactUs />
                </AdminLayout>
              }
            />
          </Route>

          {/* Provider */}
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
