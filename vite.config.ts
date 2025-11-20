// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ESM-safe alias (works in TS)
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": new URL("./src/", import.meta.url).pathname,
    },
  },
});
