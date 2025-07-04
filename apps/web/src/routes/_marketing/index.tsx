import { FeatureColumns } from "@/features/landing-page/components/feature-columns";
import { Header } from "@/features/landing-page/components/header";
import { HeroSection } from "@/features/landing-page/components/hero-section";
import { HighlightSection } from "@/features/landing-page/components/highlight-section";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_marketing/")({
	component: RouteComponent,
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
