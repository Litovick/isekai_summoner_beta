import test from "node:test";
import assert from "node:assert/strict";
import {
  stages,
  opening,
  endings,
  getEnding,
  judgeEffects,
  characterAssessments,
  clamp,
  isPierreSecretRoute,
  PIERRE_SECRET_KEYS,
} from "./story";

function simulateSugar(path: number[]) {
  assert.equal(path.length, stages.length);
  let heart = 50;
  let virtue = 50;
  path.forEach((choiceIdx, stageIdx) => {
    const choice = stages[stageIdx]!.choices[choiceIdx]!;
    heart = clamp(heart + choice.heart);
    virtue = clamp(virtue + choice.virtue);
  });
  return {
    heart,
    virtue,
    ending: getEnding(heart, virtue, path),
    assessments: characterAssessments(path),
  };
}

test("SugarSugarRune has 10 chapters, 5 endings, aligned judgeEffects, and no spoiler labels", () => {
  assert.equal(stages.length, 10);
  assert.equal(endings.length, 5);
  assert.ok(opening.length >= 4);
  assert.equal(judgeEffects.length, 10);

  const forbidden = /(최선|트레이드오프|실책|정답|오답|추천\s*·)/;
  stages.forEach((stage, i) => {
    assert.equal(stage.choices.length, 3);
    assert.equal(judgeEffects[i]!.length, 3);
    for (const [ci, choice] of stage.choices.entries()) {
      assert.equal(judgeEffects[i]![ci]!.length, 4);
      assert.ok(choice.text.trim().length >= 16, `Choice too short: ${choice.text}`);
      assert.ok(choice.reaction.length > 0 && choice.reaction[0]!.text.trim().length >= 12);
      assert.doesNotMatch(choice.text, forbidden, `Spoiler label found in: ${choice.text}`);
    }
  });
});

test("SugarSugarRune Hidden Ending (Pierre Secret Route) is reachable", () => {
  const path = [1, 0, 0, 0, 1, 0, 0, 1, 0, 2];
  assert.equal(isPierreSecretRoute(path), true);
  assert.equal(path[PIERRE_SECRET_KEYS.invitationStage], PIERRE_SECRET_KEYS.invitationChoice);
  assert.equal(path[PIERRE_SECRET_KEYS.blackHeartStage], PIERRE_SECRET_KEYS.blackHeartChoice);
  assert.equal(path[PIERRE_SECRET_KEYS.finalHeartStage], PIERRE_SECRET_KEYS.finalHeartChoice);

  const res = simulateSugar(path);
  assert.ok(res.heart >= 80, `Expected heart >= 80, got ${res.heart}`);
  assert.equal(res.ending.id, "pierre_secret");
  assert.equal(res.ending.type, "hidden");
});

test("SugarSugarRune Happy Ending (Queen) is reachable", () => {
  const path = [0, 2, 1, 1, 2, 1, 0, 0, 2, 0];
  const res = simulateSugar(path);
  assert.ok(res.heart >= 80 && res.virtue >= 80, `Expected >=80/80, got ${res.heart}/${res.virtue}`);
  assert.equal(res.ending.id, "queen");
  assert.equal(res.ending.type, "happy");
});

test("SugarSugarRune Normal Ending A (Collector) is reachable", () => {
  const path = [1, 0, 0, 0, 1, 1, 0, 0, 1, 0];
  const res = simulateSugar(path);
  assert.ok(res.heart >= 80 && res.virtue >= 40 && res.virtue < 80);
  assert.equal(res.ending.id, "collector");
  assert.equal(res.ending.type, "normal");
});

test("SugarSugarRune Normal Ending B (Guardian) is reachable", () => {
  const path = [2, 1, 1, 1, 0, 2, 0, 0, 2, 1];
  const res = simulateSugar(path);
  assert.ok(res.virtue >= 80 && res.heart >= 40 && res.heart < 80);
  assert.equal(res.ending.id, "guardian");
  assert.equal(res.ending.type, "normal");
});

test("SugarSugarRune Sad Ending is reachable via low heart or collapsed virtue", () => {
  const lowHeartPath = [2, 1, 2, 2, 0, 2, 2, 2, 1, 1];
  const resLowHeart = simulateSugar(lowHeartPath);
  assert.equal(resLowHeart.ending.id, "sad");
  assert.equal(resLowHeart.ending.type, "sad");

  const lowVirtuePath = [1, 0, 0, 0, 1, 1, 1, 2, 0, 0];
  const resLowVirtue = simulateSugar(lowVirtuePath);
  assert.equal(resLowVirtue.ending.id, "sad");
  assert.equal(resLowVirtue.ending.type, "sad");
});

test("SugarSugarRune single-button spam never trivially achieves Queen or Hidden", () => {
  for (const idx of [0, 1, 2]) {
    const res = simulateSugar(Array(10).fill(idx));
    assert.notEqual(res.ending.id, "pierre_secret", `Spamming ${idx} should not unlock hidden`);
    assert.notEqual(res.ending.id, "queen", `Spamming ${idx} should not unlock queen`);
  }
});
