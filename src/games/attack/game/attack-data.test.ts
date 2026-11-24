import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  AOT_HIDDEN_KEYS,
  ENDING_ORDER,
  endings,
  isAotHiddenRoute,
  missions,
  outcome,
} from "./attack-data";

const clamp = (n: number) => Math.max(0, Math.min(100, n));
const VALID_SPEAKERS = new Set(["엘빈", "리바이", "미카사", "아르민", "한지"]);
const SPOILER_PATTERN = /(최선\s*·|트레이드오프\s*·|실책\s*·|정답\s*·|오답\s*·)/;

function simulateAttack(picks: number[]) {
  assert.equal(picks.length, missions.length);
  let survival = 50;
  let trust = 50;

  missions.forEach((m, idx) => {
    const c = m.choices[picks[idx]!];
    assert.ok(c, `Choice ${picks[idx]} missing on mission ${idx + 1}`);
    survival = clamp(survival + c.survival);
    trust = clamp(trust + c.trust);
  });

  const endingId = outcome(survival, trust, picks);
  return { survival, trust, endingId, ending: endings[endingId] };
}

describe("attack-data", () => {
  it("has 10 missions with 3 rich non-spoiler choices and valid portrait speakers", () => {
    assert.equal(missions.length, 10);
    assert.equal(ENDING_ORDER.length, 5);
    for (const m of missions) {
      assert.ok(VALID_SPEAKERS.has(m.speaker), `Invalid mission speaker: ${m.speaker}`);
      assert.equal(m.choices.length, 3);
      for (const c of m.choices) {
        assert.ok(c.label.length >= 24 && c.label.length <= 72, `Label length: ${c.label}`);
        assert.equal(SPOILER_PATTERN.test(c.label), false, `Spoiler leaked: ${c.label}`);
        const speakerPrefix = c.reaction.split(":")[0]?.trim() ?? "";
        assert.ok(
          VALID_SPEAKERS.has(speakerPrefix),
          `Invalid reaction speaker prefix "${speakerPrefix}" in "${c.reaction}"`,
        );
      }
    }
  });

  it("reaches Hidden Ending with high survival, high trust, and all 3 secret keys", () => {
    const hiddenPath = [1, 2, 0, 2, 2, 0, 1, 2, 0, 1];
    const res = simulateAttack(hiddenPath);
    assert.equal(isAotHiddenRoute(hiddenPath), true);
    assert.ok(res.survival >= 80 && res.trust >= 80);
    assert.equal(res.endingId, "hidden");
    assert.equal(res.ending.type, "hidden");
  });

  it("reaches Happy Ending (hero) with high stats when a hidden key is missed", () => {
    const heroPath = [1, 2, 0, 2, 2, 0, 1, 2, 1, 1]; // misses mission 9 key (0 -> 1)
    const res = simulateAttack(heroPath);
    assert.equal(isAotHiddenRoute(heroPath), false);
    assert.ok(res.survival >= 80 && res.trust >= 80);
    assert.equal(res.endingId, "hero");
    assert.equal(res.ending.type, "happy");
  });

  it("reaches Normal Ending (survivor) with survival >= 65 but below hero thresholds", () => {
    const survivorPath = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
    const res = simulateAttack(survivorPath);
    assert.ok(res.survival >= 65);
    assert.equal(res.endingId, "survivor");
    assert.equal(res.ending.type, "normal");
  });

  it("reaches Sad Ending (sacrifice) with high trust and final solo lure choice", () => {
    const sacrificePath = [1, 2, 0, 0, 0, 0, 2, 2, 1, 0];
    const res = simulateAttack(sacrificePath);
    assert.ok(res.trust >= 70);
    assert.equal(res.endingId, "sacrifice");
    assert.equal(res.ending.type, "sad");
  });

  it("reaches Sad Ending (fallen) when survival falls below 65 without sacrifice", () => {
    const fallenPath = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const res = simulateAttack(fallenPath);
    assert.ok(res.survival < 65);
    assert.equal(res.endingId, "fallen");
    assert.equal(res.ending.type, "sad");
  });

  it("prevents single-button spam (0x10, 1x10, 2x10) from reaching Happy or Hidden", () => {
    for (const slot of [0, 1, 2]) {
      const res = simulateAttack(Array(10).fill(slot));
      assert.notEqual(res.endingId, "hidden", `Spamming slot ${slot} reached hidden`);
      assert.notEqual(res.endingId, "hero", `Spamming slot ${slot} reached hero`);
    }
    const distinctSlots = new Set(AOT_HIDDEN_KEYS.map((k) => k.choiceIndex));
    assert.equal(distinctSlots.size, 3, "Hidden keys should span all 3 button slots");
  });
});
