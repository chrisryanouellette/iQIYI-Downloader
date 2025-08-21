import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import injectCss from "./plugins/vite-plugin-inject-css";
import injectJs from "./plugins/vite-plugin-inject-js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), injectCss(), injectJs()],
});
