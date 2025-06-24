import { serverEnv } from "@/lib/env/server";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/db/schema.ts",
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: {
		url: serverEnv.DATABASE_URL,
	},
});
