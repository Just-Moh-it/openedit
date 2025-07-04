import type { PlayerRef } from "@remotion/player";
import { Loader2Icon, PauseIcon, PlayIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Forward10SecIcon } from "@/features/editor/assets/icons/forward-10-sec";
import { Rewind10SecIcon } from "@/features/editor/assets/icons/rewind-10-sec";
import { FPS } from "@/features/editor/lib/constants";
import { usePlayer } from "@/features/editor/lib/utils/use-player";
import { useStore } from "@/features/editor/state";
import { cn } from "@/lib/utils";

export const TimelinePlaybackControls = observer(
	({ playerRef }: { playerRef: React.RefObject<PlayerRef | null> }) => {
		const { isBuffering, isPlaying } = usePlayer(playerRef);
		const {
			inputProps: { durationInFrames },
		} = useStore();

		// Animation state for button feedback
		const [isRewindAnimating, setIsRewindAnimating] = useState(false);
		const [isForwardAnimating, setIsForwardAnimating] = useState(false);

		// Debug logging
		console.log("Player state:", {
			isPlaying,
			isBuffering,
			playerRefCurrent: playerRef.current,
			playerIsPlaying: playerRef.current?.isPlaying(),
		});

		function onRewind() {
			const currentFrame = playerRef?.current?.getCurrentFrame();

			if (currentFrame) {
				const targetFrame = Math.max(0, currentFrame - FPS * 10);
				playerRef?.current?.seekTo(targetFrame);
			}

			// Trigger rotation animation
			setIsRewindAnimating(true);
			setTimeout(() => setIsRewindAnimating(false), 100);
		}

		function onForward() {
			const currentFrame = playerRef?.current?.getCurrentFrame();
			if (currentFrame) {
				const targetFrame = Math.min(durationInFrames, currentFrame + FPS * 10);
				playerRef?.current?.seekTo(targetFrame);
			}

			// Trigger rotation animation
			setIsForwardAnimating(true);
			setTimeout(() => setIsForwardAnimating(false), 100);
		}

		return (
			<div className="flex items-center gap-1">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="sm"
							variant="ghost"
							className="h-8 w-8 p-0"
							onClick={onRewind}
						>
							<Rewind10SecIcon
								className={cn(
									"size-5 transition-transform duration-100 ease-in-out",
									isRewindAnimating && "rotate-[-20deg]",
								)}
							/>
						</Button>
					</TooltipTrigger>
					<TooltipContent side="top">
						Rewind 10 seconds (Shift+Tab)
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="sm"
							variant="ghost"
							className="h-8 w-8 p-0"
							disabled={isBuffering}
							onClick={() => playerRef?.current?.toggle()}
						>
							{isBuffering ? (
								<Loader2Icon className="size-4 animate-spin" />
							) : isPlaying ? (
								<PauseIcon className="size-5" />
							) : (
								<PlayIcon className="size-5" />
							)}
						</Button>
					</TooltipTrigger>
					<TooltipContent side="top">Play/Pause</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="sm"
							variant="ghost"
							className="h-8 w-8 p-0"
							onClick={onForward}
						>
							<Forward10SecIcon
								className={cn(
									"size-5 transition-transform duration-100 ease-in-out",
									isForwardAnimating && "rotate-[20deg]",
								)}
							/>
						</Button>
					</TooltipTrigger>
					<TooltipContent side="top">Forward 10 seconds (Tab)</TooltipContent>
				</Tooltip>
			</div>
		);
	},
);
TimelinePlaybackControls.displayName = "TimelinePlaybackControls";
