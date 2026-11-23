import type { EpisodeStageTheme } from "../types";

export const NARUTO_BACKGROUNDS = {
  titlePrologue: "/naruto/backgrounds/konoha.webp",
  trainingGround: "/naruto/backgrounds/training ground.png",
  bridge: "/naruto/backgrounds/bridge.jpeg",
  forest: "/naruto/backgrounds/forest.png",
  amegakure: "/naruto/backgrounds/amegakure.jpg",
  painBattle: "/naruto/backgrounds/pain.jpg",
  finalValley: "/naruto/backgrounds/valley.jpg",
  endingSunset: "/naruto/backgrounds/sunset konoha.jpg",
} as const;

export const NARUTO_STAGE_BACKGROUND_MAP: Record<EpisodeStageTheme, string> = {
  "training-ground": NARUTO_BACKGROUNDS.trainingGround,
  "wave-bridge": NARUTO_BACKGROUNDS.bridge,
  "forest-of-death": NARUTO_BACKGROUNDS.forest,
  "akatsuki-moon": NARUTO_BACKGROUNDS.amegakure,
  "final-valley": NARUTO_BACKGROUNDS.finalValley,
  "twilight-medical": NARUTO_BACKGROUNDS.painBattle,
  "fourth-hokage-will": NARUTO_BACKGROUNDS.painBattle,
};

export function getNarutoStageBackground(stageTheme: EpisodeStageTheme): string {
  return NARUTO_STAGE_BACKGROUND_MAP[stageTheme] ?? NARUTO_BACKGROUNDS.titlePrologue;
}

/**
 * amegakure.jpg has a corner logo in the upper-right; apply scale(1.15) + left bottom
 * ONLY when this image is active so the logo is cleanly cropped outside the viewport.
 */
export function isNarutoTopRightLogoCropBackground(path: string): boolean {
  return path === NARUTO_BACKGROUNDS.amegakure;
}

export function toNarutoBgUrl(path: string): string {
  return `url('${encodeURI(path)}')`;
}
