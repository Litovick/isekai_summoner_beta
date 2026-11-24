import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  SLAMDUNK_HIDDEN_KEYS,
  isSlamDunkHiddenRoute,
  slamdunkEndings,
  slamdunkQuestions,
} from "./slamdunk-story";
import type { Stats } from "./types";

const clamp = (n: number) => Math.max(0, Math.min(100, n));

function simulateSlamDunk(picks: number[]) {
  assert.equal(picks.length, slamdunkQuestions.length);
  const stats: Stats = { trust: 50, judgment: 50 };
  const answers: Record<string, number> = {};

  slamdunkQuestions.forEach((q, idx) => {
    const choiceIndex = picks[idx]!;
    const choice = q.choices[choiceIndex];
    assert.ok(choice, `Choice ${choiceIndex} missing on ${q.id}`);
    answers[q.id] = choiceIndex;
    stats.trust = clamp((stats.trust ?? 50) + (choice.effects.trust ?? 0));
    stats.judgment = clamp((stats.judgment ?? 50) + (choice.effects.judgment ?? 0));
  });

  const ending =
    slamdunkEndings.find((e) => e.condition(stats, answers)) ??
    slamdunkEndings[slamdunkEndings.length - 1]!;
  return { stats, answers, ending };
}

const SPOILER_PATTERN = /(최선\s*·|트레이드오프\s*·|실책\s*·|정답\s*·|오답\s*·)/;

describe("slamdunk-story", () => {
  it("has 10 questions with 3 rich non-spoiler choices each", () => {
    assert.equal(slamdunkQuestions.length, 10);
    for (const q of slamdunkQuestions) {
      assert.equal(q.choices.length, 3, `${q.id} should have 3 choices`);
      for (const c of q.choices) {
        assert.ok(c.label.length >= 24 && c.label.length <= 72, `${q.id} label length: ${c.label}`);
        assert.equal(SPOILER_PATTERN.test(c.label), false, `Spoiler label leaked: ${c.label}`);
        assert.ok(c.reactions.length >= 1, `${q.id} should have reaction lines`);
      }
    }
  });

  it("unlocks Hidden Ending only with high stats AND all 3 tactical keys", () => {
    const hiddenPath = [0, 2, 1, 1, 2, 0, 2, 0, 2, 1];
    const res = simulateSlamDunk(hiddenPath);
    assert.equal(isSlamDunkHiddenRoute(res.answers), true);
    assert.ok(res.stats.trust >= 80 && res.stats.judgment >= 80);
    assert.equal(res.ending.id, "hidden");
    assert.equal(res.ending.type, "hidden");
  });

  it("unlocks Happy Ending with high stats when a hidden tactical key is missed", () => {
    const happyPath = [0, 2, 1, 1, 2, 0, 2, 0, 1, 1]; // misses q9 hidden key (2 -> 1)
    const res = simulateSlamDunk(happyPath);
    assert.equal(isSlamDunkHiddenRoute(res.answers), false);
    assert.ok(res.stats.trust >= 75 && res.stats.judgment >= 75);
    assert.equal(res.ending.id, "happy");
    assert.equal(res.ending.type, "happy");
  });

  it("unlocks Normal Ending with moderate balanced stats", () => {
    const normalPath = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
    const res = simulateSlamDunk(normalPath);
    assert.ok(res.stats.trust >= 45 && res.stats.judgment >= 45);
    assert.equal(res.ending.id, "normal");
    assert.equal(res.ending.type, "normal");
  });

  it("unlocks Sad Ending when trust or judgment drops below 45", () => {
    const sadPath = [2, 1, 0, 2, 0, 2, 1, 1, 0, 0];
    const res = simulateSlamDunk(sadPath);
    assert.ok(res.stats.trust < 45 || res.stats.judgment < 45);
    assert.equal(res.ending.id, "sad");
    assert.equal(res.ending.type, "sad");
  });

  it("prevents single-button spam (0x10, 1x10, 2x10) from reaching Happy or Hidden", () => {
    for (const slot of [0, 1, 2]) {
      const res = simulateSlamDunk(Array(10).fill(slot));
      assert.notEqual(res.ending.id, "hidden", `Spamming slot ${slot} reached hidden`);
      assert.notEqual(res.ending.id, "happy", `Spamming slot ${slot} reached happy`);
    }
    const distinctSlots = new Set(SLAMDUNK_HIDDEN_KEYS.map((k) => k.choiceIndex));
    assert.equal(distinctSlots.size, 3, "Hidden keys should span all 3 button slots");
  });
});
