import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const ReactCompilerConfig = {
	/* ... */
};

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	Object.assign(process.env, env);

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
