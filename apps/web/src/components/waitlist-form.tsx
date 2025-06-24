import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { joinWaitlist } from "@/lib/server/waitlist-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export function WaitlistForm() {
	const [email, setEmail] = useState("");
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: (email: string) => joinWaitlist({ data: { email } }),
		onSuccess: () => {
			toast.success("Successfully joined the waitlist! 🎉");
			setEmail(""); // Clear the form
			// Invalidate and refetch waitlist count
			queryClient.invalidateQueries({ queryKey: ["waitlist-count"] });
		},
		onError: (error: Error) => {
			// Handle specific error messages
			const message = error.message;
			if (message.includes("already on the waitlist")) {
				toast.error("You're already on the waitlist!");
			} else if (message.includes("Too many requests")) {
				toast.error("Too many requests. Please try again later.");
			} else if (message.includes("valid email")) {
				toast.error("Please enter a valid email address");
			} else {
				toast.error(message || "Something went wrong. Please try again.");
			}
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const trimmedEmail = email.trim();
		if (!trimmedEmail) {
			toast.error("Please enter your email address");
			return;
		}

		mutation.mutate(trimmedEmail);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex w-full max-w-md items-center space-x-2"
		>
			<Input
				type="email"
				placeholder="Enter your email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				disabled={mutation.isPending}
				className="flex-1"
				required
			/>
			<Button type="submit" disabled={mutation.isPending || !email.trim()}>
				{mutation.isPending ? "Joining..." : "Join waitlist"}
			</Button>
		</form>
	);
}
