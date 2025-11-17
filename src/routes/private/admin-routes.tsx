// src/routes/private/admin-routes.tsx
import React from "react";
import { Route } from "react-router-dom";

import AdminLayout from "../../pages/admin/layout";
import Dashboard from "../../pages/admin/page";   // <-- your Dashboard

export function AdminRoutes() {
  return (
    <>
      <Route
        path="/admin"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />
    </>
  );
}
