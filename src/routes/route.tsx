import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import PrivateRoute from "./private/PrivateRoute";

// Admin
import AdminLayout from "../pages/admin/layout";
import Dashboard from "../pages/admin/page";

// Provider (adjust paths if different)
import ProviderLayout from "../layouts/ProviderLayout";
import ProviderPage from "../pages/provider/page";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect "/" -> "/admin" for convenience */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* All protected routes */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />

          <Route
            path="/provider"
            element={
              <ProviderLayout>
                <ProviderPage />
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
