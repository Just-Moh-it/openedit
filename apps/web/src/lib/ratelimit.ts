import { serverEnv } from "@/lib/env/server";
import type { RequestHeaders } from "@tanstack/react-start/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ratelimit = new Ratelimit({
  redis: new Redis({
    url: serverEnv.UPSTASH_REDIS_REST_URL,
    token: serverEnv.UPSTASH_REDIS_REST_TOKEN,
  }),
  limiter: Ratelimit.slidingWindow(5, "24 h"),
  analytics: true,
  prefix: "openedit:waitlist",
});

export function getClientIP(headers: RequestHeaders): string {
  // Try various headers that might contain the client IP
  const forwardedFor = headers["x-forwarded-for"];
  const realIP = headers["x-real-ip"];
  const cfConnectingIP = headers["cf-connecting-ip"];

  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Fallback - this won't work in production but useful for development
  return "127.0.0.1";
}
