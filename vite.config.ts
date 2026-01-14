import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

import { cloudflare } from "@cloudflare/vite-plugin";
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [".e2b.app", ".bespoker.ai"],
  },
  envPrefix: ["VITE_", "MAPBOX_"],
  plugins: [
    react(),
    cloudflare(),
    tailwindcss(),
    jsxLocPlugin(),
    vitePluginManusRuntime(),
  ],
  environments: {
    client: {
      build: {
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, "index.html"),
            components: path.resolve(__dirname, "components.html"),
          },
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
