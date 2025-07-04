import { types as t } from "mobx-state-tree";
import { useContext } from "react";
import { MSTContext } from "@/features/editor/state/context";
import { StoreEditor } from "@/features/editor/state/editor";
import { InputPropsFromStore } from "@/features/editor/state/input-props";
import { Playback as StorePlayback } from "@/features/editor/state/playback";

export const Store = t.model("Store", {
	inputProps: InputPropsFromStore,
	playback: StorePlayback,
	editor: StoreEditor,
});

export function useStore() {
	const store = useContext(MSTContext);

	if (!store) {
		throw new Error("useStore must be used within a StoreProvider");
	}

	return store;
}
