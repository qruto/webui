import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Web UI",
  description:
    "Well-abstracted components that leverage the latest capabilities of the web platform.",
  vite: {
    plugins: [tailwindcss()],
  },
});
