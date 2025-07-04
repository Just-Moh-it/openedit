import type { PlayerRef } from "@remotion/player";
import { observer } from "mobx-react-lite";
import React, {
	type ComponentProps,
	type RefObject,
	useCallback,
	useMemo,
	useRef,
} from "react";
import { createPortal } from "react-dom";
import { useHotkeys } from "react-hotkeys-hook";
import { FloatingControls } from "@/features/editor/components/floating-controls";
import type { SnapGuides } from "@/features/editor/lib/utils/snapping";
import {
	calculateSnapPositions,
	calculateSnappedPosition,
	getSnapTolerance,
} from "@/features/editor/lib/utils/snapping";
import { useStore } from "@/features/editor/state";
import type { Node } from "@/features/editor/state/input-props";
import { cn } from "@/lib/utils";
import { useElementDrag } from "./hooks/use-element-drag";
import { useElementResize } from "./hooks/use-element-resize";

interface TransformControlsProps extends ComponentProps<"div"> {
	playerRef: RefObject<PlayerRef | null>;
	element: Node;
	isLocked: boolean;
	editorScale: number;
	canvasWidth: number;
	canvasHeight: number;
}

export const TransformControls = observer(
	({
		playerRef,
		element,
		isLocked,
		editorScale,
		canvasWidth,
		canvasHeight,
		...props
	}: TransformControlsProps) => {
		const { editor, inputProps } = useStore();
		const elementControlRef = useRef<HTMLDivElement | null>(null);

		// Resize handle refs
		const resizeRefs = {
			topLeft: useRef<HTMLButtonElement | null>(null),
			topRight: useRef<HTMLButtonElement | null>(null),
			bottomLeft: useRef<HTMLButtonElement | null>(null),
			bottomRight: useRef<HTMLButtonElement | null>(null),
			left: useRef<HTMLButtonElement | null>(null),
			right: useRef<HTMLButtonElement | null>(null),
			top: useRef<HTMLButtonElement | null>(null),
			bottom: useRef<HTMLButtonElement | null>(null),
		};

		const isSelected = editor.selectedElement?.id === element.id;
		const isSnappingDisabled = false; // Get from store when implemented

		// Calculate snap positions for both drag and keyboard movement
		// Note: Not memoized because MobX observable arrays don't always trigger useMemo dependencies correctly
		const otherElements = inputProps.nodes.filter(
			(node) => node.id !== element.id,
		);

		const snapPositions = calculateSnapPositions(
			element,
			otherElements,
			canvasWidth,
			canvasHeight,
		);

		// Debug logging to understand the issue
		console.log(`🔍 TransformControls for ${element.id}:`, {
			otherElementsCount: otherElements.length,
			otherElementIds: otherElements.map((el) => el.id),
			otherElementPositions: otherElements.map((el) => ({
				id: el.id,
				left: el.transforms.left,
				top: el.transforms.top,
			})),
			horizontalSnaps: snapPositions.horizontal,
			verticalSnaps: snapPositions.vertical,
		});

		// Custom hooks for drag and resize behavior
		const { isMoving, snapGuides } = useElementDrag({
			elementRef: elementControlRef,
			element,
			editorScale,
			isLocked,
			isSelected,
			canvasWidth,
			canvasHeight,
			isSnappingDisabled,
		});

		useElementResize({
			element,
			editorScale,
			isSelected,
			refs: resizeRefs,
		});

		// Element movement helper with snapping support
		const moveElement = useCallback(
			(deltaTop: number, deltaLeft: number) => {
				if (!("transforms" in element)) return;

				const newLeft = element.transforms.left + deltaLeft;
				const newTop = element.transforms.top + deltaTop;

				if (isSnappingDisabled) {
					element.moveBy(deltaTop, deltaLeft);
				} else {
					// Use the same snapping logic as dragging for consistency
					const snapResult = calculateSnappedPosition(
						element,
						newLeft,
						newTop,
						snapPositions,
						getSnapTolerance(editorScale),
					);
					element.moveTo(snapResult.top, snapResult.left);
				}
			},
			[element, isSnappingDisabled, snapPositions, editorScale],
		);

		// Keyboard shortcuts using react-hotkeys-hook
		useHotkeys("right", () => moveElement(0, 1), { enabled: isSelected }, [
			moveElement,
			isSelected,
		]);
		useHotkeys("left", () => moveElement(0, -1), { enabled: isSelected }, [
			moveElement,
			isSelected,
		]);
		useHotkeys("up", () => moveElement(-1, 0), { enabled: isSelected }, [
			moveElement,
			isSelected,
		]);
		useHotkeys("down", () => moveElement(1, 0), { enabled: isSelected }, [
			moveElement,
			isSelected,
		]);
		useHotkeys(
			"escape",
			() => editor.setSelectedElement(null),
			{ enabled: isSelected },
			[editor, isSelected],
		);
		useHotkeys(
			["backspace", "delete"],
			() => {
				// TODO: Add delete logic when available in store
				console.log("Delete shortcut pressed");
			},
			{ enabled: isSelected },
			[isSelected],
		);

		// Get remotion player container
		const remotionPlayerDiv = document?.getElementsByClassName(
			"__remotion-player",
		)[0] as HTMLDivElement;

		if (!remotionPlayerDiv || !("transforms" in element)) {
			console.error(
				"Can't render transform controls for non-node element, remotion player div not found or element is not a node",
			);
			return null;
		}

		const { transforms } = element;

		return createPortal(
			// biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
			<div
				{...props}
				ref={elementControlRef}
				className={cn(
					"absolute touch-none border-blue-500 bg-transparent p-0",
					isSelected ? "opacity-100" : "opacity-0",
					isLocked ? !isSelected && "pointer-events-none" : "hover:opacity-100",
					props.className,
				)}
				onDoubleClick={() => {
					if (element.type !== "text") return;

					const contentElement = document.getElementById(
						"content",
					) as HTMLTextAreaElement | null;
					if (contentElement) {
						contentElement.focus();
						contentElement.selectionStart = 0;
						contentElement.selectionEnd = contentElement.value.length;
					}
				}}
				style={{
					width: transforms.width,
					height: transforms.height,
					left: transforms.left,
					top: transforms.top,
					borderWidth: 2 / editorScale,
					borderColor: isMoving ? "transparent" : undefined,
					zIndex: isSelected ? 1000 : undefined,
					...props.style,
				}}
			>
				{
					// isSelected &&
					<>
						<div
							className="relative size-full"
							style={{
								opacity: isMoving ? 0 : 1,
								transition: "opacity 0.1s ease-out",
							}}
						>
							{/* <FloatingControls selectedNode={element} playerRef={playerRef} /> */}

							{/* Corner resize handles */}
							<ResizeHandle
								ref={resizeRefs.bottomRight}
								className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize"
								size={10}
								editorScale={editorScale}
							/>
							<ResizeHandle
								ref={resizeRefs.bottomLeft}
								className="-translate-x-1/2 absolute bottom-0 left-0 translate-y-1/2 cursor-nesw-resize"
								size={10}
								editorScale={editorScale}
							/>
							<ResizeHandle
								ref={resizeRefs.topRight}
								className="-translate-y-1/2 absolute top-0 right-0 translate-x-1/2 cursor-nesw-resize"
								size={10}
								editorScale={editorScale}
							/>
							<ResizeHandle
								ref={resizeRefs.topLeft}
								className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-0 cursor-nwse-resize"
								size={10}
								editorScale={editorScale}
							/>

							{/* Side resize handles */}
							<ResizeHandle
								ref={resizeRefs.right}
								className="absolute right-0 bottom-1/2 translate-x-1/2 translate-y-1/2 cursor-e-resize"
								width={10}
								height={10}
								editorScale={editorScale}
							/>
							<ResizeHandle
								ref={resizeRefs.left}
								className="-translate-x-1/2 absolute bottom-1/2 left-0 translate-y-1/2 cursor-w-resize"
								width={10}
								height={10}
								editorScale={editorScale}
							/>

							{/* Top/bottom handles only for non-text elements */}
							{element.type !== "text" && (
								<>
									<ResizeHandle
										ref={resizeRefs.bottom}
										className="-translate-x-1/2 absolute bottom-0 left-1/2 translate-y-1/2 cursor-s-resize"
										width={10}
										height={10}
										editorScale={editorScale}
									/>
									<ResizeHandle
										ref={resizeRefs.top}
										className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 cursor-n-resize"
										width={10}
										height={10}
										editorScale={editorScale}
									/>
								</>
							)}
						</div>

						{/* Snap guides - keep visible during dragging as they're helpful */}
						<SnapGuidesDisplay
							snapGuides={snapGuides}
							isMoving={isMoving}
							isSnappingDisabled={isSnappingDisabled}
							editorScale={editorScale}
							elementTransforms={transforms}
						/>
					</>
				}
			</div>,
			remotionPlayerDiv,
		);
	},
);

// Resize handle component
const ResizeHandle = React.forwardRef<
	HTMLButtonElement,
	{
		className?: string;
		size?: number;
		width?: number;
		height?: number;
		editorScale: number;
	}
>(({ className, size, width, height, editorScale, ...props }, ref) => {
	const finalWidth = (width ?? size ?? 10) / editorScale / 1.5;
	const finalHeight = (height ?? size ?? 10) / editorScale / 1.5;

	return (
		<button
			{...props}
			className={cn(
				"absolute bg-white shadow-md ring-2 ring-blue-500",
				"transition-colors hover:bg-indigo-500 peer-focus:invisible",
				className,
			)}
			ref={ref}
			style={{
				width: finalWidth,
				height: finalHeight,
			}}
		/>
	);
});
ResizeHandle.displayName = "ResizeHandle";

// Snap guides component
const SnapGuidesDisplay = ({
	snapGuides,
	isMoving,
	isSnappingDisabled,
	editorScale,
	elementTransforms,
}: {
	snapGuides: SnapGuides;
	isMoving: boolean;
	isSnappingDisabled: boolean;
	editorScale: number;
	elementTransforms: { top: number; left: number };
}) => {
	if (!isMoving || isSnappingDisabled) return null;

	// Account for the border width of the transform controls container
	const borderOffset = 2 / editorScale;

	return (
		<>
			{/* Horizontal guides (go across the canvas horizontally) */}
			{Object.entries(snapGuides.vertical)
				.filter(([, value]) => typeof value !== "undefined")
				.map(([position, value]) => (
					<div
						key={`horizontal-${position}`}
						className="pointer-events-none absolute bg-[#F46D4F]"
						style={{
							// Position relative to element container, accounting for border
							top: value! - elementTransforms.top - borderOffset,
							left: -2000, // Extend line far beyond canvas
							width: 4000, // Make line very wide to ensure it's visible
							height: Math.max(1 / editorScale, 0.5), // Scale line thickness with zoom, minimum 0.5px
							transform: "translateY(-50%)", // Center the line on the coordinate
							zIndex: 999,
						}}
					/>
				))}

			{/* Vertical guides (go down the canvas vertically) */}
			{Object.entries(snapGuides.horizontal)
				.filter(([, value]) => typeof value !== "undefined")
				.map(([position, value]) => (
					<div
						key={`vertical-${position}`}
						className="pointer-events-none absolute bg-[#F46D4F]"
						style={{
							// Position relative to element container, accounting for border
							left: value! - elementTransforms.left - borderOffset,
							top: -2000, // Extend line far beyond canvas
							width: Math.max(1 / editorScale, 0.5), // Scale line thickness with zoom, minimum 0.5px
							height: 4000, // Make line very tall to ensure it's visible
							transform: "translateX(-50%)", // Center the line on the coordinate
							zIndex: 999,
						}}
					/>
				))}
		</>
	);
};
