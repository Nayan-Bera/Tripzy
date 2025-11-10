// src/routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/auth/Home";
import About from "../pages/auth/About";

// Define your routes
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
]);

// Export router as default
export default router;
