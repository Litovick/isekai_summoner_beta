import type { EpisodeStageTheme } from "../types";

export const DEMONSLAYER_BACKGROUNDS = {
  titlePrologue: "/demonslayer/backgrounds/tanjiro house.png",
  wisteriaForest: "/demonslayer/backgrounds/forest.jpg",
  nightNatagumo: "/demonslayer/backgrounds/night natagumo.webp",
  mansion: "/demonslayer/backgrounds/mansion.png",
  mugenTrain: "/demonslayer/backgrounds/mugen train.jpg",
  nightStreet: "/demonslayer/backgrounds/night street.jpg",
  infinityCastle: "/demonslayer/backgrounds/castle.jpg",
  endingSunset: "/demonslayer/backgrounds/sunset.jpg",
} as const;

export const DEMONSLAYER_STAGE_BACKGROUND_MAP: Record<EpisodeStageTheme, string> = {
  "wisteria-mountain": DEMONSLAYER_BACKGROUNDS.wisteriaForest,
  "butterfly-mansion": DEMONSLAYER_BACKGROUNDS.mansion,
  "mugen-train": DEMONSLAYER_BACKGROUNDS.mugenTrain,
  "entertainment-district": DEMONSLAYER_BACKGROUNDS.nightStreet,
  "swordsmith-village": DEMONSLAYER_BACKGROUNDS.nightNatagumo,
  "hashira-training": DEMONSLAYER_BACKGROUNDS.wisteriaForest,
  "muzan-ambush": DEMONSLAYER_BACKGROUNDS.mansion,
  "infinity-castle": DEMONSLAYER_BACKGROUNDS.infinityCastle,
};

export function getDemonSlayerStageBackground(stageTheme: EpisodeStageTheme): string {
  return (
    DEMONSLAYER_STAGE_BACKGROUND_MAP[stageTheme] ??
    DEMONSLAYER_BACKGROUNDS.titlePrologue
  );
}

export function toDemonSlayerBgUrl(path: string): string {
  return `url('${encodeURI(path)}')`;
}
