import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from '@vitejs/plugin-react';
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import "./src/lib/env/server";


export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    react(),
    tanstackStart({
      target: "vercel",
    }),
  ],
});
