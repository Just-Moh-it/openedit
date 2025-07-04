import type { CallbackListener, PlayerRef } from "@remotion/player";
import { useCallback, useMemo, useRef, useSyncExternalStore } from "react";

export const usePlayer = (ref: React.RefObject<PlayerRef | null>) => {
	// Track buffering state with ref for synchronous access
	const isBufferingRef = useRef(false);

	const onFrameUpdate = useCallback(
		(onStoreChange: () => void) => {
			const { current } = ref;
			if (!current) {
				return () => undefined;
			}

			const updater: CallbackListener<"frameupdate"> = () => {
				onStoreChange();
			};

			current.addEventListener("frameupdate", updater);
			return () => {
				current.removeEventListener("frameupdate", updater);
			};
		},
		[ref],
	);

	const onPlayUpdate = useCallback(
		(onStoreChange: () => void) => {
			const { current } = ref;
			if (!current) {
				return () => undefined;
			}

			const updater: CallbackListener<"play" | "pause"> = () => {
				onStoreChange();
			};

			current.addEventListener("play", updater);
			current.addEventListener("pause", updater);
			return () => {
				current.removeEventListener("play", updater);
				current.removeEventListener("pause", updater);
			};
		},
		[ref],
	);

	const onBufferingUpdate = useCallback(
		(onStoreChange: () => void) => {
			const { current } = ref;
			if (!current) {
				return () => undefined;
			}

			const onBuffering = () => {
				isBufferingRef.current = true;
				onStoreChange();
			};
			const onResume = () => {
				isBufferingRef.current = false;
				onStoreChange();
			};

			current.addEventListener("waiting", onBuffering);
			current.addEventListener("resume", onResume);
			return () => {
				current.removeEventListener("waiting", onBuffering);
				current.removeEventListener("resume", onResume);
			};
		},
		[ref],
	);

	const onFullscreenUpdate = useCallback(
		(onStoreChange: () => void) => {
			const { current } = ref;
			if (!current) {
				return () => undefined;
			}

			const onFullscreen = () => {
				onStoreChange();
			};
			current.addEventListener("fullscreenchange", onFullscreen);
			return () => {
				current.removeEventListener("fullscreenchange", onFullscreen);
			};
		},
		[ref],
	);

	const getCurrentFrame = useCallback(
		() => ref.current?.getCurrentFrame() ?? 0,
		[ref],
	);

	const getIsPlaying = useCallback(
		() => ref.current?.isPlaying() ?? false,
		[ref],
	);

	const getIsBuffering = useCallback(() => isBufferingRef.current, []);

	const getIsFullscreen = useCallback(
		() => ref.current?.isFullscreen() ?? false,
		[ref],
	);

	const currentFrame = useSyncExternalStore(onFrameUpdate, getCurrentFrame);

	const isPlaying = useSyncExternalStore(onPlayUpdate, getIsPlaying);

	const isBuffering = useSyncExternalStore(onBufferingUpdate, getIsBuffering);

	const isFullscreen = useSyncExternalStore(
		onFullscreenUpdate,
		getIsFullscreen,
	);

	return useMemo(
		() => ({ currentFrame, isPlaying, isBuffering, isFullscreen }),
		[currentFrame, isPlaying, isBuffering, isFullscreen],
	);
};
