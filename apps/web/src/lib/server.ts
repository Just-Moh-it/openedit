import {
	getWaitlistCount,
	handleJoinWaitlist,
} from "@/features/landing-page/server";
import { joinWaitlistInputSchema } from "@/features/waitlist/validation";
import { createServerFn } from "@tanstack/react-start";

export const joinWaitlistServerFn = createServerFn({ method: "POST" })
	.validator(joinWaitlistInputSchema.parse)
	.handler(async ({ data: { email } }) => {
		return await handleJoinWaitlist(email);
	});

export const getWaitlistCountServerFn = createServerFn({
	method: "GET",
}).handler(async () => {
	return await getWaitlistCount();
});
