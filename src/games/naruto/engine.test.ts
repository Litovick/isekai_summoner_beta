import test from "node:test";
import assert from "node:assert/strict";
import { CHARACTERS, CHARACTER_IDS } from "./data/characters";
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
  state = advanceEpisodeOrResult(state);

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
  assert.deepEqual(s.stats, { ninjutsu: 50, bond: 50, willOfFire: 50 });
  assert.equal(clampStat(-10), 0);
  assert.equal(clampStat(120), 100);
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

test("all 6 characters appear across the 7 episodes and every episode has Best + Tradeoff + Mistake choices", () => {
  assert.equal(EPISODES.length, 7);
  assert.equal(Object.keys(CHARACTERS).length, 6);
  assert.equal(CHARACTER_IDS.length, 6);

  const appeared = new Set<CharacterId>();
  const bestIndices = new Set<number>();
  for (const ep of EPISODES) {
    assert.equal(ep.choices.length, 3);
    let bestCount = 0;
    let tradeoffCount = 0;
    let mistakeCount = 0;

    ep.choices.forEach((ch, idx) => {
      const vals = [ch.effects.ninjutsu, ch.effects.bond, ch.effects.willOfFire];
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
  for (const id of CHARACTER_IDS) {
    assert.equal(appeared.has(id), true, `Missing character appearance: ${id}`);
  }
});

test("ending priority order resolves strictly (75+ / 65&65 / 70&<45 / Sad fallback)", () => {
  assert.equal(
    resolveEnding({ ninjutsu: 75, bond: 75, willOfFire: 75 }).id,
    "ending-01",
  );
  assert.equal(
    resolveEnding({ ninjutsu: 74, bond: 65, willOfFire: 65 }).id,
    "ending-02",
  );
  assert.equal(
    resolveEnding({ ninjutsu: 70, bond: 44, willOfFire: 80 }).id,
    "ending-03",
  );
  assert.equal(
    resolveEnding({ ninjutsu: 40, bond: 38, willOfFire: 35 }).id,
    "ending-04",
  );
  assert.equal(
    resolveEnding({ ninjutsu: 68, bond: 64, willOfFire: 66 }).id,
    "ending-04",
  );
});

test("full 7-episode playthroughs reach all 4 endings and mashing A/B/C never clears Ending 1 or 2", () => {
  // Path 1: All Best -> Ending 01 (True Ending)
  const run1 = simulateRun([2, 0, 1, 2, 1, 0, 2]);
  assert.equal(resolveEnding(run1.stats).id, "ending-01");

  // Path 2: Bond Tradeoffs on EP 3,5,7 + Best on EP 1,2,4,6 -> Ending 02
  const run2 = simulateRun([2, 0, 2, 2, 0, 0, 1]);
  assert.equal(resolveEnding(run2.stats).id, "ending-02");

  // Path 3: Solitary Tradeoffs on EP 1,2,4,6 + Best on EP 3,5,7 -> Ending 03
  const run3 = simulateRun([0, 1, 1, 1, 1, 2, 2]);
  assert.equal(resolveEnding(run3.stats).id, "ending-03");

  // Path 4: All Mistakes -> Sad Ending (Ending 04, avg < 45)
  const run4 = simulateRun([1, 2, 0, 0, 2, 1, 0]);
  assert.equal(resolveEnding(run4.stats).id, "ending-04");
  const avg4 = (run4.stats.ninjutsu + run4.stats.bond + run4.stats.willOfFire) / 3;
  assert.ok(avg4 < 45, `Expected Sad Ending avg < 45, got ${avg4}`);

  // Anti-spam check: blindly picking A, B, or C every episode must NOT clear Ending 1 or 2
  for (const col of [0, 1, 2]) {
    const mashRun = simulateRun(Array(7).fill(col));
    const endingId = resolveEnding(mashRun.stats).id;
    assert.ok(
      endingId === "ending-03" || endingId === "ending-04",
      `Spamming column ${col} should never clear Ending 1/2 (got ${endingId})`,
    );
  }
});

test("character evaluations reflect affinity penalties with C and D grades on poor play", () => {
  const bestRun = simulateRun([2, 0, 1, 2, 1, 0, 2]);
  const bestEvals = evaluateCharacters(bestRun.affinities);
  assert.equal(bestEvals.length, 6);
  assert.equal(bestEvals.find((e) => e.id === "naruto")!.grade, "S");
  assert.equal(bestEvals.find((e) => e.id === "minato")!.grade, "S");

  const mistakeRun = simulateRun([1, 2, 0, 0, 2, 1, 0]);
  const mistakeEvals = evaluateCharacters(mistakeRun.affinities);
  for (const ev of mistakeEvals) {
    assert.ok(ev.grade === "C" || ev.grade === "D", `Expected C/D on mistake run for ${ev.id}, got ${ev.grade}`);
  }
});
