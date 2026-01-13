// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  site: isProduction
    ? "https://pensionshaus-firnsbachtal.de"
    : "http://localhost:4321",
  base: "/",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [icon()]
});
