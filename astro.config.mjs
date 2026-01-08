// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const isProduction = process.env.NODE_ENV === "production";
const repoName = "/pension-firnsbachtal";

export default defineConfig({
  site: isProduction
    ? "https://bjoernwenderoth.github.io"
    : "http://localhost:4321",
  base: isProduction ? repoName : "/",
  vite: {
    plugins: [tailwindcss()],
  },
});
