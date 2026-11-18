import {
  CHARACTERS,
  CHARACTER_EVALUATION_PROFILES,
  CHARACTER_IDS,
} from "./data/characters";
import { ENDINGS } from "./data/endings";
import { EPISODES } from "./data/episodes";
import type {
  Affinities,
  CharacterEvaluation,
  CharacterId,
  EndingId,
  EndingInfo,
  GameState,
  Grade,
  Stats,
} from "./types";

export const INITIAL_STAT_VALUE = 50;
export const MIN_STAT_VALUE = 0;
export const MAX_STAT_VALUE = 100;

export function clampStat(value: number): number {
  return Math.max(MIN_STAT_VALUE, Math.min(MAX_STAT_VALUE, Math.round(value)));
}

export function createInitialStats(): Stats {
  return {
    haki: INITIAL_STAT_VALUE,
    trust: INITIAL_STAT_VALUE,
    adventure: INITIAL_STAT_VALUE,
  };
}

export function createInitialAffinities(): Affinities {
  return CHARACTER_IDS.reduce((acc, id) => {
    acc[id] = INITIAL_STAT_VALUE;
    return acc;
  }, {} as Affinities);
}

export function createInitialState(unlockedEndings: EndingId[] = []): GameState {
  return {
    phase: "title",
    episodeIndex: 0,
    lineIndex: 0,
    stats: createInitialStats(),
    lastDelta: null,
    chosenIndex: null,
    answers: [],
    affinities: createInitialAffinities(),
    unlockedEndings,
  };
}

export function gradeForScore(score: number): Grade {
  const s = clampStat(score);
  if (s >= 75) return "S";
  if (s >= 60) return "A";
  if (s >= 45) return "B";
  if (s >= 30) return "C";
  return "D";
}

export function resolveEnding(stats: Stats): EndingInfo {
  const { haki, trust, adventure } = stats;
  // Priority 1: All 3 stats >= 75
  if (haki >= 75 && trust >= 75 && adventure >= 75) {
    return ENDINGS["ending-01"];
  }
  // Priority 2: trust >= 65 && adventure >= 65
  if (trust >= 65 && adventure >= 65) {
    return ENDINGS["ending-02"];
  }
  // Priority 3: haki >= 70 && trust < 45
  if (haki >= 70 && trust < 45) {
    return ENDINGS["ending-03"];
  }
  // Priority 4: Sad Ending (average < 45 or no prior condition met)
  return ENDINGS["ending-04"];
}

export function applyChoice(state: GameState, choiceIndex: number): GameState {
  if (state.phase !== "choice") return state;
  const episode = EPISODES[state.episodeIndex];
  const choice = episode?.choices[choiceIndex];
  if (!episode || !choice) return state;

  const nextStats: Stats = {
    haki: clampStat(state.stats.haki + choice.effects.haki),
    trust: clampStat(state.stats.trust + choice.effects.trust),
    adventure: clampStat(state.stats.adventure + choice.effects.adventure),
  };

  const nextAffinities: Affinities = { ...state.affinities };
  for (const id of CHARACTER_IDS) {
    const delta = choice.affinityEffects[id] ?? 0;
    nextAffinities[id] = clampStat((nextAffinities[id] ?? INITIAL_STAT_VALUE) + delta);
  }

  return {
    ...state,
    phase: "reaction",
    lineIndex: 0,
    stats: nextStats,
    lastDelta: { ...choice.effects },
    chosenIndex: choiceIndex,
    answers: [...state.answers, choiceIndex],
    affinities: nextAffinities,
  };
}

export function advanceEpisodeOrResult(state: GameState): GameState {
  if (state.phase === "prologue") {
    return {
      ...state,
      phase: "story",
      episodeIndex: 0,
      lineIndex: 0,
      lastDelta: null,
      chosenIndex: null,
    };
  }

  if (state.phase === "story") {
    const episode = EPISODES[state.episodeIndex];
    if (!episode) return state;
    if (state.lineIndex + 1 < episode.lines.length) {
      return { ...state, lineIndex: state.lineIndex + 1 };
    }
    return { ...state, phase: "choice", lineIndex: 0 };
  }

  if (state.phase === "reaction") {
    const episode = EPISODES[state.episodeIndex];
    const choice =
      state.chosenIndex !== null ? episode?.choices[state.chosenIndex] : undefined;
    if (choice && state.lineIndex + 1 < choice.reactions.length) {
      return { ...state, lineIndex: state.lineIndex + 1 };
    }

    if (state.episodeIndex + 1 >= EPISODES.length) {
      const ending = resolveEnding(state.stats);
      const unlocked = state.unlockedEndings.includes(ending.id)
        ? state.unlockedEndings
        : [...state.unlockedEndings, ending.id];
      return {
        ...state,
        phase: "result",
        lineIndex: 0,
        unlockedEndings: unlocked,
      };
    }

    return {
      ...state,
      phase: "story",
      episodeIndex: state.episodeIndex + 1,
      lineIndex: 0,
      lastDelta: null,
      chosenIndex: null,
    };
  }

  return state;
}

export function evaluateCharacters(affinities: Affinities): CharacterEvaluation[] {
  return CHARACTER_IDS.map((id: CharacterId) => {
    const meta = CHARACTERS[id];
    const profile = CHARACTER_EVALUATION_PROFILES[id];
    const score = clampStat(affinities[id] ?? INITIAL_STAT_VALUE);
    const grade = gradeForScore(score);
    return {
      id,
      name: meta.name,
      title: meta.title,
      specialty: meta.specialty,
      image: meta.image,
      fallbackImage: meta.fallbackImage,
      accentColor: meta.accentColor,
      score,
      grade,
      focus: profile.focus,
      comment: profile.comments[grade],
    };
  });
}
