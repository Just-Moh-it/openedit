import { WaitlistCount } from "@/components/waitlist-count";
import { WaitlistForm } from "@/components/waitlist-form";

export const HeroSection = () => {
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
						<WaitlistCount />
					</div>
				</div>
			</div>
		</section>
	);
};
