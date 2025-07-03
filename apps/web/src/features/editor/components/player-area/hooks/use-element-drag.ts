import { useGesture } from "@use-gesture/react";
import type { RefObject } from "react";
import { useCallback, useMemo, useState } from "react";
import {
  calculateSnapPositions,
  calculateSnappedPosition,
  getSnapTolerance,
  type SnapGuides,
} from "@/features/editor/lib/utils/snapping";
import { useStore } from "@/features/editor/state";
import type { Node } from "@/features/editor/state/input-props";

interface UseDragOptions {
  elementRef: RefObject<HTMLElement | null>;
  element: Node;
  editorScale: number;
  isLocked: boolean;
  isSelected: boolean;
  canvasWidth: number;
  canvasHeight: number;
  isSnappingDisabled: boolean;
  elementMeasuredHeight?: number; // Pass measured height for auto-sized elements
}

export function useElementDrag({
  elementRef,
  element,
  editorScale,
  isLocked,
  isSelected,
  canvasWidth,
  canvasHeight,
  isSnappingDisabled,
  elementMeasuredHeight,
}: UseDragOptions) {
  const store = useStore();
  const [isMoving, setIsMoving] = useState(false);
  const [snapGuides, setSnapGuides] = useState<SnapGuides>({
    horizontal: {},
    vertical: {},
  });

  const otherElements = store.inputProps.nodes.filter(
    (node) => node.id !== element.id
  );

  const handleDrag = useCallback(
    ({
      movement: [mx, my],
      memo,
      first,
      last,
    }: Parameters<
      NonNullable<Parameters<typeof useGesture>[0]["onDrag"]>
    >[0]) => {
      if (last) {
        setIsMoving(false);
        setSnapGuides({ horizontal: {}, vertical: {} });
        return memo;
      }

      if (!isSelected && isLocked) return memo;
      if (!("transforms" in element)) return memo;

      interface Memo {
        initialTop: number;
        initialLeft: number;
        snapPositions: { horizontal: number[]; vertical: number[] };
      }

      if (first) {
        setIsMoving(true);
        // Calculate fresh snap positions at start of drag to get current element positions
        const freshSnapPositions = calculateSnapPositions(
          element,
          otherElements,
          canvasWidth,
          canvasHeight,
          elementMeasuredHeight
        );

        memo = {
          initialTop: element.transforms.top,
          initialLeft: element.transforms.left,
          snapPositions: freshSnapPositions,
        } satisfies Memo;
      }

      if (mx === 0 && my === 0) return memo;

      const newLeft = memo.initialLeft + mx / editorScale;
      const newTop = memo.initialTop + my / editorScale;

      if (isSnappingDisabled) {
        element.moveTo(newTop, newLeft);
        setSnapGuides({ horizontal: {}, vertical: {} });
      } else {
        const snapResult = calculateSnappedPosition(
          element,
          newLeft,
          newTop,
          memo.snapPositions,
          getSnapTolerance(editorScale),
          elementMeasuredHeight
        );

        element.moveTo(snapResult.top, snapResult.left);
        setSnapGuides(snapResult.guides);
      }

      return memo;
    },
    [
      element,
      editorScale,
      isSelected,
      isLocked,
      isSnappingDisabled,
      otherElements,
      canvasWidth,
      canvasHeight,
      elementMeasuredHeight,
    ]
  );

  const handleMouseDown = useCallback(
    (event: PointerEvent) => {
      event.stopPropagation();
      if (!isLocked) {
        store.editor.setSelectedElement(element);
      }
    },
    [isLocked, store.editor, element]
  );

  useGesture(
    {
      onDrag: handleDrag,
      onPointerDown: ({ event }) => handleMouseDown(event),
    },
    {
      target: elementRef,
      drag: { pointer: { keys: false } },
    }
  );

  return {
    isMoving,
    snapGuides,
  };
}
