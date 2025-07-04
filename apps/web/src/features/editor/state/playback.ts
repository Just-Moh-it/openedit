import { PLAYBACK_SPEED_MAP } from "@/features/editor/lib/constants";
import { t } from "mobx-state-tree";

export const Playback = t.optional(
	t
		.model({
			speed: t.optional(
				t.enumeration(
					"playbackSpeed",
					Object.keys(
						PLAYBACK_SPEED_MAP,
					) as (keyof typeof PLAYBACK_SPEED_MAP)[],
				),
				"1.0x",
			),
			volume: t.optional(t.number, 1),
			isMuted: t.optional(t.boolean, false),
		})
		.actions((self) => ({
			setSpeed(speed: keyof typeof PLAYBACK_SPEED_MAP) {
				self.speed = speed;
			},
			setVolume(volume: number) {
				self.volume = volume;
			},
			setIsMuted(isMuted: boolean) {
				self.isMuted = isMuted;
			},
		})),
	{},
);
