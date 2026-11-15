import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// BASE_PATH is set by the GitHub Pages workflow (e.g. "/scaffld"); local builds serve from "/".
const base = `${(process.env.BASE_PATH ?? "").replace(/\/$/, "")}/`;

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": "/src" } },
});
