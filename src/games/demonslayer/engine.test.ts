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

test("all 14 characters appear across the 8 episodes and 13 corps members are evaluated", () => {
  assert.equal(EPISODES.length, 8);
  assert.equal(Object.keys(CHARACTERS).length, 14);
  assert.equal(CORPS_CHARACTER_IDS.length, 13);

  const appeared = new Set<CharacterId>();
  for (const ep of EPISODES) {
    assert.equal(ep.choices.length, 3);
    for (const c of ep.featuredCast) appeared.add(c);
    for (const l of ep.lines) {
      if (l.speaker !== "narrator") appeared.add(l.speaker);
    }
    for (const ch of ep.choices) {
      for (const r of ch.reactions) {
        if (r.speaker !== "narrator") appeared.add(r.speaker);
      }
    }
  }
  for (const id of Object.keys(CHARACTERS) as CharacterId[]) {
    assert.equal(appeared.has(id), true, `Missing character appearance: ${id}`);
  }
});

test("ending priority order resolves strictly", () => {
  // Priority 1 overrides 2 & 3
  assert.equal(
    resolveEnding({ breathing: 80, trust: 80, resolve: 80 }).id,
    "ending-01",
  );
  // Priority 2 when not all >= 80
  assert.equal(
    resolveEnding({ breathing: 79, trust: 75, resolve: 70 }).id,
    "ending-02",
  );
  // Priority 3 when breathing >= 80 and trust < 50
  assert.equal(
    resolveEnding({ breathing: 80, trust: 49, resolve: 90 }).id,
    "ending-03",
  );
  // Priority 4 default fallback
  assert.equal(
    resolveEnding({ breathing: 79, trust: 74, resolve: 75 }).id,
    "ending-04",
  );
  assert.equal(
    resolveEnding({ breathing: 85, trust: 60, resolve: 65 }).id,
    "ending-04",
  );
});

test("full 8-episode playthroughs can reach every ending (01, 02, 03, 04)", () => {
  // Path 1: Balanced Hashira Mastery -> Ending 01
  const run1 = simulateRun([2, 0, 2, 0, 2, 1, 0, 0]);
  assert.equal(resolveEnding(run1.stats).id, "ending-01");

  // Path 2: Compassionate Bonds -> Ending 02
  const run2 = simulateRun([0, 1, 0, 1, 1, 1, 2, 1]);
  assert.equal(resolveEnding(run2.stats).id, "ending-02");

  // Path 3: Cold Lone Wolf -> Ending 03
  const run3 = simulateRun([1, 2, 1, 2, 0, 2, 1, 2]);
  assert.equal(resolveEnding(run3.stats).id, "ending-03");

  // Path 4: Mixed / Hesitant -> Ending 04
  const run4 = simulateRun([1, 0, 1, 1, 0, 2, 2, 1]);
  assert.equal(resolveEnding(run4.stats).id, "ending-04");
});

test("character evaluations produce 13 distinct cards with differentiated scores", () => {
  const bondRun = simulateRun([0, 1, 0, 1, 1, 1, 2, 1]);
  const bondEvals = evaluateCharacters(bondRun.affinities);
  assert.equal(bondEvals.length, 13);

  const tanjiroBond = bondEvals.find((e) => e.id === "tanjiro")!;
  const nezukoBond = bondEvals.find((e) => e.id === "nezuko")!;
  assert.ok(tanjiroBond.score >= 75 && tanjiroBond.grade === "S");
  assert.ok(nezukoBond.score >= 75 && nezukoBond.grade === "S");

  const coldRun = simulateRun([1, 2, 1, 2, 0, 2, 1, 2]);
  const coldEvals = evaluateCharacters(coldRun.affinities);
  const tanjiroCold = coldEvals.find((e) => e.id === "tanjiro")!;
  assert.ok(tanjiroCold.score < 45);
});
