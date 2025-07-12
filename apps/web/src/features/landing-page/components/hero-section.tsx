import { useQuery } from "@tanstack/react-query";
import { WaitlistForm } from "@/features/waitlist/components/waitlist-form";
import { getWaitlistCountServerFn } from "@/lib/server";

interface HeroSectionProps {
  heroTitle?: string;
}

export const HeroSection = ({ heroTitle }: HeroSectionProps) => {
  const { data: waitlistCount, isLoading } = useQuery({
    queryKey: ["waitlist-count"],
    queryFn: () => getWaitlistCountServerFn(),
  });

  const defaultTitle = "The Open-Source Alternative to Premiere Pro";

  return (
    <section className="pt-16 lg:pt-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        <div className="flex max-w-4xl flex-col items-center">
          <h1 className="mb-8 animate-fade-in text-balance font-semibold text-4xl tracking-tight lg:text-7xl">
            {heroTitle || defaultTitle}
          </h1>

          <div className="max-w-3xl">
            <p className="text-balance text-base text-muted-foreground lg:text-lg">
              Professional Video editor in the cloud. Open Source, Customizable,
              Easy to use. Waitlist now open.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <WaitlistForm />

            <div className="text-muted-foreground text-sm">
              <span className="relative mr-3 inline-flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-600 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-cyan-600" />
              </span>
              <strong className="inline font-semibold text-foreground">
                {isLoading ? (
                  <div className="inline-flex h-3 w-2 animate-pulse rounded bg-cyan-200" />
                ) : (
                  waitlistCount
                )}
              </strong>{" "}
              people have already joined
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 lg:p-8">
        <video
          autoPlay
          muted
          loop
          width={3452}
          height={1976}
          src="https://openedit-uploads.openchatui.com/channel-1-display-0_23.mp4"
          className="rounded-lg shadow-md"
        />
      </div>
    </section>
  );
};
