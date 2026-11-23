import erwin from "../assets/p-erwin.png";
import levi from "../assets/p-levi.png";
import mikasa from "../assets/p-mikasa.png";
import armin from "../assets/p-armin.png";
import hange from "../assets/p-hange.png";

export const attackBackgrounds = {
  prologue: "/attack/backgrounds/prologue.jpg",
  training: "/attack/backgrounds/training.png",
  defense: "/attack/backgrounds/defense.jpeg",
  forest: "/attack/backgrounds/forest.jpeg",
  wall: "/attack/backgrounds/wall.webp",
  escape: "/attack/backgrounds/escape.jpg",
  sea: "/attack/backgrounds/sea.jpg",
} as const;

export const backgroundFallbacks: Record<string, string> = {
  "/attack/backgrounds/escape.jpg": "/attack/backgrounds/escape.png",
  "/attack/backgrounds/sea.jpg": "/attack/backgrounds/sea.png",
};

/** One background per mission (index 0-9). */
export const missionBackgrounds = [
  attackBackgrounds.prologue, // 01: 첫 번째 명령 (조사병단 본부 / 출정 프롤로그)
  attackBackgrounds.training, // 02: 벽 밖의 첫발 (기동 및 진형 훈련)
  attackBackgrounds.forest,   // 03: 거인의 그림자 (거목의 숲 입구)
  attackBackgrounds.defense,  // 04: 낙오된 동료 (시가지/황야 방어전)
  attackBackgrounds.training, // 05: 마지막 가스통 (입체기동 보급 거점)
  attackBackgrounds.forest,   // 06: 리바이의 긴급 명령 (거목의 숲)
  attackBackgrounds.defense,  // 07: 부상자의 외침 (무너진 감시 초소 방어전)
  attackBackgrounds.wall,     // 08: 포위된 골짜기 (성벽 위 방어선)
  attackBackgrounds.wall,     // 09: 엘빈의 결단 (성벽 전선 지휘소)
  attackBackgrounds.escape,   // 10: 마지막 선택 (성문 돌파 / 탈출 및 결전)
];

export const homeBackground = attackBackgrounds.prologue;
export const endingBackground = attackBackgrounds.sea;
export const portraits: Record<string, string> = { 엘빈: erwin, 리바이: levi, 미카사: mikasa, 아르민: armin, 한지: hange };
