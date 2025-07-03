import type { PlayerRef } from "@remotion/player";
import { useRef } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SidebarLayout } from "@/features/editor/components/sidebar/sidebar-layout";
import { StoreProvider } from "@/features/editor/state/provider";
import { Header } from "./header";
import { PlayerArea } from "./player-area/player-area";
import { TimelineTopControls } from "@/features/editor/components/timeline/timeline-top-controls";
import { Timeline } from "@/features/editor/components/timeline/timeline";

export function Editor() {
  const playerRef = useRef<PlayerRef | null>(null);

  return (
    <StoreProvider
      savedInputProps={{
        aspectRatio: "16:9",
        version: 1,
      }}
    >
      <Header />

      <SidebarLayout>
        <ResizablePanelGroup direction="vertical">
          {/* Video Preview Area */}
          <ResizablePanel defaultSize={70} className="flex flex-1 flex-col">
            <PlayerArea playerRef={playerRef} />
          </ResizablePanel>

          <ResizableHandle />

          {/* Timeline Area */}
          <ResizablePanel
            defaultSize={30}
            minSize={20}
            className="flex flex-1 flex-col"
          >
            <TimelineTopControls playerRef={playerRef} />

            <Timeline playerRef={playerRef} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </SidebarLayout>
    </StoreProvider>
  );
}
