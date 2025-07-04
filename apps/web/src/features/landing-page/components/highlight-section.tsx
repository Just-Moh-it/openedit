import { OpenEditLogo } from "@/assets/logo";

export const HighlightSection = () => {
	return (
		<footer className="relative flex grow flex-col items-stretch justify-center overflow-hidden bg-orange-600">
			<div className="mx-auto flex w-full max-w-7xl grow flex-col justify-center px-6 text-center">
				<p className="vont-mono text-orange-50 text-xs uppercase tracking-wider">
					<OpenEditLogo className="h-30" />
				</p>
			</div>
		</footer>
	);
};
