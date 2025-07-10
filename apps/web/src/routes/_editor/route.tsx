import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import {
  CommandPalette,
  CommandPaletteProvider,
} from "@/features/editor/components/command-palette";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_editor")({
  component: EditorLayout,
});

function EditorLayout() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CommandPaletteProvider>
        <body
          className={cn(
            "editor flex h-dvh flex-col bg-background font-display text-foreground"
          )}
        >
          <Outlet />
          <CommandPalette />
        </body>
      </CommandPaletteProvider>
    </ThemeProvider>
  );
}
