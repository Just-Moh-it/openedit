export const PLAYBACK_SPEED_MAP = {
	"0.25x": 0.25,
	"0.5x": 0.5,
	"0.75x": 0.75,
	"1.0x": 1,
	"1.25x": 1.25,
	"1.5x": 1.5,
	"1.75x": 1.75,
	"2.0x": 2,
} as const satisfies Record<string, number>;

export const BASE_COMP_ID = "base-comp" as const satisfies string;
export const FPS = 30 as const;
export const ASPECT_RATIO_TO_DIMENSIONS = {
	"16:9": {
		width: 1920,
		height: 1080,
	},
	"1:1": {
		width: 1080,
		height: 1080,
	},
	"9:16": {
		width: 1080,
		height: 1920,
	},
};
export type AspectRatio = keyof typeof ASPECT_RATIO_TO_DIMENSIONS;

export const TIMELINE_PX_PER_FRAME = 2 as const;
export const TIMELINE_MIN_ZOOM = 0.01 as const;
export const TIMELINE_MAX_ZOOM = 4 as const;

export const TIMELINE_PAGE_SPACER_WIDTH_IN_PX = 15 as const;
