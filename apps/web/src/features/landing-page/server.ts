import { db } from "@/db";
import { waitlistUsersTable } from "@/db/schema";
import { getClientIP, ratelimit } from "@/lib/ratelimit";
import { getHeaders } from "@tanstack/react-start/server";
import { count, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function handleJoinWaitlist(email: string) {
	try {
		const headers = getHeaders();
		const clientIP = getClientIP(headers);

		const { success } = await ratelimit.limit(clientIP);

		if (!success) {
			throw new Error("Too many requests. Please try again later.");
		}

		const normalizedEmail = email.toLowerCase().trim();

		const existingUser = await db
			.select()
			.from(waitlistUsersTable)
			.where(eq(waitlistUsersTable.email, normalizedEmail))
			.limit(1);

		if (existingUser.length > 0) {
			throw new Error("This email is already on the waitlist");
		}

		// Add to waitlist
		await db.insert(waitlistUsersTable).values({
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
}

export async function getWaitlistCount() {
	try {
		const result = await db.select({ count: count() }).from(waitlistUsersTable);
		return result[0]?.count ?? 0;
	} catch (error) {
		console.error("Failed to fetch waitlist count:", error);
		throw new Error("Failed to fetch waitlist count");
	}
}
