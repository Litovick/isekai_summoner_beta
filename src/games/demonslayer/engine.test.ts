import test from "node:test";
import assert from "node:assert/strict";
import { CHARACTERS, CORPS_CHARACTER_IDS } from "./data/characters";
import { EPISODES } from "./data/episodes";
import {
  advanceEpisodeOrResult,
  applyChoice,
  clampStat,
  createInitialState,
  evaluateCharacters,
  gradeForScore,
  resolveEnding,
} from "./engine";
import type { CharacterId } from "./types";

function simulateRun(choiceIndices: number[]) {
  assert.equal(choiceIndices.length, EPISODES.length);
  let state = createInitialState();
  state = { ...state, phase: "prologue" };
  state = advanceEpisodeOrResult(state); // -> ep 0 story

  for (let ep = 0; ep < EPISODES.length; ep++) {
    const episode = EPISODES[ep]!;
    for (let i = 0; i < episode.lines.length; i++) {
      state = advanceEpisodeOrResult(state);
    }
    assert.equal(state.phase, "choice");
    state = applyChoice(state, choiceIndices[ep]!);
    assert.equal(state.phase, "reaction");

    const reactions = episode.choices[choiceIndices[ep]!]!.reactions;
    for (let r = 0; r < reactions.length; r++) {
      state = advanceEpisodeOrResult(state);
    }
  }

  assert.equal(state.phase, "result");
  return state;
}

test("initial stats start at 50 and clampStat bounds 0..100", () => {
  const s = createInitialState();
  assert.deepEqual(s.stats, { breathing: 50, trust: 50, resolve: 50 });
  assert.equal(clampStat(-15), 0);
  assert.equal(clampStat(125), 100);
  assert.equal(clampStat(74.6), 75);
});

test("grade thresholds follow S(75+), A(60-74), B(45-59), C(30-44), D(0-29)", () => {
  assert.equal(gradeForScore(100), "S");
  assert.equal(gradeForScore(75), "S");
  assert.equal(gradeForScore(74), "A");
  assert.equal(gradeForScore(60), "A");
  assert.equal(gradeForScore(59), "B");
  assert.equal(gradeForScore(45), "B");
  assert.equal(gradeForScore(44), "C");
  assert.equal(gradeForScore(30), "C");
  assert.equal(gradeForScore(29), "D");
  assert.equal(gradeForScore(0), "D");
});

test("all 14 characters appear across the 8 episodes and every episode has Best + Tradeoff + Mistake choices", () => {
  assert.equal(EPISODES.length, 8);
  assert.equal(Object.keys(CHARACTERS).length, 14);
  assert.equal(CORPS_CHARACTER_IDS.length, 13);

  const appeared = new Set<CharacterId>();
  const bestIndices = new Set<number>();
  for (const ep of EPISODES) {
    assert.equal(ep.choices.length, 3);
    let bestCount = 0;
    let tradeoffCount = 0;
    let mistakeCount = 0;

    ep.choices.forEach((ch, idx) => {
      const vals = [ch.effects.breathing, ch.effects.trust, ch.effects.resolve];
      const pos10 = vals.filter((v) => v >= 10).length;
      const neg10 = vals.filter((v) => v <= -10).length;
      const allNonNeg = vals.every((v) => v >= 0);

      if (allNonNeg && pos10 >= 2) {
        bestCount++;
        bestIndices.add(idx);
      } else if (pos10 >= 1 && neg10 >= 1 && neg10 < 2) {
        tradeoffCount++;
      } else if (neg10 >= 2) {
        mistakeCount++;
      }
      for (const r of ch.reactions) {
        if (r.speaker !== "narrator") appeared.add(r.speaker);
      }
    });

    assert.equal(bestCount, 1, `EP ${ep.id} should have exactly 1 Best choice`);
    assert.equal(tradeoffCount, 1, `EP ${ep.id} should have exactly 1 Tradeoff choice`);
    assert.equal(mistakeCount, 1, `EP ${ep.id} should have exactly 1 Mistake choice`);

    for (const c of ep.featuredCast) appeared.add(c);
    for (const l of ep.lines) {
      if (l.speaker !== "narrator") appeared.add(l.speaker);
    }
  }
  assert.equal(bestIndices.size, 3, "Best choices must be shuffled across A, B, and C");
  for (const id of Object.keys(CHARACTERS) as CharacterId[]) {
    assert.equal(appeared.has(id), true, `Missing character appearance: ${id}`);
  }
});

test("ending priority order resolves strictly (75+ / 65&65 / 70&<45 / Sad fallback)", () => {
  // Priority 1: all >= 75
  assert.equal(
    resolveEnding({ breathing: 75, trust: 75, resolve: 75 }).id,
    "ending-01",
  );
  // Priority 2: trust >= 65 && resolve >= 65 when breathing < 75
  assert.equal(
    resolveEnding({ breathing: 74, trust: 65, resolve: 65 }).id,
    "ending-02",
  );
  // Priority 3: breathing >= 70 && trust < 45
  assert.equal(
    resolveEnding({ breathing: 70, trust: 44, resolve: 80 }).id,
    "ending-03",
  );
  // Priority 4: Sad ending when avg < 45 or no prior condition met
  assert.equal(
    resolveEnding({ breathing: 40, trust: 35, resolve: 30 }).id,
    "ending-04",
  );
  assert.equal(
    resolveEnding({ breathing: 68, trust: 64, resolve: 66 }).id,
    "ending-04",
  );
});

test("full 8-episode playthroughs reach all 4 endings and mashing A/B/C never clears Ending 1 or 2", () => {
  // Path 1: All Best -> Ending 01 (True Ending)
  const run1 = simulateRun([1, 2, 0, 1, 1, 0, 2, 2]);
  assert.equal(resolveEnding(run1.stats).id, "ending-01");

  // Path 2: Protective Bond Tradeoffs on EP 3,5,7 + Best on EP 1,2,4,6,8 -> Ending 02
  const run2 = simulateRun([1, 2, 2, 1, 0, 0, 1, 2]);
  assert.equal(resolveEnding(run2.stats).id, "ending-02");

  // Path 3: Solitary Tradeoffs on EP 1,2,4,6,8 + Best on EP 3,5,7 -> Ending 03
  const run3 = simulateRun([0, 1, 0, 2, 1, 1, 2, 0]);
  assert.equal(resolveEnding(run3.stats).id, "ending-03");

  // Path 4: All Mistakes -> Sad Ending (Ending 04, avg < 45)
  const run4 = simulateRun([2, 0, 1, 0, 2, 2, 0, 1]);
  assert.equal(resolveEnding(run4.stats).id, "ending-04");
  const avg4 = (run4.stats.breathing + run4.stats.trust + run4.stats.resolve) / 3;
  assert.ok(avg4 < 45, `Expected Sad Ending avg < 45, got ${avg4}`);

  // Anti-spam check: blindly picking A, B, or C every episode must NOT clear Ending 1 or 2
  for (const col of [0, 1, 2]) {
    const mashRun = simulateRun(Array(8).fill(col));
    const endingId = resolveEnding(mashRun.stats).id;
    assert.ok(
      endingId === "ending-03" || endingId === "ending-04",
      `Spamming column ${col} should never clear Ending 1/2 (got ${endingId})`,
    );
  }
});

test("character evaluations reflect affinity penalties with C and D grades on poor play", () => {
  const bestRun = simulateRun([1, 2, 0, 1, 1, 0, 2, 2]);
  const bestEvals = evaluateCharacters(bestRun.affinities);
  assert.equal(bestEvals.length, 13);
  assert.ok(bestEvals.find((e) => e.id === "tanjiro")!.grade === "S");
  assert.ok(bestEvals.find((e) => e.id === "rengoku")!.grade === "S");

  const mistakeRun = simulateRun([2, 0, 1, 0, 2, 2, 0, 1]);
  const mistakeEvals = evaluateCharacters(mistakeRun.affinities);
  const lowGrades = mistakeEvals.filter((e) => e.grade === "C" || e.grade === "D");
  assert.ok(lowGrades.length >= 10, `Expected C/D rebukes across corps, got ${lowGrades.length}`);
  assert.equal(mistakeEvals.find((e) => e.id === "tanjiro")!.grade, "D");
  assert.equal(mistakeEvals.find((e) => e.id === "giyu")!.grade, "D");
});
