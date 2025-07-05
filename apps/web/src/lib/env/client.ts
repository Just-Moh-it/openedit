import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const clientEnv = createEnv({
  clientPrefix: "VITE_PUBLIC_",
  client: {
    VITE_PUBLIC_POSTHOG_KEY: z
      .string()
      .optional()
      .refine((value) => {
        if (!value) console.warn("VITE_PUBLIC_POSTHOG_KEY is not provided");
        return true;
      }),
    VITE_PUBLIC_POSTHOG_HOST: z
      .string()
      .optional()
      .refine((value) => {
        if (!value) console.warn("VITE_PUBLIC_POSTHOG_HOST is not provided");
        return true;
      }),
  },
  runtimeEnv: import.meta.env,
});
