import type { PlayerRef } from "@remotion/player";
import { observer } from "mobx-react-lite";
import { useStore } from "@/features/editor/state";
import { Scissors, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { TimelinePlaybackControls } from "@/features/editor/components/timeline/timeline-playback-controls";
import { TimelineTime } from "@/features/editor/components/timeline/timeline-time";

export const TimelineTopControls = observer(
	({ playerRef }: { playerRef: React.RefObject<PlayerRef | null> }) => {
		const {
			inputProps: { durationInFrames },
			editor: { setTimelineZoom, timelineZoom },
		} = useStore();

		return (
			<div className="flex items-center justify-between border-b p-2">
				{/* Left Controls */}
				<div className="flex items-center gap-2">
					<label className="flex items-center gap-2 px-2 py-1.5 -my-0.5 rounded-md bg-accent">
						<p className="text-sm font-medium">Edit with Script</p>
						<Switch />
					</label>

					<Button size="sm" variant="ghost">
						<Scissors className="mr-2 h-4 w-4" />
						Split
					</Button>
				</div>

				{/* Center Playback Controls */}
				<div className="flex items-center gap-3">
					<TimelinePlaybackControls playerRef={playerRef} />

					<TimelineTime
						playerRef={playerRef}
						durationInFrames={durationInFrames}
					/>
				</div>

				{/* Right Timeline Zoom Controls */}
				<div className="flex items-center gap-2">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size="sm"
								variant="ghost"
								className="h-8 w-8 p-0"
								onClick={() => setTimelineZoom(Math.max(10, timelineZoom - 10))}
							>
								<ZoomOut className="h-4 w-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="top">Zoom out timeline</TooltipContent>
					</Tooltip>

					<div className="w-24">
						<Slider
							value={[timelineZoom]}
							onValueChange={(value) => setTimelineZoom(value[0])}
							max={200}
							min={10}
							step={5}
							className="w-full"
						/>
					</div>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size="sm"
								variant="ghost"
								className="h-8 w-8 p-0"
								onClick={() =>
									setTimelineZoom(Math.min(200, timelineZoom + 10))
								}
							>
								<ZoomIn className="h-4 w-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="top">Zoom in timeline</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size="sm"
								variant="ghost"
								className="px-2"
								onClick={() => setTimelineZoom(100)}
							>
								Fit
							</Button>
						</TooltipTrigger>
						<TooltipContent side="top">Fit timeline to window</TooltipContent>
					</Tooltip>
				</div>
			</div>
		);
	},
);
