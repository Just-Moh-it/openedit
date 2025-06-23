import { createFileRoute } from "@tanstack/react-router";
import { FeatureColumns } from "../components/landing-page/feature-columns";
import { Header } from "../components/landing-page/header";
import { HeroSection } from "../components/landing-page/hero-section";
import { HighlightSection } from "../components/landing-page/highlight-section";

export const Route = createFileRoute("/")({
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
