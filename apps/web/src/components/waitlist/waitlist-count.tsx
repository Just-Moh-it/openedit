import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { getWaitlistCount } from '@/lib/server-functions';

export function WaitlistCount() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['waitlist-count'],
    queryFn: async () => {
      return await getWaitlistCount();
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (error) {
    return null; // Silently fail - count is not critical
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Skeleton className="h-4 w-8" />
        <span>people already joined</span>
      </div>
    );
  }

  const count = data?.count ?? 0;

  if (count === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        Be the first to join the waitlist
      </div>
    );
  }

  return (
    <div className="text-sm text-muted-foreground">
      <span className="font-semibold text-foreground">{count.toLocaleString()}</span>{' '}
      {count === 1 ? 'person has' : 'people have'} already joined
    </div>
  );
}