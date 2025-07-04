import type { PlayerRef } from "@remotion/player";
import {
	ArrowDownFromLineIcon,
	ArrowUpFromLineIcon,
	BringToFrontIcon,
	CopyPlusIcon,
	MoreHorizontal,
	SaveIcon,
	SendToBackIcon,
	Trash2Icon,
} from "lucide-react";
import type { RefObject } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFloatingControls } from "@/features/editor/components/player-area/hooks/use-floating-controls";
import { useCurrentPlayerScaleFromPlayerRef } from "@/features/editor/lib/utils/use-current-player-scale";
import { useStore } from "@/features/editor/state";
import type { Node } from "@/features/editor/state/input-props";

interface FloatingControlsProps {
	selectedNode: Node;
	playerRef: RefObject<PlayerRef | null>;
}

export function FloatingControls({
	selectedNode,
	playerRef,
}: FloatingControlsProps) {
	const currentScale = useCurrentPlayerScaleFromPlayerRef(playerRef) ?? 1;

	// Use the custom hook for business logic
	const {
		handleDeleteNode,
		handleDuplicateNode: handleDuplicateElement,
		handleSaveElement,
		handleMoveForward,
		handleMoveBackward,
		handleBringToFront,
		handleSendToBack,
		isSaving,
	} = useFloatingControls({ selectedElement: selectedNode });

	const store = useStore();
	const isSelected = store.editor.selectedElement?.id === selectedNode.id;

	// Add keyboard shortcuts for layer management
	useHotkeys("]", handleBringToFront, { enabled: isSelected }, [
		handleBringToFront,
		isSelected,
	]);
	useHotkeys("shift+]", handleMoveForward, { enabled: isSelected }, [
		handleMoveForward,
		isSelected,
	]);
	useHotkeys("shift+[", handleMoveBackward, { enabled: isSelected }, [
		handleMoveBackward,
		isSelected,
	]);
	useHotkeys("[", handleSendToBack, { enabled: isSelected }, [
		handleSendToBack,
		isSelected,
	]);

	return (
		<div
			className="absolute bottom-0 left-1/2 flex gap-1.5 rounded-lg bg-white p-1 shadow-md"
			style={{
				transform: `scale(${1 / currentScale}) translate(-50%, calc(100% + 15px))`,
				zIndex: 20,
			}}
		>
			<Button
				variant="ghost"
				size="sm"
				className="w-8"
				onDrag={(e) => e.stopPropagation()}
				onMouseDown={(e) => e.stopPropagation()}
				onClick={(e) => {
					e.preventDefault();
					handleDuplicateElement();
				}}
				title="Duplicate Element"
			>
				<CopyPlusIcon className="size-4 shrink-0" />
			</Button>

			<Button
				variant="ghost"
				size="sm"
				className="w-8"
				onDrag={(e) => e.stopPropagation()}
				onMouseDown={(e) => e.stopPropagation()}
				onClick={(e) => {
					e.preventDefault();
					handleDeleteNode();
				}}
				title="Delete Element"
			>
				<Trash2Icon className="size-4 shrink-0" />
			</Button>

			<DropdownMenu>
				<DropdownMenuTrigger
					onDrag={(e) => e.stopPropagation()}
					onMouseDown={(e) => e.stopPropagation()}
					className={buttonVariants({
						variant: "ghost",
						size: "sm",
						className: "w-8",
					})}
					title="More Options"
				>
					<MoreHorizontal className="size-4 shrink-0" />
				</DropdownMenuTrigger>

				<DropdownMenuContent>
					<DropdownMenuItem
						onDrag={(e) => e.stopPropagation()}
						onMouseDown={(e) => e.stopPropagation()}
						onClick={(e) => {
							e.preventDefault();
							handleSaveElement();
						}}
						disabled={isSaving}
					>
						<SaveIcon className="mr-2 size-4" />
						<span>{isSaving ? "Saving..." : "Save Element"}</span>
					</DropdownMenuItem>

					<DropdownMenuSub>
						<DropdownMenuSubTrigger
							onDrag={(e) => e.stopPropagation()}
							onMouseDown={(e) => e.stopPropagation()}
							onClick={(e) => {
								e.preventDefault();
							}}
						>
							<SendToBackIcon className="mr-2 size-4" />
							<span>Arrange</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent className="w-48">
								<DropdownMenuItem
									onDrag={(e) => e.stopPropagation()}
									onMouseDown={(e) => e.stopPropagation()}
									onClick={handleBringToFront}
								>
									<BringToFrontIcon className="mr-2 size-4" />
									<span>Bring to Front</span>
									<DropdownMenuShortcut>]</DropdownMenuShortcut>
								</DropdownMenuItem>
								<DropdownMenuItem
									onDrag={(e) => e.stopPropagation()}
									onMouseDown={(e) => e.stopPropagation()}
									onClick={handleMoveForward}
								>
									<ArrowUpFromLineIcon className="mr-2 size-4" />
									<span>Move Forward</span>
									<DropdownMenuShortcut>⇧]</DropdownMenuShortcut>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onDrag={(e) => e.stopPropagation()}
									onMouseDown={(e) => e.stopPropagation()}
									onClick={handleMoveBackward}
								>
									<ArrowDownFromLineIcon className="mr-2 size-4" />
									<span>Move Backward</span>
									<DropdownMenuShortcut>⇧[</DropdownMenuShortcut>
								</DropdownMenuItem>
								<DropdownMenuItem
									onDrag={(e) => e.stopPropagation()}
									onMouseDown={(e) => e.stopPropagation()}
									onClick={handleSendToBack}
								>
									<SendToBackIcon className="mr-2 size-4" />
									<span>Send to Back</span>
									<DropdownMenuShortcut>[</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

// Simplified hook version without external dependencies
