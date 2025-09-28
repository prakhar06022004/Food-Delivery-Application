import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], server: {
    host: true, // 👈 important
    port: 5173, // ya jo bhi port chahiye
  },
});
