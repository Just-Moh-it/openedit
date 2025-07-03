import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const ReactCompilerConfig = {
  /* ... */
};

export default defineConfig(({ mode }) => {
  // Load environment variables from all .env files
  const env = loadEnv(mode, process.cwd(), "");

  // Set environment variables on process.env so they're available during config loading
  Object.assign(process.env, env);

  // Now import the server env after environment variables are loaded
  require("./src/lib/env/server");

  return {
    plugins: [
      tsconfigPaths(),
      tailwindcss(),
      tanstackStart({
        target: "vercel",
        react: {
          babel: {
            plugins: ["babel-plugin-react-compiler", ReactCompilerConfig],
          },
        },
      }),
    ],
  };
});
