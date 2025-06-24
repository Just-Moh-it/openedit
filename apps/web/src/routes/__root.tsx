import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { seo } from "@/lib/seo";
import "@fontsource/ibm-plex-mono";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import appCss from "../index.css?url";

export type RouterAppContext = {};

export const Route = createRootRouteWithContext<RouterAppContext>()({
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
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png",
			},
		],
	}),

	component: RootDocument,
});

function RootDocument() {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<Providers>
				<body className="bg-background font-display text-foreground">
					<Outlet />
					<Toaster richColors />
					{/* <TanStackRouterDevtools position="bottom-left" /> */}
					<Scripts />
				</body>
			</Providers>
		</html>
	);
}
