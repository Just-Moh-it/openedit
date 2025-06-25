import { clientEnv } from "@/lib/env/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PostHogProvider } from "posthog-js/react";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: (failureCount, error) => {
              // Don't retry on 4xx errors
              if (error && typeof error === "object" && "status" in error) {
                const status = error.status as number;
                if (status >= 400 && status < 500) {
                  return false;
                }
              }
              return failureCount < 3;
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PostHogProvider
        apiKey={clientEnv.VITE_PUBLIC_POSTHOG_KEY}
        options={{
          api_host: clientEnv.VITE_PUBLIC_POSTHOG_HOST,
          defaults: "2025-05-24",
        }}
      >
        {children}
      </PostHogProvider>
    </QueryClientProvider>
  );
}
