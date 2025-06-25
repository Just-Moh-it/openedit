import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { joinWaitlist } from "@/lib/server-functions";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const joinWaitlistSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
});

interface WaitlistFormProps {
	onSuccess?: () => void;
}

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
	const [isSubmitted, setIsSubmitted] = useState(false);

	const joinWaitlistMutation = useMutation({
		mutationFn: async (email: string) => {
			return await joinWaitlist({ data: { email } });
		},
		onSuccess: (data) => {
			toast.success(data.message || "Successfully joined the waitlist!");
			setIsSubmitted(true);
			onSuccess?.();
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});

	const form = useForm({
		defaultValues: {
			email: "",
		},
		onSubmit: async ({ value }) => {
			const result = joinWaitlistSchema.safeParse(value);

			if (!result.success) {
				toast.error("Please enter a valid email address");
				return;
			}

			joinWaitlistMutation.mutate(result.data.email);
		},
	});

	if (isSubmitted) {
		return (
			<div className="space-y-2 text-center">
				<div className="font-medium text-green-600 dark:text-green-400">
					✓ You're on the waitlist!
				</div>
				<p className="text-muted-foreground text-sm">
					We'll notify you when OpenEdit is ready.
				</p>
			</div>
		);
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row"
		>
			<form.Field
				name="email"
				children={(field) => (
					<Input
						type="email"
						placeholder="Enter your email"
						value={field.state.value}
						onChange={(e) => field.handleChange(e.target.value)}
						onBlur={field.handleBlur}
						disabled={joinWaitlistMutation.isPending}
						className="flex-1"
						required
					/>
				)}
			/>
			<Button
				type="submit"
				disabled={joinWaitlistMutation.isPending}
				className="px-6"
			>
				{joinWaitlistMutation.isPending ? "Joining..." : "Join Waitlist"}
			</Button>
		</form>
	);
}
