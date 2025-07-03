import { createFileRoute, Outlet } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_editor")({
  component: EditorLayout,
});

function EditorLayout() {
  return (
    <body
      className={cn(
        "flex h-dvh flex-col bg-background font-display text-foreground"
      )}
    >
      <Outlet />
    </body>
  );
}
