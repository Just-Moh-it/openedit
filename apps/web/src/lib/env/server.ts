import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const serverEnv = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		UPSTASH_REDIS_REST_URL: z
			.string()
			.url()
			.optional()
			.refine((value) => {
				if (!value)
					console.warn(
						"UPSTASH_REDIS_REST_URL is not provided. Rate limiting will not work.",
					);
				return true;
			}),
		UPSTASH_REDIS_REST_TOKEN: z
			.string()
			.min(1)
			.optional()
			.refine((value) => {
				if (!value)
					console.warn(
						"UPSTASH_REDIS_REST_TOKEN is not provided. Rate limiting will not work.",
					);
				return true;
			}),
	},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
		UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
	},
});
