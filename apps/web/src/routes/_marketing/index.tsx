import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FeatureColumns } from "@/features/landing-page/components/feature-columns";
import { Header } from "@/features/landing-page/components/header";
import { HeroSection } from "@/features/landing-page/components/hero-section";
import { HighlightSection } from "@/features/landing-page/components/highlight-section";

export const Route = createFileRoute("/_marketing/")({
	component: RouteComponent,
	validateSearch: (search: Record<string, unknown>) => {
		return {
			from: (search.from as string) || undefined,
		};
	},
});

function RouteComponent() {
	const { from } = useSearch({
		from: "/_marketing/",
	});

	// Store the heroTitle in state so it persists after URL param removal
	const [heroTitle, setHeroTitle] = useState<string | undefined>(
		from === "foc"
			? "Because OpenEdit is plain better. The OSS Premiere Pro"
			: undefined,
	);

	// Remove the 'from' parameter from URL after component mounts
	useEffect(() => {
		if (from && typeof window !== "undefined") {
			const url = new URL(window.location.href);
			url.searchParams.delete("from");
			window.history.replaceState({}, "", url.toString());
		}
	}, [from]);

	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<HeroSection heroTitle={heroTitle} />
			<FeatureColumns />
			<HighlightSection />
		</div>
	);
}
