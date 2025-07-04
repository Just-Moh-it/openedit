import type { Node } from "@/features/editor/state/input-props";

export interface SnapPoint {
	coordinate: number;
	distance: number;
}

export interface SnapGuides {
	horizontal: {
		left?: number;
		right?: number;
		center?: number;
	};
	vertical: {
		top?: number;
		bottom?: number;
		center?: number;
	};
}

export const SNAP_TOLERANCE_BASE = 5;

export function getSnapTolerance(editorScale: number): number {
	return SNAP_TOLERANCE_BASE / editorScale;
}

export function findClosestSnapPoint(
	targetCoordinate: number,
	snapPoints: number[],
	tolerance: number,
): SnapPoint | null {
	let closestPoint: SnapPoint | null = null;

	for (const snapPoint of snapPoints) {
		const distance = Math.abs(snapPoint - targetCoordinate);
		if (
			distance <= tolerance &&
			(!closestPoint || distance < closestPoint.distance)
		) {
			closestPoint = { coordinate: snapPoint, distance };
		}
	}

	return closestPoint;
}

export function calculateSnapPositions(
	element: Node,
	otherElements: Node[],
	canvasWidth: number,
	canvasHeight: number,
	elementMeasuredHeight?: number,
): { horizontal: number[]; vertical: number[] } {
	const horizontal: number[] = [0, canvasWidth];
	const vertical: number[] = [0, canvasHeight];

	// Add snap points from other elements
	for (const otherElement of otherElements) {
		if (!("transforms" in otherElement)) continue;

		// Use getBoundsWithHeight for elements that might have auto height
		const bounds = otherElement.getBoundsWithHeight();

		// Horizontal snap points
		horizontal.push(bounds.left, bounds.right, bounds.centerX);

		// Vertical snap points
		vertical.push(bounds.top, bounds.bottom, bounds.centerY);
	}

	return { horizontal, vertical };
}

export function calculateSnappedPosition(
	element: Node,
	newLeft: number,
	newTop: number,
	snapPositions: { horizontal: number[]; vertical: number[] },
	tolerance: number,
	elementMeasuredHeight?: number,
): { left: number; top: number; guides: SnapGuides } {
	if (!("transforms" in element)) {
		return {
			left: newLeft,
			top: newTop,
			guides: { horizontal: {}, vertical: {} },
		};
	}

	const width = element.transforms.width;
	const height = element.getNumericHeight(elementMeasuredHeight);

	// Calculate potential snap points for this element based on raw mouse position
	const elementLeft = newLeft;
	const elementRight = newLeft + width;
	const elementCenterX = newLeft + width / 2;
	const elementTop = newTop;
	const elementBottom = newTop + height;
	const elementCenterY = newTop + height / 2;

	// Find best horizontal snap
	const leftSnap = findClosestSnapPoint(
		elementLeft,
		snapPositions.horizontal,
		tolerance,
	);
	const rightSnap = findClosestSnapPoint(
		elementRight,
		snapPositions.horizontal,
		tolerance,
	);
	const centerXSnap = findClosestSnapPoint(
		elementCenterX,
		snapPositions.horizontal,
		tolerance,
	);

	// Find best vertical snap
	const topSnap = findClosestSnapPoint(
		elementTop,
		snapPositions.vertical,
		tolerance,
	);
	const bottomSnap = findClosestSnapPoint(
		elementBottom,
		snapPositions.vertical,
		tolerance,
	);
	const centerYSnap = findClosestSnapPoint(
		elementCenterY,
		snapPositions.vertical,
		tolerance,
	);

	// Determine which snap to use (closest one)
	let bestHorizontalSnap: {
		type: "left" | "right" | "center";
		snap: SnapPoint;
	} | null = null;
	let bestVerticalSnap: {
		type: "top" | "bottom" | "center";
		snap: SnapPoint;
	} | null = null;

	// Find closest horizontal snap
	const horizontalOptions = [
		leftSnap && { type: "left" as const, snap: leftSnap },
		rightSnap && { type: "right" as const, snap: rightSnap },
		centerXSnap && { type: "center" as const, snap: centerXSnap },
	].filter(Boolean);

	if (horizontalOptions.length > 0) {
		bestHorizontalSnap = horizontalOptions.reduce((best, current) =>
			!best || current!.snap.distance < best.snap.distance ? current! : best,
		);
	}

	// Find closest vertical snap
	const verticalOptions = [
		topSnap && { type: "top" as const, snap: topSnap },
		bottomSnap && { type: "bottom" as const, snap: bottomSnap },
		centerYSnap && { type: "center" as const, snap: centerYSnap },
	].filter(Boolean);

	if (verticalOptions.length > 0) {
		bestVerticalSnap = verticalOptions.reduce((best, current) =>
			!best || current!.snap.distance < best.snap.distance ? current! : best,
		);
	}

	// Calculate final position
	let finalLeft = newLeft;
	let finalTop = newTop;

	if (bestHorizontalSnap) {
		switch (bestHorizontalSnap.type) {
			case "left":
				finalLeft = bestHorizontalSnap.snap.coordinate;
				break;
			case "right":
				finalLeft = bestHorizontalSnap.snap.coordinate - width;
				break;
			case "center":
				finalLeft = bestHorizontalSnap.snap.coordinate - width / 2;
				break;
		}
	}

	if (bestVerticalSnap) {
		switch (bestVerticalSnap.type) {
			case "top":
				finalTop = bestVerticalSnap.snap.coordinate;
				break;
			case "bottom":
				finalTop = bestVerticalSnap.snap.coordinate - height;
				break;
			case "center":
				finalTop = bestVerticalSnap.snap.coordinate - height / 2;
				break;
		}
	}

	// Calculate snap guides based on the FINAL snapped position, not the raw mouse position
	// This ensures guides are shown when the element is actually aligned after snapping
	const finalElementLeft = finalLeft;
	const finalElementRight = finalLeft + width;
	const finalElementCenterX = finalLeft + width / 2;
	const finalElementTop = finalTop;
	const finalElementBottom = finalTop + height;
	const finalElementCenterY = finalTop + height / 2;

	// Check which snap lines the final position aligns with (using a very small tolerance for exact alignment)
	const alignmentTolerance = 0.1; // Very small tolerance for floating point precision

	const guides: SnapGuides = {
		horizontal: {},
		vertical: {},
	};

	// Check horizontal alignment with snap positions
	for (const snapPos of snapPositions.horizontal) {
		if (Math.abs(finalElementLeft - snapPos) < alignmentTolerance) {
			guides.horizontal.left = snapPos;
		}
		if (Math.abs(finalElementRight - snapPos) < alignmentTolerance) {
			guides.horizontal.right = snapPos;
		}
		if (Math.abs(finalElementCenterX - snapPos) < alignmentTolerance) {
			guides.horizontal.center = snapPos;
		}
	}

	// Check vertical alignment with snap positions
	for (const snapPos of snapPositions.vertical) {
		if (Math.abs(finalElementTop - snapPos) < alignmentTolerance) {
			guides.vertical.top = snapPos;
		}
		if (Math.abs(finalElementBottom - snapPos) < alignmentTolerance) {
			guides.vertical.bottom = snapPos;
		}
		if (Math.abs(finalElementCenterY - snapPos) < alignmentTolerance) {
			guides.vertical.center = snapPos;
		}
	}

	return { left: finalLeft, top: finalTop, guides };
}
