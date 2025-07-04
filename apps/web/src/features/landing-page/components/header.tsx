import { Link } from "@tanstack/react-router";
import { OpenEditLogo } from "@/assets/logo";

export const Header = () => {
	return (
		<header className="border-b">
			<div className="mx-auto max-w-7xl px-6 py-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<div className="font-mono font-semibold text-industrial-black text-lg lowercase">
						<Link to="/">
							<OpenEditLogo />
						</Link>
					</div>

					{/* Navigation */}
					<nav className="space-x-8 md:flex">
						<Link
							to="/"
							className="font-mono font-semibold text-industrial-black text-sm uppercase tracking-wide transition-colors duration-200 hover:text-orange-600"
						>
							HOME
						</Link>
						<a
							href="https://x.com/openeditapp"
							target="_blank"
							rel="noopener noreferrer"
							className="font-mono font-semibold text-industrial-black text-sm uppercase tracking-wide transition-colors duration-200 hover:text-orange-600"
						>
							𝕏
						</a>
						<a
							href="https://github.com/just-moh-it/openedit"
							target="_blank"
							rel="noopener noreferrer"
							className="font-mono font-semibold text-industrial-black text-sm uppercase tracking-wide transition-colors duration-200 hover:text-orange-600"
						>
							GitHub
						</a>
					</nav>
				</div>

				<div className="mt-3 font-mono text-muted-foreground text-xs">
					The open source premiere pro alternative
				</div>
			</div>
		</header>
	);
};
