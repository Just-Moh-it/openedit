import { createFileRoute, Outlet } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_marketing")({
  component: MarketingLayout,
});

function MarketingLayout() {
  return (
    <body className={cn("bg-orange-50 font-display")}>
      <Outlet />
    </body>
  );
}
