import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [".e2b.app", ".bespoker.ai"],
  },
  plugins: [react(), cloudflare(), tailwindcss()],
})