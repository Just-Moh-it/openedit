import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const clientEnv = createEnv({
	clientPrefix: "VITE_PUBLIC_",
	client: {
		VITE_PUBLIC_POSTHOG_KEY: z.string(),
		VITE_PUBLIC_POSTHOG_HOST: z.string(),
	},
	runtimeEnv: import.meta.env,
});
