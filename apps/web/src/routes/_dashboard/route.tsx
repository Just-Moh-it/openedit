import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";

export const Route = createFileRoute("/_dashboard")({
	component: DashboardLayout,
});

function DashboardLayout() {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<Outlet />
		</ThemeProvider>
	);
}
