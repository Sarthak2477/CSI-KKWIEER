import path from "path"
import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
<<<<<<< HEAD
      "@": path.resolve(__dirname, "./src"), // 👈 alias fix
=======
      "@": path.resolve(__dirname, "./src"),
>>>>>>> 1c2d65953a913f858f294e464453fc4b2cb307da
    },
  },
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
});
