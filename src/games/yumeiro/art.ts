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

export const yumeiroBackgrounds = {
  school: "/yumeiro/backgrounds/school.jpeg",
  kitchen: "/yumeiro/backgrounds/kitchen.png",
  garden: "/yumeiro/backgrounds/garden.jpeg",
  preliminary: "/yumeiro/backgrounds/preliminary.png",
  kingdom: "/yumeiro/backgrounds/kingdom.png",
  final: "/yumeiro/backgrounds/final.png",
  ending: "/yumeiro/backgrounds/ending.jpg",
} as const;

export const titleBackground = yumeiroBackgrounds.school;
export const endingBackground = yumeiroBackgrounds.ending;

export const sceneArt: string[] = [
  yumeiroBackgrounds.school,      // EP 01: 첫 번째 실습 (세인트 마리 학원 정문 / 첫 등교)
  yumeiroBackgrounds.kitchen,     // EP 02: 사라진 딸기 (제과 실습실)
  yumeiroBackgrounds.kitchen,     // EP 03: 원가온의 혹평 (제과 실습실)
  yumeiroBackgrounds.kingdom,     // EP 04: 스위트 요정의 조언 (스위츠 왕국)
  yumeiroBackgrounds.garden,      // EP 05: 무너진 케이크 (학원 정원 / 휴식 및 대화)
  yumeiroBackgrounds.garden,      // EP 06: 디저트 디자인 (정원 / 휴식 및 대화)
  yumeiroBackgrounds.preliminary, // EP 07: 제한 시간 (그랑프리 예선 대회장)
  yumeiroBackgrounds.preliminary, // EP 08: 팀원들의 갈등 (그랑프리 예선 대회장)
  yumeiroBackgrounds.kingdom,     // EP 09: 마지막 연습 (스위츠 왕국 특훈)
  yumeiroBackgrounds.final,       // EP 10: 스위트 콘테스트 결승 (그랑프리 결승 무대)
];

export const dessertArt = {
  strawberry: `${root}/desserts/strawberry.webp`,
  chocolate: `${root}/desserts/chocolate.webp`,
  creative: `${root}/desserts/creative.webp`,
} as const;
