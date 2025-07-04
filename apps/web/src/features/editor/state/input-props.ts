import {
	getSnapshot,
	type Instance,
	type SnapshotIn,
	t,
} from "mobx-state-tree";
import type { Except } from "type-fest";
import {
	ASPECT_RATIO_TO_DIMENSIONS,
	type AspectRatio,
} from "@/features/editor/lib/constants";
import { uniqueId } from "@/lib/utils";

export const SequenceDetailsFromStore = t
	.model("SequenceDetails", {
		fromFrame: t.number,
		durationInFrames: t.number,
	})
	.views((self) => ({
		get endFrame() {
			return self.fromFrame + self.durationInFrames;
		},
	}));

const BaseNodeFromStore = t
	.model("BaseNode", {
		id: t.identifier,
		title: t.string,
		sequenceDetails: SequenceDetailsFromStore,
	})
	.actions((self) => ({
		endFrame() {
			return (
				self.sequenceDetails.fromFrame + self.sequenceDetails.durationInFrames
			);
		},
	}));

const CanvasNodeFromStore = t
	.compose(
		BaseNodeFromStore,
		t.model({
			// animations: t.array(Animation),
			transforms: t.model("Transforms", {
				top: t.number,
				left: t.number,
				width: t.number,
				height: t.union(t.number, t.literal("auto")),
			}),
		}),
	)
	.actions((self) => ({
		moveWithShift(top: number, left: number) {
			self.transforms.top += top * 5;
			self.transforms.left += left * 5;
		},
		moveTo(top: number, left: number) {
			self.transforms.top = top;
			self.transforms.left = left;
		},
		moveBy(deltaTop: number, deltaLeft: number) {
			self.transforms.top += deltaTop;
			self.transforms.left += deltaLeft;
		},
		resizeTo(width: number, height: number | "auto") {
			self.transforms.width = Math.max(20, width);
			self.transforms.height =
				typeof height === "number" ? Math.max(20, height) : "auto";
		},
		resizeBy(deltaWidth: number, deltaHeight: number) {
			self.transforms.width = Math.max(20, self.transforms.width + deltaWidth);
			if (typeof self.transforms.height === "number") {
				self.transforms.height = Math.max(
					20,
					self.transforms.height + deltaHeight,
				);
			}
			// If height is "auto", we don't resize it
		},
		resizeFromCorner(
			deltaWidth: number,
			deltaHeight: number,
			anchor: "topLeft" | "topRight" | "bottomLeft" | "bottomRight",
		) {
			const newWidth = Math.max(20, self.transforms.width + deltaWidth);
			const currentHeight =
				typeof self.transforms.height === "number" ? self.transforms.height : 0;
			const newHeight = Math.max(20, currentHeight + deltaHeight);

			// Adjust position based on anchor point
			if (anchor === "topLeft" || anchor === "bottomLeft") {
				self.transforms.left += self.transforms.width - newWidth;
			}
			if (anchor === "topLeft" || anchor === "topRight") {
				if (typeof self.transforms.height === "number") {
					self.transforms.top += self.transforms.height - newHeight;
				}
			}

			self.transforms.width = newWidth;
			if (typeof self.transforms.height === "number") {
				self.transforms.height = newHeight;
			}
		},
		resizeFromSide(delta: number, side: "left" | "right" | "top" | "bottom") {
			switch (side) {
				case "left": {
					const newWidthLeft = Math.max(20, self.transforms.width - delta);
					self.transforms.left += self.transforms.width - newWidthLeft;
					self.transforms.width = newWidthLeft;
					break;
				}
				case "right":
					self.transforms.width = Math.max(20, self.transforms.width + delta);
					break;
				case "top": {
					if (typeof self.transforms.height === "number") {
						const newHeightTop = Math.max(20, self.transforms.height - delta);
						self.transforms.top += self.transforms.height - newHeightTop;
						self.transforms.height = newHeightTop;
					}
					break;
				}
				case "bottom":
					if (typeof self.transforms.height === "number") {
						self.transforms.height = Math.max(
							20,
							self.transforms.height + delta,
						);
					}
					break;
			}
		},
	}))
	.views((self) => ({
		getNumericHeight(measuredHeight?: number): number {
			return typeof self.transforms.height === "number"
				? self.transforms.height
				: (measuredHeight ?? 0);
		},
		get bounds() {
			// Note: This will return 0 for height when "auto" and no measured height is provided
			// The calling code should use getNumericHeight with actual measured height
			const height =
				typeof self.transforms.height === "number" ? self.transforms.height : 0;
			return {
				left: self.transforms.left,
				top: self.transforms.top,
				right: self.transforms.left + self.transforms.width,
				bottom: self.transforms.top + height,
				centerX: self.transforms.left + self.transforms.width / 2,
				centerY: self.transforms.top + height / 2,
			};
		},
		getBoundsWithHeight(measuredHeight?: number) {
			const height = this.getNumericHeight(measuredHeight);
			return {
				left: self.transforms.left,
				top: self.transforms.top,
				right: self.transforms.left + self.transforms.width,
				bottom: self.transforms.top + height,
				centerX: self.transforms.left + self.transforms.width / 2,
				centerY: self.transforms.top + height / 2,
			};
		},
	}));

const MediaNodeFromStore = t.compose(
	"MediaNode",
	CanvasNodeFromStore,
	t.model({
		src: t.string,
	}),
);
const VisualMediaNodeFromStore = t.compose(
	"VisualMediaNode",
	t.model({
		naturalWidth: t.number,
		naturalHeight: t.number,
	}),

	MediaNodeFromStore,
);

const VideoNodeFromStore = t.compose(
	"VideoNode",
	VisualMediaNodeFromStore,
	t.model({
		type: t.literal("video"),
		naturalDurationInFrames: t.number,
	}),
);

const ImageNodeFromStore = t.compose(
	"ImageNode",
	VisualMediaNodeFromStore,
	t.model({
		type: t.literal("image"),
	}),
);

const TextNodeFromStore = t.compose(
	"TextNode",
	CanvasNodeFromStore,
	t.model({
		type: t.literal("text"),
		content: t.string,
		style: t.model("TextStyle", {
			fontSize: t.number,
		}),
	}),
);

export const NodeFromStore = t.late(() =>
	t.union(ImageNodeFromStore, VideoNodeFromStore, TextNodeFromStore),
);

export const InputPropsFromStore = t
	.model("InputProps", {
		version: t.literal(1),
		nodes: t.array(NodeFromStore),
		aspectRatio: t.enumeration(
			Object.keys(ASPECT_RATIO_TO_DIMENSIONS) as Array<AspectRatio>,
		),
	})
	.views((self) => ({
		get durationInFrames(): number {
			const biggest = self.nodes.reduce((acc, node) => {
				const isCurrentNodeBiggerThanAcc = node.sequenceDetails.endFrame > acc;

				if (isCurrentNodeBiggerThanAcc) {
					return node.sequenceDetails.endFrame;
				}

				return acc;
			}, 1);

			return biggest;
		},
		get dimensions() {
			return ASPECT_RATIO_TO_DIMENSIONS[self.aspectRatio];
		},
	}))
	.actions((self) => ({
		// deletePage(pageId: string) {
		//   const pageIndex = self.pages.findIndex((page) => page.id === pageId);
		//   if (pageIndex === -1) return;

		//   self.pages.splice(pageIndex, 1);
		// },
		// addPage(page: Omit<Parameters<typeof StorePage.create>[0], "id">) {
		//   const newPageId = uniqueId();

		//   self.pages.push(
		//     StorePage.create({
		//       id: newPageId,
		//       sequenceDetails: { from: 0, durationInFrames: 10 },
		//       ...page,
		//     })
		//   );

		//   return newPageId;
		// },

		addNode(
			node: Except<SnapshotIn<typeof NodeFromStore>, "id" | "sequenceDetails">,
		) {
			const newNodeId = uniqueId() as string;

			self.nodes.push(
				NodeFromStore.create({
					id: newNodeId,
					sequenceDetails: { fromFrame: 0, durationInFrames: 100 },
					...node,
				}),
			);
			return newNodeId;
		},

		selectElementWithId() {
			// const parentPage = self.pages.find((page) =>
			//   page.children.find((child) => child.id === id)
			// );
			// const selectedElement = parentPage?.children.find(
			//   (child) => child.id === id
			// );
			// if (selectedElement) self.selectedElement = selectedElement;
		},
		setAspectRatio(aspectRatio: keyof typeof ASPECT_RATIO_TO_DIMENSIONS) {
			self.aspectRatio = aspectRatio;
		},
	}));

export type UsedInputProps = Instance<typeof InputPropsFromStore>;
// Saved input props don't have derived properties like durationInFrames
export type SavedInputProps = SnapshotIn<typeof InputPropsFromStore>;

export type VideoNode = Instance<typeof VideoNodeFromStore>;
export type ImageNode = Instance<typeof ImageNodeFromStore>;
export type TextNode = Instance<typeof TextNodeFromStore>;
export type Node = Instance<typeof NodeFromStore>;
