// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://bjoernwenderoth.github.io",
  base: "/pension-firnsbachtal",
  vite: {
    plugins: [tailwindcss()],
  },
});
