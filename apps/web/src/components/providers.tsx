import { clientEnv } from "@/lib/env/client";
import { PostHogProvider } from "posthog-js/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider
      apiKey={clientEnv.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: clientEnv.VITE_PUBLIC_POSTHOG_HOST,
        defaults: "2025-05-24",
      }}
    >
      {children}
    </PostHogProvider>
  );
}
