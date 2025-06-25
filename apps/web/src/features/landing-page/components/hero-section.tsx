import { WaitlistForm } from "@/features/waitlist/components/waitlist-form";
import { getWaitlistCountServerFn } from "@/routes";
import { useQuery } from "@tanstack/react-query";

export const HeroSection = () => {
  const { data: waitlistCount, isLoading } = useQuery({
    queryKey: ["waitlist-count"],
    queryFn: () => getWaitlistCountServerFn(),
  });

  return (
    <section className="pt-16 lg:pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-4xl">
          <h1 className="mb-8 animate-fade-in font-bold font-sans text-4xl/tight uppercase leading-tight lg:text-6xl">
            The Open Source Adobe Premiere Pro Alternative
          </h1>

          <div className="max-w-3xl">
            <p className="animate-fade-in font-mono text-base leading-relaxed lg:text-lg">
              The local first video editor. Easy to use, fully open source and
              customizable. Cloud based file saving, and AI features that let
              you get to a V1 draft in no time.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <WaitlistForm />

            <div className="text-muted-foreground text-sm">
              <span className="relative mr-3 inline-flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
              </span>
              <strong className="inline font-semibold text-foreground">
                {isLoading ? (
                  <div className="inline-flex h-3 w-2 animate-pulse rounded bg-orange-200" />
                ) : (
                  waitlistCount
                )}
              </strong>{" "}
              people have already joined
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
