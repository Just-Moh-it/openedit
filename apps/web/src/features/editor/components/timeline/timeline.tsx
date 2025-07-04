import { observer } from "mobx-react-lite";
import { useStore } from "@/features/editor/state";
import type { PlayerRef } from "@remotion/player";

export const Timeline = observer(
	({ playerRef }: { playerRef: React.RefObject<PlayerRef | null> }) => {
		const {
			inputProps: { nodes },
		} = useStore();

		return (
			<>
				<div className="p-2">
					<div className="flex justify-between text-muted-foreground text-xs">
						<span>0s</span>
						<span>5s</span>
						<span>10s</span>
						<span>15s</span>
						<span>20s</span>
						<span>25s</span>
						<span>30s</span>
					</div>
				</div>

				<div className="flex-1 p-4">
					<div className="space-y-2">
						<div className="flex h-12 items-center rounded bg-gray-50 px-2 text-sm">
							{nodes.map((node) => (
								<div
									key={node.id}
									className="flex h-12 items-center rounded bg-gray-50 px-2 text-sm"
								>
									{node.title} Nodes
								</div>
							))}
						</div>
						<div className="flex h-12 items-center rounded bg-green-500 px-2 text-sm text-white">
							Audio Track 1
						</div>
						<div className="flex h-12 items-center rounded bg-blue-500 px-2 text-sm text-white">
							Text Track 1
						</div>
					</div>
				</div>
			</>
		);
	},
);
