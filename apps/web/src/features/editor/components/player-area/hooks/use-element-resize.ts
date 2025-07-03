import { useGesture } from "@use-gesture/react";
import type { RefObject } from "react";
import { useCallback } from "react";
import type { Node } from "@/features/editor/state/input-props";
import { getElementDomId } from "@/lib/utils";

// type ResizeHandle =
//   | "topLeft"
//   | "topRight"
//   | "bottomLeft"
//   | "bottomRight"
//   | "left"
//   | "right"
//   | "top"
//   | "bottom";

interface UseResizeOptions {
  element: Node;
  editorScale: number;
  isSelected: boolean;
  refs: {
    topLeft: RefObject<HTMLButtonElement | null>;
    topRight: RefObject<HTMLButtonElement | null>;
    bottomLeft: RefObject<HTMLButtonElement | null>;
    bottomRight: RefObject<HTMLButtonElement | null>;
    left: RefObject<HTMLButtonElement | null>;
    right: RefObject<HTMLButtonElement | null>;
    top: RefObject<HTMLButtonElement | null>;
    bottom: RefObject<HTMLButtonElement | null>;
  };
  elementMeasuredHeight?: number; // Pass measured height for auto-sized elements
}

export function useElementResize({
  element,
  editorScale,
  isSelected,
  refs,
  elementMeasuredHeight,
}: UseResizeOptions) {
  const handleCornerResize = useCallback(
    (handle: "topLeft" | "topRight" | "bottomLeft" | "bottomRight") =>
      ({
        movement: [mx, my],
        memo,
        first,
        event,
        shiftKey,
      }: Parameters<
        NonNullable<Parameters<typeof useGesture>[0]["onDrag"]>
      >[0]) => {
        event.stopPropagation();

        if (!isSelected || !("transforms" in element)) return memo;

        interface Memo {
          initialWidth: number;
          initialHeight: number;
          initialFontSize?: number;
          elementInDom: HTMLElement | null;
        }

        if (first) {
          const elInDom = document?.getElementById(getElementDomId(element.id));
          const numericWidth = element.transforms.width;
          const numericHeight =
            typeof element.transforms.height === "number"
              ? element.transforms.height
              : (elementMeasuredHeight ??
                (elInDom?.getBoundingClientRect()?.height ?? 0) / editorScale);

          const fontSize =
            element.type === "text" ? element.style?.fontSize : undefined;

          memo = {
            initialWidth: numericWidth,
            initialHeight: numericHeight,
            initialFontSize: fontSize,
            elementInDom: elInDom,
          } satisfies Memo;
        }

        // Calculate scale factor based on width change
        const widthMultiplier = handle.includes("Left") ? -1 : 1;
        const heightMultiplier = handle.includes("top") ? -1 : 1;

        const deltaWidth = (mx * widthMultiplier) / editorScale;
        const deltaHeight = (my * heightMultiplier) / editorScale;

        const factor = (memo.initialWidth + deltaWidth) / memo.initialWidth;

        let newHeight: number;
        let newWidth: number;
        if (shiftKey && element.type !== "text") {
          // Free resize (non-proportional)
          newWidth = memo.initialWidth + deltaWidth;
          newHeight = memo.initialHeight + deltaHeight;
        } else {
          // Proportional resize
          newWidth = memo.initialWidth * factor;
          newHeight = memo.initialHeight * factor;
        }

        if (newWidth < 20) newWidth = 20;
        if (newHeight < 20) newHeight = 20;

        // Handle font size for text elements
        if (element.type === "text" && memo.initialFontSize) {
          const scaleFactor = newHeight / memo.initialHeight;
          element.style.fontSize = memo.initialFontSize * scaleFactor;
        }

        // Handle position adjustment for different anchors
        if (handle.includes("Left")) {
          element.moveBy(0, memo.initialWidth - newWidth);
        }
        if (handle.includes("top")) {
          element.moveBy(memo.initialHeight - newHeight, 0);
        }

        // Update size
        element.transforms.width = newWidth;
        if (element.type === "text") {
          element.transforms.height = "auto";
        } else {
          element.transforms.height = newHeight;
        }

        return memo;
      },
    [element, editorScale, isSelected, elementMeasuredHeight]
  );

  const handleSideResize = useCallback(
    (side: "left" | "right" | "top" | "bottom") =>
      ({
        movement: [mx, my],
        memo,
        first,
        event,
      }: Parameters<
        NonNullable<Parameters<typeof useGesture>[0]["onDrag"]>
      >[0]) => {
        event.stopPropagation();

        if (!isSelected || !("transforms" in element)) return memo;

        interface Memo {
          initialWidth: number;
          initialHeight: number;
          elementInDom: HTMLElement | null;
        }

        if (first) {
          const elInDom = document?.getElementById(getElementDomId(element.id));
          const numericWidth = element.transforms.width;
          const numericHeight =
            typeof element.transforms.height === "number"
              ? element.transforms.height
              : (elementMeasuredHeight ??
                (elInDom?.getBoundingClientRect()?.height ?? 0) / editorScale);

          memo = {
            initialWidth: numericWidth,
            initialHeight: numericHeight,
            elementInDom: elInDom,
          } satisfies Memo;
        }

        const newWidth =
          memo.initialWidth +
          (mx * (side === "left" ? -1 : side === "right" ? 1 : 0)) /
            editorScale;
        const newHeight =
          memo.initialHeight +
          (my * (side === "top" ? -1 : side === "bottom" ? 1 : 0)) /
            editorScale;

        // Handle position adjustment for left/top sides
        if (side === "left") {
          const deltaX = memo.initialWidth - newWidth;
          element.moveBy(0, deltaX);
        }
        if (side === "top") {
          const deltaY = memo.initialHeight - newHeight;
          element.moveBy(deltaY, 0);
        }

        // Update size
        if (side === "left" || side === "right") {
          element.transforms.width = Math.max(20, newWidth);
        }
        if (side === "top" || side === "bottom") {
          if (element.type === "text") {
            element.transforms.height = "auto";
          } else {
            element.transforms.height = Math.max(20, newHeight);
          }
        }

        return memo;
      },
    [element, editorScale, isSelected, elementMeasuredHeight]
  );

  // Set up gesture handlers at top level
  useGesture(
    { onDrag: handleCornerResize("topLeft") },
    { target: refs.topLeft }
  );
  useGesture(
    { onDrag: handleCornerResize("topRight") },
    { target: refs.topRight }
  );
  useGesture(
    { onDrag: handleCornerResize("bottomLeft") },
    { target: refs.bottomLeft }
  );
  useGesture(
    { onDrag: handleCornerResize("bottomRight") },
    { target: refs.bottomRight }
  );

  useGesture({ onDrag: handleSideResize("left") }, { target: refs.left });
  useGesture({ onDrag: handleSideResize("right") }, { target: refs.right });
  useGesture({ onDrag: handleSideResize("top") }, { target: refs.top });
  useGesture({ onDrag: handleSideResize("bottom") }, { target: refs.bottom });
}
