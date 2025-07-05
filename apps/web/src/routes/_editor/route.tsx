import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_editor")({
	component: EditorLayout,
});

function EditorLayout() {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<body
				className={cn(
					"editor flex h-dvh flex-col bg-background font-display text-foreground",
				)}
			>
				<Outlet />
			</body>
		</ThemeProvider>
	);
}
