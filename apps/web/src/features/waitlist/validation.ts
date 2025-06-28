import { z } from "zod";

export const joinWaitlistInputSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address")
		.trim(),
});
export type JoinWaitlistInputSchema = z.infer<typeof joinWaitlistInputSchema>;
