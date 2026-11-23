import test from "node:test";
import assert from "node:assert/strict";
import {
  stages,
  clamp,
  dessertOf,
  endingOf,
  isHiddenRecipeCombo,
  HIDDEN_RECIPE_KEYS,
} from "./story";

function simulateYumeiro(path: number[]) {
  assert.equal(path.length, stages.length);
  let skill = 50;
  let team = 50;
  path.forEach((choiceIdx, stageIdx) => {
    const choice = stages[stageIdx]!.choices[choiceIdx]!;
    skill = clamp(skill + choice.skill);
    team = clamp(team + choice.team);
  });
  return {
    skill,
    team,
    dessert: dessertOf(path),
    ending: endingOf(skill, team, path),
  };
}

test("Yumeiro has 10 stages with 3 choices and no spoiler labels", () => {
  assert.equal(stages.length, 10);
  const forbidden = /(최선|트레이드오프|실책|정답|오답|추천\s*·)/;
  for (const stage of stages) {
    assert.equal(stage.choices.length, 3);
    assert.ok(stage.dialogue.trim().length > 0);
    for (const choice of stage.choices) {
      assert.ok(choice.text.trim().length >= 16, `Choice too short: ${choice.text}`);
      assert.ok(choice.response.trim().length >= 12, `Response too short: ${choice.response}`);
      assert.doesNotMatch(choice.text, forbidden, `Spoiler label found in: ${choice.text}`);
    }
  }
});

test("Yumeiro Hidden Ending is reachable via Miracle Creative 3-step combo + 80/80 stats", () => {
  const path = [0, 1, 1, 0, 2, 1, 2, 1, 0, 2];
  assert.equal(isHiddenRecipeCombo(path), true);
  assert.equal(path[HIDDEN_RECIPE_KEYS.fairyExperimentStage], HIDDEN_RECIPE_KEYS.fairyExperimentChoice);
  assert.equal(path[HIDDEN_RECIPE_KEYS.platingStage], HIDDEN_RECIPE_KEYS.platingChoice);
  assert.equal(path[HIDDEN_RECIPE_KEYS.finaleStage], HIDDEN_RECIPE_KEYS.finaleChoice);

  const res = simulateYumeiro(path);
  assert.ok(res.skill >= 80 && res.team >= 80, `Expected >=80/80, got ${res.skill}/${res.team}`);
  assert.equal(res.ending, "hidden");
});

test("Yumeiro Happy Ending is reachable without triggering Hidden combo", () => {
  const path = [0, 2, 1, 1, 2, 2, 2, 1, 0, 1];
  assert.equal(isHiddenRecipeCombo(path), false);
  const res = simulateYumeiro(path);
  assert.ok(res.skill >= 75 && res.team >= 75, `Expected >=75/75, got ${res.skill}/${res.team}`);
  assert.equal(res.ending, "happy");
});

test("Yumeiro Normal Ending is reachable with balanced/middling stats", () => {
  const path = [1, 2, 2, 1, 2, 0, 1, 0, 2, 0];
  const res = simulateYumeiro(path);
  assert.equal(res.ending, "normal");
});

test("Yumeiro Sad Ending is reachable via reckless or isolated choices", () => {
  const recklessPath = [2, 0, 0, 2, 1, 0, 0, 2, 1, 0];
  const res = simulateYumeiro(recklessPath);
  assert.ok(res.skill < 45 || res.team < 45, `Expected <45 on one stat, got ${res.skill}/${res.team}`);
  assert.equal(res.ending, "sad");
});

test("Yumeiro single-button spam never trivially achieves Happy or Hidden", () => {
  for (const idx of [0, 1, 2]) {
    const res = simulateYumeiro(Array(10).fill(idx));
    assert.notEqual(res.ending, "hidden", `Spamming ${idx} should not unlock hidden`);
    assert.notEqual(res.ending, "happy", `Spamming ${idx} should not unlock happy`);
  }
});
