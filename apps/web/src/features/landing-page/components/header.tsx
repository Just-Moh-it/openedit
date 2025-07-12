import { Link } from "@tanstack/react-router";
import { OpenEditLogo } from "@/assets/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Header = () => {
	return (
		<header>
			<div className="mx-auto px-4 py-3 xl:py-3.5">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<div className="font-mono font-semibold text-lg lowercase">
						<Link to="/">
							<OpenEditLogo />
						</Link>
					</div>

					{/* Navigation */}
					<nav className="flex gap-2">
						{/* <a
              href="https://github.com/just-moh-it/openedit"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "ghost" })}
            >
              Contributors
            </a> */}
						<a
							href="https://github.com/just-moh-it/openedit"
							target="_blank"
							rel="noopener noreferrer"
							className={buttonVariants({ variant: "ghost" })}
						>
							GitHub
						</a>
						<a
							href="https://x.com/openeditapp"
							target="_blank"
							rel="noopener noreferrer"
							className={cn(buttonVariants(), "bg-cyan-600 hover:bg-cyan-600")}
						>
							Follow for updates on 𝕏
						</a>
					</nav>
				</div>
			</div>
		</header>
	);
};
