// src/routes/private/provider-routes.tsx
import React from "react";
import { Route } from "react-router-dom";
import ProviderLayout from "../../layouts/ProviderLayout";
import ProviderPage from "../../pages/provider/page";

export function ProviderRoutes() {
  return (
    <>
      <Route
        path="/provider"
        element={
          <ProviderLayout>
            <ProviderPage />
          </ProviderLayout>
        }
      />
      {/* more /provider/... routes later */}
    </>
  );
}
