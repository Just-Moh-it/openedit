/// <reference types="vite/client" />

import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { NotFound } from "@/components/not-found";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { seo } from "@/lib/seo";
import "@fontsource/ibm-plex-mono";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import appCss from "../index.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			...seo({
				url: "https://openeditapp.com",
				title: "OpenEdit",
				description:
					"OpenEdit is a platform for creating and sharing AI-powered documents.",
				image: "/openedit-og.png",
				keywords:
					"OpenEdit, Open Source, Code Editor, AI, Document, Collaboration",
			}),
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			// {
			//   rel: "apple-touch-icon",
			//   sizes: "180x180",
			//   href: "/apple-touch-icon.png",
			// },
			// {
			//   rel: "icon",
			//   type: "image/png",
			//   sizes: "32x32",
			//   href: "/favicon-32x32.png",
			// },
			{
				rel: "icon",
				type: "image/png",
				// sizes: "16x16",
				href: "/favicon.png",
			},
			// { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
			// { rel: "icon", href: "/favicon.ico" },
		],
	}),
	errorComponent: (props) => {
		return (
			<RootDocument>
				<DefaultCatchBoundary {...props} />
			</RootDocument>
		);
	},
	notFoundComponent: () => <NotFound />,
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<Providers>
				<body className="bg-background font-display text-foreground">
					{children}
					<Toaster richColors />
					<Scripts />
				</body>
			</Providers>
		</html>
	);
}
