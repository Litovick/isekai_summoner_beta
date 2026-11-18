/**
 * Character and scene artwork served from /public/yumeiro.
 * Character PNGs are individually stored with transparent backgrounds.
 */
const root = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/yumeiro`;

export const characterArt: Record<string, string> = {
  "감딸기": `${root}/characters/ddalgi.png`,
  "원가온": `${root}/characters/gaon.png`,
  "안도하": `${root}/characters/doha.png`,
  "서로진": `${root}/characters/rojin.png`,
  "바닐라": `${root}/characters/vanilla.png`,
};

export const sceneArt = Array.from(
  { length: 10 },
  (_, index) => `${root}/backgrounds/stage-${String(index + 1).padStart(2, "0")}.webp`,
);

export const dessertArt = {
  strawberry: `${root}/desserts/strawberry.webp`,
  chocolate: `${root}/desserts/chocolate.webp`,
  creative: `${root}/desserts/creative.webp`,
} as const;
