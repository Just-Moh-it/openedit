import type { PlayerRef } from "@remotion/player";
import { useEffect, useState } from "react";

export const useIsFullscreen = (ref: React.RefObject<PlayerRef | null>) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const current = ref?.current;
    if (!current) {
      return () => undefined;
    }

    const onFullscreenChange = () => {
      // For some strange reason, the isFullscreen is always one step behind
      // the actual state after flipping once to fullscreen, so we need to flip it here
      setIsFullscreen(!current.isFullscreen());
    };

    current.addEventListener("fullscreenchange", onFullscreenChange);

    return () => {
      current.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, [ref]);

  return isFullscreen;
};
