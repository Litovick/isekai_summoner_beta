import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Flame, Play, Save, Sparkles, Users } from "lucide-react";
import { CHARACTERS } from "./data/characters";
import {
  NARUTO_BACKGROUNDS,
  getNarutoStageBackground,
  toNarutoBgUrl,
} from "./data/backgrounds";
import { EPISODES } from "./data/episodes";
import {
  advanceEpisodeOrResult,
  applyChoice,
  createInitialState,
  evaluateCharacters,
  resolveEnding,
} from "./engine";
import { DialogueBox } from "./components/DialogueBox";
import { HudBar } from "./components/HudBar";
import { ResultScreen } from "./components/ResultScreen";
import { SceneStage } from "./components/SceneStage";
import {
  playChakraBurstSound,
  playTone,
  preloadNarutoAudio,
  syncNarutoAudioMute,
} from "./sound";
import {
  getGlobalAudioMuted,
  setGlobalAudioMuted,
  subscribeGlobalAudioMuted,
} from "../../utils/mobileAudio";
import {
  preloadImagesInBackground,
  preloadPriorityImages,
} from "../../utils/imagePreloader";
import type { CharacterId, EndingId, GameState } from "./types";
import "./styles.css";

const SAVE_KEY = "isekai:naruto:v1";
const MUTE_KEY = "isekai:naruto:muted";

function loadSavedState(): GameState {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw) as GameState;
    if (
      parsed &&
      typeof parsed.episodeIndex === "number" &&
      parsed.episodeIndex >= 0 &&
      parsed.episodeIndex < EPISODES.length &&
      Array.isArray(parsed.answers) &&
      parsed.stats &&
      parsed.affinities
    ) {
      return parsed;
    }
  } catch {
    // ignore corrupted save
  }
  return createInitialState();
}

export interface NarutoGameProps {
  onReturnWorldSelect?: () => void;
}

export function NarutoGame({ onReturnWorldSelect }: NarutoGameProps) {
  const [state, setState] = useState<GameState>(() => {
    const loaded = loadSavedState();
    if (
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("autostart") === "1"
    ) {
      return { ...createInitialState(loaded.unlockedEndings), phase: "prologue" };
    }
    return loaded;
  });

  const [muted, setMuted] = useState<boolean>(() => getGlobalAudioMuted());

  const [visibleChars, setVisibleChars] = useState(0);
  const [fxMood, setFxMood] = useState<"neutral" | "good" | "bad">("neutral");
  const [impactTick, setImpactTick] = useState(0);
  const [isImpacting, setIsImpacting] = useState(false);
  const impactTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (impactTimerRef.current !== null) {
        window.clearTimeout(impactTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage quota errors
    }
  }, [state]);

  useEffect(() => {
    preloadNarutoAudio();
    return preloadImagesInBackground([
      ...Object.values(NARUTO_BACKGROUNDS),
      ...Object.values(CHARACTERS).map((c) => c.image),
    ]);
  }, []);

  useEffect(() => {
    const currentEp = EPISODES[state.episodeIndex];
    const nextEp = EPISODES[state.episodeIndex + 1];
    preloadPriorityImages([
      currentEp ? getNarutoStageBackground(currentEp.stageTheme) : undefined,
      ...(currentEp ? currentEp.featuredCast.map((id) => CHARACTERS[id].image) : []),
      nextEp ? getNarutoStageBackground(nextEp.stageTheme) : NARUTO_BACKGROUNDS.endingSunset,
      ...(nextEp ? nextEp.featuredCast.map((id) => CHARACTERS[id].image) : []),
    ]);
  }, [state.episodeIndex, state.phase]);

  useEffect(() => subscribeGlobalAudioMuted(setMuted), []);

  useEffect(() => {
    syncNarutoAudioMute(muted);
    setGlobalAudioMuted(muted);
    try {
      localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
    } catch {
      // ignore
    }
  }, [muted]);

  useEffect(() => {
    document.body.dataset.state =
      state.phase === "title"
        ? "title"
        : state.phase === "result"
        ? "gameover"
        : "playing";
    return () => {
      delete document.body.dataset.state;
    };
  }, [state.phase]);

  const episode = EPISODES[Math.min(state.episodeIndex, EPISODES.length - 1)]!;
  const currentChoice =
    state.chosenIndex !== null ? episode.choices[state.chosenIndex] : undefined;

  const activeLine = useMemo(() => {
    if (state.phase === "story") {
      return episode.lines[Math.min(state.lineIndex, episode.lines.length - 1)];
    }
    if (state.phase === "reaction" && currentChoice) {
      return currentChoice.reactions[
        Math.min(state.lineIndex, currentChoice.reactions.length - 1)
      ];
    }
    return undefined;
  }, [state.phase, state.lineIndex, episode, currentChoice]);

  const activeText = activeLine?.text ?? "";

  useEffect(() => {
    setVisibleChars(0);
    if (!activeText || (state.phase !== "story" && state.phase !== "reaction")) {
      return;
    }
    const timer = window.setInterval(() => {
      setVisibleChars((prev) => {
        if (prev >= activeText.length) {
          window.clearInterval(timer);
          return prev;
        }
        return Math.min(activeText.length, prev + 2);
      });
    }, 22);
    return () => window.clearInterval(timer);
  }, [activeText, state.phase, state.episodeIndex, state.lineIndex]);

  const isTypingComplete = visibleChars >= activeText.length;

  const startNewGame = useCallback(() => {
    playTone("start", muted);
    setFxMood("neutral");
    setState((prev) => ({
      ...createInitialState(prev.unlockedEndings),
      phase: "prologue",
    }));
  }, [muted]);

  const resumeSaved = useCallback(() => {
    playTone("click", muted);
    setState((prev) =>
      prev.phase === "title" ? { ...prev, phase: "story" } : prev,
    );
  }, [muted]);

  const beginMission = useCallback(() => {
    playChakraBurstSound("good", muted, 0);
    setFxMood("neutral");
    setState((prev) => advanceEpisodeOrResult(prev));
  }, [muted]);

  const handleAdvance = useCallback(() => {
    if (state.phase !== "story" && state.phase !== "reaction") return;
    if (!isTypingComplete) {
      playTone("click", muted);
      setVisibleChars(activeText.length);
      return;
    }
    playTone("click", muted);
    setFxMood("neutral");
    setState((prev) => advanceEpisodeOrResult(prev));
  }, [state.phase, isTypingComplete, activeText.length, muted]);

  const handleChoose = useCallback(
    (choiceIndex: number) => {
      if (state.phase !== "choice") return;
      const picked = episode.choices[choiceIndex];
      if (!picked) return;
      const sum =
        picked.effects.ninjutsu +
        picked.effects.bond +
        picked.effects.willOfFire;
      const hasPenalty =
        picked.effects.ninjutsu < 0 ||
        picked.effects.bond < 0 ||
        picked.effects.willOfFire < 0;
      const mood = !hasPenalty && sum >= 18 ? "good" : sum < 0 ? "bad" : "neutral";
      playChakraBurstSound(mood, muted, choiceIndex);
      setFxMood(mood);
      setImpactTick((tick) => tick + 1);
      setIsImpacting(true);
      if (impactTimerRef.current !== null) {
        window.clearTimeout(impactTimerRef.current);
      }
      impactTimerRef.current = window.setTimeout(() => {
        setIsImpacting(false);
        impactTimerRef.current = null;
      }, 620);
      setState((prev) => applyChoice(prev, choiceIndex));
    },
    [state.phase, episode, muted],
  );

  // Keyboard support on Title screen
  useEffect(() => {
    if (state.phase !== "title") return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag === "BUTTON" || tag === "A") return;
        e.preventDefault();
        startNewGame();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [state.phase, startNewGame]);

  const hasSavedProgress =
    state.answers.length > 0 && state.answers.length < EPISODES.length;

  const ending = useMemo(
    () =>
      state.phase === "result"
        ? resolveEnding(state.stats, state.answers)
        : null,
    [state.phase, state.stats, state.answers],
  );

  const evaluations = useMemo(
    () =>
      state.phase === "result" ? evaluateCharacters(state.affinities) : [],
    [state.phase, state.affinities],
  );

  const unlockedList: EndingId[] = state.unlockedEndings;

  const isFinalReactionLine =
    state.phase === "reaction" &&
    state.episodeIndex === EPISODES.length - 1 &&
    currentChoice !== undefined &&
    state.lineIndex + 1 >= currentChoice.reactions.length;

  const titleCast: Array<{ id: CharacterId; slotClass: string }> = [
    { id: "itachi", slotClass: "nr-title-char--far-left" },
    { id: "jiraiya", slotClass: "nr-title-char--far-right" },
    { id: "kakashi", slotClass: "nr-title-char--center" },
    { id: "naruto", slotClass: "nr-title-char--left" },
    { id: "sasuke", slotClass: "nr-title-char--right" },
  ];

  return (
    <main className="nr-game" data-phase={state.phase}>
      <div className="nr-bg-texture" aria-hidden="true" />

      {state.phase === "title" && (
        <section className="nr-title-screen" aria-label="나루토 시작 화면">
          <div className="nr-title-backdrop" aria-hidden="true">
            <div
              className="nr-bg-photo"
              style={{ backgroundImage: toNarutoBgUrl(NARUTO_BACKGROUNDS.titlePrologue) }}
              data-bg-src={NARUTO_BACKGROUNDS.titlePrologue}
            />
            <div className="nr-bg-readability" />
            <div className="nr-title-spiral" />
            <div className="nr-title-leaves" />
            <div className="nr-title-characters">
              {titleCast.map(({ id, slotClass }) => (
                <img
                  key={id}
                  src={CHARACTERS[id].image}
                  alt={CHARACTERS[id].name}
                  decoding="async"
                  className={`nr-title-char ${slotClass}`}
                />
              ))}
            </div>
            <div className="nr-title-scrim" />
          </div>

          <div className="nr-title-panel">
            <div className="nr-title-headband-bar" aria-hidden="true" />
            <div className="nr-title-emblem" aria-hidden="true">
              <span className="nr-konoha-swirl">火</span>
            </div>

            <p className="nr-title-eyebrow">KONOHAGAKURE · TEAM 7 CHRONICLE</p>
            <h1 className="nr-title-main">
              나루토
              <span>나뭇잎 제7반 · 불의 의지</span>
            </h1>
            <p className="nr-title-sub">
              방울 뺏기 시험에서 전설의 3닌자 지라이야와 함께하는 최후의 결전까지 — 일곱 번의 임무로 증명하는 당신의 닌자도
            </p>

            <div className="nr-title-actions">
              <button
                type="button"
                data-start="true"
                onClick={startNewGame}
                className="nr-btn-primary nr-btn-lg"
              >
                <Play size={18} />
                임무 시작하기
              </button>

              {hasSavedProgress && (
                <button
                  type="button"
                  onClick={resumeSaved}
                  className="nr-btn-secondary nr-btn-lg"
                >
                  <Save size={18} />
                  진행 이어하기 (EP {String(state.episodeIndex + 1).padStart(2, "0")})
                </button>
              )}

              {onReturnWorldSelect && (
                <button
                  type="button"
                  onClick={onReturnWorldSelect}
                  className="nr-btn-ghost"
                >
                  <ArrowLeft size={16} />
                  작품 선택으로 돌아가기
                </button>
              )}
            </div>

            <p className="nr-title-hint">
              Enter 또는 Space 키로 시작 · 자동 저장 및 차크라 사운드 지원
            </p>
          </div>
        </section>
      )}

      {state.phase === "prologue" && (
        <section className="nr-prologue-screen" aria-label="프롤로그">
          <div className="nr-prologue-backdrop" aria-hidden="true">
            <div
              className="nr-bg-photo"
              style={{ backgroundImage: toNarutoBgUrl(NARUTO_BACKGROUNDS.titlePrologue) }}
              data-bg-src={NARUTO_BACKGROUNDS.titlePrologue}
            />
            <div className="nr-bg-readability" />
          </div>
          <div className="nr-prologue-card">
            <span className="nr-prologue-kicker">PROLOGUE · 제7반 배정 통지</span>
            <h2>불의 의지를 잇는 새로운 시노비</h2>

            <div className="nr-prologue-story">
              <p>
                닌자 아카데미를 졸업한 당신은 하타케 카카시가 이끄는 나뭇잎 마을{" "}
                <strong>제7반</strong>의 새로운 일원으로 배정되었습니다.
              </p>
              <p>
                우즈마키 나루토, 우치하 사스케, 하루노 사쿠라와 함께 일곱 개의
                긴박한 임무를 돌파하며 마을을 노리는 아카츠키의 그림자에 맞서고,
                전설의 3닌자 지라이야와 함께 나뭇잎의 <strong>불의 의지</strong>를 계승해야 합니다.
              </p>
            </div>

            <div className="nr-prologue-stats">
              <div className="nr-prologue-stat">
                <Sparkles size={20} aria-hidden="true" />
                <div>
                  <strong>인술 숙련도 (초기 50)</strong>
                  <p>차크라 제어, 전투 기술, 임무 수행 능력을 나타냅니다.</p>
                </div>
              </div>
              <div className="nr-prologue-stat">
                <Users size={20} aria-hidden="true" />
                <div>
                  <strong>동료의 유대 (초기 50)</strong>
                  <p>팀워크와 동료를 끝까지 포기하지 않는 마음을 반영합니다.</p>
                </div>
              </div>
              <div className="nr-prologue-stat">
                <Flame size={20} aria-hidden="true" />
                <div>
                  <strong>불의 의지 (초기 50)</strong>
                  <p>마을과 평화를 지키려는 신념과 결단력을 의미합니다.</p>
                </div>
              </div>
            </div>

            <p className="nr-prologue-note">
              각 에피소드의 선택은 3가지 능력치(0~100)뿐만 아니라 주요 닌자 6명의
              개별 평가와 5가지 엔딩(히든 엔딩 포함) 분기에 직접 반영됩니다.
            </p>

            <div className="nr-prologue-actions">
              <button
                type="button"
                onClick={beginMission}
                className="nr-btn-primary nr-btn-lg"
              >
                제1임무 출정하기
                <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={() => setState((p) => ({ ...p, phase: "title" }))}
                className="nr-btn-ghost"
              >
                타이틀로 돌아가기
              </button>
            </div>
          </div>
        </section>
      )}

      {(state.phase === "story" ||
        state.phase === "choice" ||
        state.phase === "reaction") && (
        <div className="nr-play-shell">
          <HudBar
            episodeLabel={`${episode.code} / 07`}
            episodeTitle={episode.title}
            location={episode.location}
            progressRatio={
              (state.episodeIndex + (state.phase === "reaction" ? 1 : 0.4)) /
              EPISODES.length
            }
            stats={state.stats}
            lastDelta={state.phase === "reaction" ? state.lastDelta : null}
            muted={muted}
            onToggleMute={() => setMuted((m) => !m)}
            onGoTitle={() => setState((p) => ({ ...p, phase: "title" }))}
            onRestart={startNewGame}
          />

          <SceneStage
            stageTheme={episode.stageTheme}
            location={episode.location}
            cast={episode.featuredCast}
            activeSpeaker={
              state.phase === "choice"
                ? "narrator"
                : activeLine?.speaker ?? "narrator"
            }
            mood={state.phase === "reaction" ? fxMood : "neutral"}
            isChoicePhase={state.phase === "choice"}
            isImpacting={isImpacting}
            impactTick={impactTick}
          />

          <DialogueBox
            phase={state.phase}
            speaker={activeLine?.speaker ?? "narrator"}
            text={activeText}
            shownLength={visibleChars}
            isComplete={isTypingComplete}
            prompt={episode.prompt}
            choices={episode.choices}
            lastDelta={state.lastDelta}
            isFinalStep={isFinalReactionLine}
            onAdvance={handleAdvance}
            onChoose={handleChoose}
          />
        </div>
      )}

      {state.phase === "result" && ending && (
        <ResultScreen
          ending={ending}
          stats={state.stats}
          evaluations={evaluations}
          unlockedEndings={unlockedList}
          onRestart={startNewGame}
          onReturnWorldSelect={
            onReturnWorldSelect ??
            (() => setState((p) => ({ ...p, phase: "title" })))
          }
        />
      )}
    </main>
  );
}

export default NarutoGame;
