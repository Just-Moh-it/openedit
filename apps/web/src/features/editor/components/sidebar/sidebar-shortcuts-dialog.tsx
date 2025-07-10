import { CommandIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SidebarShortcutsDialog() {
  return (
    <Dialog>
      <Tooltip>
        <DialogTrigger asChild>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="p-2">
              <CommandIcon className="size-4.5" />
            </Button>
          </TooltipTrigger>
        </DialogTrigger>
        <TooltipContent side="right">Shortcuts</TooltipContent>
        <DialogContent className="sm:max-w-xl">
          <div className="flex flex-col gap-1">
            <DialogHeader>
              <DialogTitle>
                <p>Shortcuts</p>
                <p className="font-normal text-base text-muted-foreground">
                  Quick access to common features
                </p>
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="grid gap-0">
            <h2 className="mt-1 border-b pb-2 font-medium text-sm">Playback</h2>
            {[
              { name: "Play/Pause", keys: ["k"] },
              { name: "Rewind 10 Seconds", keys: ["j"] },
              { name: "Fast Forward 10 Seconds", keys: ["l"] },
              { name: "Rewind 1 second", keys: ["⇧", "⇥"] },
              { name: "Fast Forward 1 second", keys: ["⇥"] },
            ].map((shortcut) => (
              <div
                key={shortcut.name}
                className="flex items-center justify-between gap-2 not-last:border-b py-2 text-muted-foreground text-sm"
              >
                <span className="select-text">{shortcut.name}</span>
                <div className="flex select-text gap-1">
                  {shortcut.keys.map((key) => (
                    <kbd
                      key={key}
                      className=" inline-flex h-6 select-text items-center rounded-full border border-muted-foreground/10 bg-accent px-2 font-mono text-sm tracking-tight"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-0">
            <h2 className="mt-1 border-b pb-2 font-medium text-sm">Editing</h2>
            {[
              { name: "Split", keys: ["⌘", "B"] },
              { name: "Delete Selection", keys: ["⌫"] },
            ].map((shortcut) => (
              <div
                key={shortcut.name}
                className="flex items-center justify-between gap-2 not-last:border-b py-2 text-muted-foreground text-sm"
              >
                <span className="select-text">{shortcut.name}</span>
                <div className="flex select-text gap-1">
                  {shortcut.keys.map((key) => (
                    <kbd
                      key={key}
                      className=" inline-flex h-6 select-text items-center rounded-full border border-muted-foreground/10 bg-accent px-2 font-mono text-sm tracking-tight"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-0">
            <h2 className="mt-1 border-b pb-2 font-medium text-sm">Timeline</h2>
            {[
              { name: "Zoom In", keys: ["⌘", "+"] },
              { name: "Zoom Out", keys: ["⌘", "-"] },
              { name: "Fit Timeline", keys: ["⌘", "0"] },
            ].map((shortcut) => (
              <div
                key={shortcut.name}
                className="flex items-center justify-between gap-2 not-last:border-b py-2 text-muted-foreground text-sm"
              >
                <span className="select-text">{shortcut.name}</span>
                <div className="flex select-text gap-1">
                  {shortcut.keys.map((key) => (
                    <kbd
                      key={key}
                      className=" inline-flex h-6 select-text items-center rounded-full border border-muted-foreground/10 bg-accent px-2 font-mono text-sm tracking-tight"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Tooltip>
    </Dialog>
  );
}
