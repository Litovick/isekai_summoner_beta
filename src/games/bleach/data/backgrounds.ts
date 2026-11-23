import type { EpisodeStageTheme, GamePhase } from "../types";

export const BLEACH_BACKGROUNDS = {
  titlePrologue: "/bleach/backgrounds/karakura town.jpg",
  nightScene: "/bleach/backgrounds/night scene.png",
  seireitei: "/bleach/backgrounds/seireitei.webp",
  sokyoku: "/bleach/backgrounds/sokyoku.webp",
  huecoMundo: "/bleach/backgrounds/hueco mundo.jpg",
  lasNoches: "/bleach/backgrounds/las noches.webp",
  finalWar: "/bleach/backgrounds/final war.jpg",
  endingRiver: "/bleach/backgrounds/river.jpg",
} as const;

export const BLEACH_STAGE_BACKGROUND_MAP: Record<EpisodeStageTheme, string> = {
  "karakura-night": BLEACH_BACKGROUNDS.nightScene,
  "menos-garganta": BLEACH_BACKGROUNDS.nightScene,
  "urahara-basement": BLEACH_BACKGROUNDS.titlePrologue,
  "seireitei-gate": BLEACH_BACKGROUNDS.seireitei,
  "sokyo-hill": BLEACH_BACKGROUNDS.sokyoku,
  "hueco-mundo": BLEACH_BACKGROUNDS.huecoMundo,
  "final-karakura": BLEACH_BACKGROUNDS.finalWar,
};

export function getBleachStageBackground(
  stageTheme: EpisodeStageTheme,
  phase?: GamePhase,
): string {
  if (stageTheme === "hueco-mundo" && (phase === "choice" || phase === "reaction")) {
    return BLEACH_BACKGROUNDS.lasNoches;
  }
  return BLEACH_STAGE_BACKGROUND_MAP[stageTheme] ?? BLEACH_BACKGROUNDS.titlePrologue;
}

export function toBleachBgUrl(path: string): string {
  return `url('${encodeURI(path)}')`;
}
