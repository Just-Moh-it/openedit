import { FeatureColumns } from "@/features/landing-page/components/feature-columns";
import { Header } from "@/features/landing-page/components/header";
import { HeroSection } from "@/features/landing-page/components/hero-section";
import { HighlightSection } from "@/features/landing-page/components/highlight-section";
import {
  getWaitlistCount,
  handleJoinWaitlist,
} from "@/features/landing-page/server";
import { joinWaitlistInputSchema } from "@/features/waitlist/validation";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

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

function RouteComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <HeroSection />
      <FeatureColumns />
      <HighlightSection />
    </div>
  );
}
