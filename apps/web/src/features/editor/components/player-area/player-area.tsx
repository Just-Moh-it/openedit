import { Player, type PlayerRef } from "@remotion/player";
import { observer } from "mobx-react-lite";
import React from "react";
import { PlayerAreaError } from "@/features/editor/components/player-area/player-error";
import { TransformControls } from "@/features/editor/components/player-area/transform-controls";
import { useCurrentPlayerScaleFromPlayerRef } from "@/features/editor/lib/utils/use-current-player-scale";
// import { useIsFullscreen } from "@/features/editor/lib/utils/use-is-fullscreen";
import { useStore } from "@/features/editor/state";
import { RootComposition } from "@/lib/remotion/composition/composition";

export const PlayerArea = observer(
  ({ playerRef }: { playerRef: React.RefObject<PlayerRef | null> }) => {
    const { inputProps, editor } = useStore();
    const [hasMounted, setHasMounted] = React.useState(false);
    // const isFullscreen = useIsFullscreen(playerRef);

    // Get current player scale for transform controls
    const editorScale =
      useCurrentPlayerScaleFromPlayerRef(
        playerRef as React.RefObject<PlayerRef>
      ) ?? 1;

    console.log("Input props rerendered", inputProps.durationInFrames);

    React.useEffect(() => {
      setHasMounted(true);
    }, []);

    return (
      <div className="relative flex flex-1 flex-col items-center justify-center bg-muted p-4">
        <div
          className="flex h-full w-full flex-1 cursor-default flex-col items-center justify-center border-none bg-transparent p-0"
          onMouseDown={() => {
            // Deselect element when clicking on empty space
            editor.setSelectedElement(null);
          }}
        >
          {/* Render transform controls for each element */}
          {hasMounted &&
            inputProps.nodes.map((node, i) => (
              <TransformControls
                key={node.id}
                playerRef={playerRef}
                element={node}
                isLocked={false} // TODO: Add locked property to MST Node
                editorScale={editorScale}
                canvasWidth={inputProps.dimensions.width}
                canvasHeight={inputProps.dimensions.height}
                style={{
                  zIndex: 500 + i,
                }}
              />
            ))}

          <Player
            ref={playerRef}
            inputProps={{
              inputProps,
            }}
            errorFallback={({ error }) => (
              <PlayerAreaError message={error.message} />
            )}
            component={RootComposition}
            durationInFrames={inputProps.durationInFrames}
            compositionWidth={inputProps.dimensions.width}
            compositionHeight={inputProps.dimensions.height}
            acknowledgeRemotionLicense
            fps={30}
            // To show snap guides, transform controls, etc. outside the player
            className="!overflow-visible"
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </div>
      </div>
    );
  }
);
PlayerArea.displayName = "PlayerArea";
