import type { PlayerRef } from "@remotion/player";
import { FPS } from "@/features/editor/lib/constants";
import { usePlayer } from "@/features/editor/lib/utils/use-player";

// Function to format frames to MM:SS.FF format
function formatTime(frames: number, fps: number): string {
  const totalSeconds = Math.floor(frames / fps);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const frameRemainder = frames % fps;

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${frameRemainder.toString().padStart(2, "0")}`;
}

export function TimelineTime({
  playerRef,
  durationInFrames,
}: {
  playerRef: React.RefObject<PlayerRef | null>;
  durationInFrames: number;
}) {
  const { currentFrame } = usePlayer(playerRef);

  const currentTime = formatTime(currentFrame, FPS);
  const totalTime = formatTime(durationInFrames, FPS);

  return (
    <span className="text-sm tabular-nums">
      {currentTime} / {totalTime}
    </span>
  );
}
