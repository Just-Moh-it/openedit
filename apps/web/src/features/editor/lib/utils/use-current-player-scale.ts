import type { CallbackListener, PlayerRef } from "@remotion/player";
import { type RefObject, useCallback, useSyncExternalStore } from "react";
import { useStore } from "@/features/editor/state";

export const useCurrentPlayerScaleFromPlayerRef = (
	playerRef: RefObject<PlayerRef | null>,
) => {
	const store = useStore();

	const subscriber = useCallback(
		(callback: () => void) => {
			if (!playerRef?.current) return () => {};

			const onScaleChange: CallbackListener<"scalechange"> = ({
				detail: { scale },
			}) => {
				callback();

				store.editor.setPlayerScale(scale);
			};

			playerRef.current.addEventListener("scalechange", onScaleChange);

			return () => {
				playerRef.current?.removeEventListener("scalechange", onScaleChange);
			};
		},
		[playerRef, store],
	);

	return useSyncExternalStore(
		subscriber,
		() => playerRef?.current?.getScale(),
		() => playerRef?.current?.getScale(),
	);
};
