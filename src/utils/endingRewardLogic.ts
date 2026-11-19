export type PlayableGameId =
  | "aot"
  | "slamdunk"
  | "yumeiro"
  | "sugarsugarrune"
  | "demonslayer"
  | "naruto"
  | "bleach"
  | "onepiece";

export const PLAYABLE_GAME_IDS: readonly PlayableGameId[] = [
  "aot",
  "slamdunk",
  "yumeiro",
  "sugarsugarrune",
  "demonslayer",
  "naruto",
  "bleach",
  "onepiece",
];

const GAME_ID_ALIASES: Record<string, PlayableGameId> = {
  aot: "aot",
  attack: "aot",
  "attack-on-titan": "aot",
  slamdunk: "slamdunk",
  yumeiro: "yumeiro",
  sugarsugarrune: "sugarsugarrune",
  sugarsugarune: "sugarsugarrune",
  demonslayer: "demonslayer",
  naruto: "naruto",
  bleach: "bleach",
  onepiece: "onepiece",
};

export const COUPON_CODE_STORAGE_KEY = "isekai:laftel:first-clear-coupon";
export const COUPON_ISSUED_COUNT_STORAGE_KEY = "isekai:laftel:first-clear-count";

const COUPON_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function resolvePlayableGameQuery(
  rawGameParam: string | null | undefined,
): PlayableGameId | null {
  if (!rawGameParam) return null;
  const normalized = rawGameParam.trim().toLowerCase();
  return GAME_ID_ALIASES[normalized] ?? null;
}

export function generateLaftelCouponCode(randomFn: () => number = Math.random): string {
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    const idx = Math.min(
      COUPON_ALPHABET.length - 1,
      Math.max(0, Math.floor(randomFn() * COUPON_ALPHABET.length)),
    );
    suffix += COUPON_ALPHABET[idx];
  }
  return `LAFTEL-IS-${suffix}`;
}

export function isValidLaftelCouponCode(code: string | null | undefined): code is string {
  return typeof code === "string" && /^LAFTEL-IS-[A-Z0-9]{6}$/.test(code);
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface CouponClaimResult {
  code: string;
  isFirstClaim: boolean;
}

/**
 * Claims or retrieves the user's single first-ending Laftel discount coupon.
 * - First time an ending is reached across any game: generates `LAFTEL-IS-XXXXXX`,
 *   stores it, and returns `isFirstClaim: true`.
 * - Subsequent ending reaches: returns the existing stored coupon code with
 *   `isFirstClaim: false` without generating a duplicate.
 */
export function claimOrGetFirstClearCoupon(
  storage: StorageLike,
  randomFn: () => number = Math.random,
): CouponClaimResult {
  try {
    const existingCode = storage.getItem(COUPON_CODE_STORAGE_KEY);
    if (isValidLaftelCouponCode(existingCode)) {
      const prevCount = Number(storage.getItem(COUPON_ISSUED_COUNT_STORAGE_KEY) || "1");
      storage.setItem(COUPON_ISSUED_COUNT_STORAGE_KEY, String(Math.max(2, prevCount + 1)));
      return {
        code: existingCode,
        isFirstClaim: false,
      };
    }

    const newCode = generateLaftelCouponCode(randomFn);
    storage.setItem(COUPON_CODE_STORAGE_KEY, newCode);
    storage.setItem(COUPON_ISSUED_COUNT_STORAGE_KEY, "1");
    return {
      code: newCode,
      isFirstClaim: true,
    };
  } catch {
    return {
      code: generateLaftelCouponCode(randomFn),
      isFirstClaim: true,
    };
  }
}

export function buildGameDirectShareUrl(origin: string, gameId: string): string {
  const cleanOrigin = origin.replace(/\/+$/, "");
  const canonicalId = resolvePlayableGameQuery(gameId) ?? gameId.trim();
  return `${cleanOrigin}/?game=${encodeURIComponent(canonicalId)}`;
}

export function buildEndingShareMessage(
  endingTitle: string,
  shareUrl: string,
  animeTitle?: string,
): string {
  const cleanTitle = endingTitle.trim();
  const prefix = animeTitle ? `[${animeTitle}] ` : "";
  return `${prefix}나는 [${cleanTitle}] 엔딩 달성! 당신의 선택은? 👉 ${shareUrl}`;
}
