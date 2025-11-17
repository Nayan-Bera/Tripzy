// src/routes/routes.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import NotFoundPage from "../pages/data-not-found";     // if you have it

import { AdminRoutes } from "./private/admin-routes";
import { ProviderRoutes } from "./private/provider-routes";
import PrivateRoute from "./private/PrivateRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> etc. */}

        {/* Everything inside here is PRIVATE (admin + provider + user) */}
        <Route element={<PrivateRoute />}>
          <AdminRoutes />
          <ProviderRoutes />
        </Route>

        {/* 404 */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
