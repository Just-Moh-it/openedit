import { db } from "@/db";
import { waitlist } from "@/db/schema";
import { getClientIP } from "@/lib/client-ip";
import { createServerFn } from "@tanstack/react-start";
import { getHeaders } from "@tanstack/react-start/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { count, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { serverEnv } from "../env/server";

// Create a new ratelimiter, that allows 5 requests per hour
const ratelimit = new Ratelimit({
	redis: new Redis({
		url: serverEnv.UPSTASH_REDIS_REST_URL,
		token: serverEnv.UPSTASH_REDIS_REST_TOKEN,
	}),
	limiter: Ratelimit.slidingWindow(5, "1 h"),
	analytics: true,
	prefix: "openedit:waitlist",
});

// Get waitlist count
export const getWaitlistCount = createServerFn().handler(async () => {
	try {
		const result = await db.select({ count: count() }).from(waitlist);
		return result[0]?.count ?? 0;
	} catch (error) {
		console.error("Failed to fetch waitlist count:", error);
		throw new Error("Failed to fetch waitlist count");
	}
});

// Join waitlist
export const joinWaitlist = createServerFn({ method: "POST" })
	.validator((input) => {
		const schema = z.object({
			email: z.string().email("Please enter a valid email address"),
		});
		return schema.parse(input);
	})
	.handler(async ({ data }) => {
		try {
			// Rate limiting
			const headers = getHeaders();
			const clientIP = getClientIP(headers);

			const { success } = await ratelimit.limit(clientIP);

			if (!success) {
				throw new Error("Too many requests. Please try again later.");
			}

			const { email } = data;
			const normalizedEmail = email.toLowerCase().trim();

			// Check if email already exists
			const existingUser = await db
				.select()
				.from(waitlist)
				.where(eq(waitlist.email, normalizedEmail))
				.limit(1);

			if (existingUser.length > 0) {
				throw new Error("This email is already on the waitlist");
			}

			// Add to waitlist
			await db.insert(waitlist).values({
				id: nanoid(),
				email: normalizedEmail,
				createdAt: new Date(),
			});

			return { message: "Successfully added to waitlist!" };
		} catch (error) {
			// Re-throw known errors
			if (error instanceof Error) {
				throw error;
			}

			console.error("Waitlist join error:", error);
			throw new Error("Internal server error. Please try again later.");
		}
	});
