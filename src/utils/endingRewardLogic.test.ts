import test from "node:test";
import assert from "node:assert/strict";
import {
  buildEndingShareMessage,
  buildGameDirectShareUrl,
  claimOrGetFirstClearCoupon,
  generateLaftelCouponCode,
  isValidLaftelCouponCode,
  resolvePlayableGameQuery,
  type StorageLike,
} from "./endingRewardLogic";

function createMemoryStorage(): StorageLike {
  const map = new Map<string, string>();
  return {
    getItem(key: string) {
      return map.has(key) ? map.get(key)! : null;
    },
    setItem(key: string, value: string) {
      map.set(key, value);
    },
  };
}

test("resolvePlayableGameQuery maps all playable games and aliases", () => {
  assert.equal(resolvePlayableGameQuery("demonslayer"), "demonslayer");
  assert.equal(resolvePlayableGameQuery("naruto"), "naruto");
  assert.equal(resolvePlayableGameQuery("bleach"), "bleach");
  assert.equal(resolvePlayableGameQuery("onepiece"), "onepiece");
  assert.equal(resolvePlayableGameQuery("slamdunk"), "slamdunk");
  assert.equal(resolvePlayableGameQuery("yumeiro"), "yumeiro");
  assert.equal(resolvePlayableGameQuery("sugarsugarrune"), "sugarsugarrune");
  assert.equal(resolvePlayableGameQuery("sugarsugarune"), "sugarsugarrune");
  assert.equal(resolvePlayableGameQuery("aot"), "aot");
  assert.equal(resolvePlayableGameQuery("attack"), "aot");
  assert.equal(resolvePlayableGameQuery("unknown-game"), null);
  assert.equal(resolvePlayableGameQuery(null), null);
});

test("generateLaftelCouponCode produces LAFTEL-IS-XXXXXX 6-char alphanumeric format", () => {
  const code = generateLaftelCouponCode();
  assert.equal(isValidLaftelCouponCode(code), true);
  assert.match(code, /^LAFTEL-IS-[A-Z0-9]{6}$/);
});

test("claimOrGetFirstClearCoupon issues coupon once on first ending and reuses it on 2nd+ endings", () => {
  const storage = createMemoryStorage();

  const first = claimOrGetFirstClearCoupon(storage);
  assert.equal(first.isFirstClaim, true);
  assert.equal(isValidLaftelCouponCode(first.code), true);

  const second = claimOrGetFirstClearCoupon(storage);
  assert.equal(second.isFirstClaim, false);
  assert.equal(second.code, first.code);

  const third = claimOrGetFirstClearCoupon(storage);
  assert.equal(third.isFirstClaim, false);
  assert.equal(third.code, first.code);
});

test("buildGameDirectShareUrl and buildEndingShareMessage format share payload cleanly", () => {
  const url = buildGameDirectShareUrl("https://isekai.example.com/", "onepiece");
  assert.equal(url, "https://isekai.example.com/?game=onepiece");

  const msg = buildEndingShareMessage("새로운 시대를 여는 해적왕의 동료", url);
  assert.equal(
    msg,
    "나는 [새로운 시대를 여는 해적왕의 동료] 엔딩 달성! 당신의 선택은? 👉 https://isekai.example.com/?game=onepiece",
  );
});
