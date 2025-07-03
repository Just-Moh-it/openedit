import { cn } from "@/lib/utils";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_marketing")({
  component: MarketingLayout,
});

function MarketingLayout() {
  return (
    <body className={cn("bg-orange-50 font-display text-foreground")}>
      <Outlet />
    </body>
  );
}
