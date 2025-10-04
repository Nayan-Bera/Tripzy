import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import ProviderLayout from "../layouts/ProviderLayout";

// Pages (example placeholders)
import ProviderPage from "../pages/provider/page";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Provider Routes */}
        <Route
          path="/provider"
          element={
            <ProviderLayout>
              <ProviderPage />
            </ProviderLayout>
          }
        />

        {/* Admin Routes */}
        {/* <Route path="/admin" element={<AdminPage />} /> */}

        {/* Customer Routes */}
        {/* <Route path="/customer" element={<CustomerPage />} /> */}

        {/* Default Route */}
        <Route path="/" element={<h1>Welcome to Hotel App</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
