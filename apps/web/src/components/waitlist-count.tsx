import { useQuery } from "@tanstack/react-query";
import { getWaitlistCount } from "@/lib/server/waitlist-actions";

export function WaitlistCount() {
	const {
		data: count,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["waitlist-count"],
		queryFn: () => getWaitlistCount(),
		refetchInterval: 30000, // Refetch every 30 seconds
	});

	if (error) {
		return null; // Silently fail if count can't be loaded
	}

	if (isLoading) {
		return (
			<div className="flex items-center space-x-2 text-muted-foreground text-sm">
				<div className="h-4 w-16 animate-pulse rounded bg-muted" />
				<span>people already joined</span>
			</div>
		);
	}

	if (!count || count === 0) {
		return (
			<div className="text-muted-foreground text-sm">
				Be the first to join the waitlist!
			</div>
		);
	}

	return (
		<div className="flex items-center space-x-2 text-muted-foreground text-sm">
			<span className="inline-flex items-center">
				<span className="relative mr-2 flex h-2 w-2">
					<span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-emerald-400 opacity-75" />
					<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
				</span>
				<strong className="font-semibold text-foreground">
					{count.toLocaleString()}
				</strong>
			</span>
			<span>people already joined</span>
		</div>
	);
}
