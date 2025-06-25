import { WaitlistCount } from "@/components/waitlist/waitlist-count";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";

export const HeroSection = () => {
	return (
		<section className="py-16 lg:py-24">
			<div className="mx-auto max-w-7xl px-6">
				<div className="max-w-4xl">
					<h1 className="mb-8 animate-fade-in font-bold font-sans text-4xl/tight uppercase leading-tight lg:text-6xl">
						The Open Source Adobe Premiere Pro Alternative
					</h1>

					<div className="max-w-3xl">
						<p className="mb-8 animate-fade-in font-mono text-base leading-relaxed lg:text-lg">
							The local first video editor. Easy to use, fully open source and
							customizable. Cloud based file saving, and AI features that let
							you get to a V1 draft in no time.
						</p>

						<div className="animate-fade-in space-y-4">
							<div className="text-center">
								<p className="mb-4 font-medium text-lg">
									Join the waitlist to be notified when OpenEdit launches
								</p>
								<WaitlistForm />
							</div>

							<div className="text-center">
								<WaitlistCount />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
