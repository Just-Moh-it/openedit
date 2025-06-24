import { createEnv } from "@t3-oss/env-core";

export const serverEnv = createEnv({
  server: {},
  runtimeEnv: process.env,
});
