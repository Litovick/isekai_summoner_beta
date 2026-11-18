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

test("all 6 characters appear across the 7 episodes and are evaluated", () => {
  assert.equal(EPISODES.length, 7);
  assert.equal(Object.keys(CHARACTERS).length, 6);
  assert.equal(CHARACTER_IDS.length, 6);

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
  for (const id of CHARACTER_IDS) {
    assert.equal(appeared.has(id), true, `Missing character appearance: ${id}`);
  }
});

test("ending priority order resolves strictly", () => {
  assert.equal(
    resolveEnding({ ninjutsu: 80, bond: 80, willOfFire: 80 }).id,
    "ending-01",
  );
  assert.equal(
    resolveEnding({ ninjutsu: 79, bond: 75, willOfFire: 70 }).id,
    "ending-02",
  );
  assert.equal(
    resolveEnding({ ninjutsu: 80, bond: 49, willOfFire: 90 }).id,
    "ending-03",
  );
  assert.equal(
    resolveEnding({ ninjutsu: 79, bond: 74, willOfFire: 75 }).id,
    "ending-04",
  );
  assert.equal(
    resolveEnding({ ninjutsu: 85, bond: 60, willOfFire: 65 }).id,
    "ending-04",
  );
});

test("full 7-episode playthroughs can reach every ending (01, 02, 03, 04)", () => {
  // Path 1: Hokage mastery & unity -> Ending 01
  const run1 = simulateRun([0, 1, 2, 0, 2, 0, 2]);
  assert.equal(resolveEnding(run1.stats).id, "ending-01");

  // Path 2: Team 7 pure bond & protection -> Ending 02
  const run2 = simulateRun([2, 0, 1, 2, 1, 2, 0]);
  assert.equal(resolveEnding(run2.stats).id, "ending-02");

  // Path 3: Cold solitary ninja -> Ending 03
  const run3 = simulateRun([1, 2, 0, 1, 0, 1, 1]);
  assert.equal(resolveEnding(run3.stats).id, "ending-03");

  // Path 4: Mixed -> Ending 04
  const run4 = simulateRun([1, 2, 2, 2, 0, 2, 0]);
  assert.equal(resolveEnding(run4.stats).id, "ending-04");
});

test("character evaluations produce 6 distinct cards with differentiated scores", () => {
  const hokageRun = simulateRun([0, 1, 2, 0, 2, 0, 2]);
  const hokageEvals = evaluateCharacters(hokageRun.affinities);
  assert.equal(hokageEvals.length, 6);
  const narutoHokage = hokageEvals.find((e) => e.id === "naruto")!;
  const minatoHokage = hokageEvals.find((e) => e.id === "minato")!;
  assert.ok(narutoHokage.score >= 75 && narutoHokage.grade === "S");
  assert.ok(minatoHokage.score >= 75 && minatoHokage.grade === "S");

  const coldRun = simulateRun([1, 2, 0, 1, 0, 1, 1]);
  const coldEvals = evaluateCharacters(coldRun.affinities);
  const narutoCold = coldEvals.find((e) => e.id === "naruto")!;
  const itachiCold = coldEvals.find((e) => e.id === "itachi")!;
  assert.ok(narutoCold.score < 45);
  assert.ok(itachiCold.score >= 75 && itachiCold.grade === "S");
});
