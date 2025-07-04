import { type Instance, t } from "mobx-state-tree";
import { NodeFromStore } from "@/features/editor/state/input-props";

export const StoreEditor = t.optional(
	t
		.model("Editor", {
			timelineZoom: t.optional(t.number, 1),
			playerScale: t.optional(t.number, 1),
			selectedElement: t.maybeNull(t.reference(NodeFromStore)),
		})
		.actions((self) => ({
			setTimelineZoom(zoom: number) {
				self.timelineZoom = zoom;
			},
			setPlayerScale(scale: number) {
				self.playerScale = scale;
			},
			setSelectedElement(element: Instance<typeof NodeFromStore> | null) {
				self.selectedElement = element;
			},
		})),
	{},
);
