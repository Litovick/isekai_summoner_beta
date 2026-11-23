import type { EpisodeStageTheme } from "../types";

export const ONEPIECE_BACKGROUNDS = {
  titlePrologue: "/onepiece/backgrounds/east blue village.webp",
  sunnySea: "/onepiece/backgrounds/sunny sea.jpg",
  stormySea: "/onepiece/backgrounds/stormy sea.jpg",
  drumIsland: "/onepiece/backgrounds/drum island.jpg",
  desert: "/onepiece/backgrounds/desert.png",
  skypiea: "/onepiece/backgrounds/skypiea.jpg",
  marineford: "/onepiece/backgrounds/marinford.webp",
  endingSunset: "/onepiece/backgrounds/sunset.jpg",
} as const;

export const ONEPIECE_STAGE_BACKGROUND_MAP: Record<EpisodeStageTheme, string> = {
  "east-blue": ONEPIECE_BACKGROUNDS.sunnySea,
  "grand-line-storm": ONEPIECE_BACKGROUNDS.stormySea,
  "drum-sakura": ONEPIECE_BACKGROUNDS.drumIsland,
  "alabasta-flame": ONEPIECE_BACKGROUNDS.desert,
  "skypiea-bell": ONEPIECE_BACKGROUNDS.skypiea,
  "marineford-war": ONEPIECE_BACKGROUNDS.marineford,
  "new-world-dawn": ONEPIECE_BACKGROUNDS.endingSunset,
};

export function getOnePieceStageBackground(stageTheme: EpisodeStageTheme): string {
  return ONEPIECE_STAGE_BACKGROUND_MAP[stageTheme] ?? ONEPIECE_BACKGROUNDS.titlePrologue;
}

export function toOnePieceBgUrl(path: string): string {
  return `url('${encodeURI(path)}')`;
}
