import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Web UI",
  description:
    "Well abstracted components using latest HTML & CSS capabilities.",
  vite: {
    plugins: [tailwindcss()],
  },
});
