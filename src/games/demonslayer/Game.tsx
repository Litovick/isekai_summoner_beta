import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Flame, Play, Save, Shield, Sword } from "lucide-react";
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
import { playChoiceImpactSound, playTone } from "./sound";
import type { EndingId, GameState } from "./types";
import "./styles.css";

const SAVE_KEY = "isekai:demonslayer:v1";
const MUTE_KEY = "isekai:demonslayer:muted";

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

export interface DemonSlayerGameProps {
  onReturnWorldSelect?: () => void;
}

export function DemonSlayerGame({ onReturnWorldSelect }: DemonSlayerGameProps) {
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

  const [muted, setMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(MUTE_KEY) === "1";
    } catch {
      return false;
    }
  });

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
    playTone("slash", muted);
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
    playTone("slash", muted);
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
        picked.effects.breathing + picked.effects.trust + picked.effects.resolve;
      const mood = sum >= 10 ? "good" : picked.effects.trust < 0 ? "bad" : "neutral";
      playChoiceImpactSound(mood, muted);
      setFxMood(mood);
      setImpactTick((tick) => tick + 1);
      setIsImpacting(true);
      if (impactTimerRef.current !== null) {
        window.clearTimeout(impactTimerRef.current);
      }
      impactTimerRef.current = window.setTimeout(() => {
        setIsImpacting(false);
        impactTimerRef.current = null;
      }, 450);
      setState((prev) => applyChoice(prev, choiceIndex));
    },
    [state.phase, episode, muted],
  );

  // Keyboard support for Title screen Enter/Space start
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
    () => (state.phase === "result" ? resolveEnding(state.stats) : null),
    [state.phase, state.stats],
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

  return (
    <main className="ds-game" data-phase={state.phase}>
      <div className="ds-bg-texture" aria-hidden="true" />

      {state.phase === "title" && (
        <section className="ds-title-screen" aria-label="귀멸의 칼날 시작 화면">
          <div className="ds-title-panel">
            <div className="ds-title-crest" aria-hidden="true">
              <svg viewBox="0 0 120 120" className="ds-crest-svg">
                <defs>
                  <linearGradient id="dsBladeGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f5efe6" />
                    <stop offset="50%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#991b1b" />
                  </linearGradient>
                </defs>
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#6b21a8"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="42"
                  fill="rgba(107, 33, 168, 0.14)"
                  stroke="#d4af37"
                  strokeWidth="1.5"
                />
                {/* Nichirin blade & tsuba */}
                <path
                  d="M60 12 L65 70 L60 76 L55 70 Z"
                  fill="url(#dsBladeGrad)"
                />
                <ellipse
                  cx="60"
                  cy="76"
                  rx="16"
                  ry="5"
                  fill="#0f0f13"
                  stroke="#d4af37"
                  strokeWidth="2"
                />
                <rect
                  x="57"
                  y="80"
                  width="6"
                  height="24"
                  rx="2"
                  fill="#991b1b"
                  stroke="#d4af37"
                  strokeWidth="1"
                />
              </svg>
            </div>

            <p className="ds-title-eyebrow">TAISHO ERA · DEMON SLAYER CORPS</p>
            <h1 className="ds-title-main">
              귀멸의 칼날
              <span>악귀멸살(惡鬼滅殺)</span>
            </h1>
            <p className="ds-title-sub">
              등나무 산을 넘어 무한성까지 — 여덟 번의 사투로 증명하는 당신의 호흡
            </p>

            <div className="ds-title-actions">
              <button
                type="button"
                data-start="true"
                onClick={startNewGame}
                className="ds-btn-primary ds-btn-lg"
              >
                <Play size={18} />
                새 임무 시작
              </button>

              {hasSavedProgress && (
                <button
                  type="button"
                  onClick={resumeSaved}
                  className="ds-btn-secondary ds-btn-lg"
                >
                  <Save size={18} />
                  진행 이어하기 (EP {String(state.episodeIndex + 1).padStart(2, "0")})
                </button>
              )}

              {onReturnWorldSelect && (
                <button
                  type="button"
                  onClick={onReturnWorldSelect}
                  className="ds-btn-ghost"
                >
                  <ArrowLeft size={16} />
                  작품 선택으로 돌아가기
                </button>
              )}
            </div>

            <p className="ds-title-hint">
              Enter 또는 Space 키로 임무 시작 · 자동 저장 지원
            </p>
          </div>
        </section>
      )}

      {state.phase === "prologue" && (
        <section className="ds-prologue-screen" aria-label="프롤로그">
          <div className="ds-prologue-card">
            <span className="ds-prologue-kicker">PROLOGUE · 귀살대 입대 서약</span>
            <h2>어둠을 베는 새로운 일륜도</h2>

            <div className="ds-prologue-story">
              <p>
                혈귀가 밤을 지배하는 다이쇼 시대. 등나무 산의 혹독한 <strong>최종 선별</strong>을
                통과한 당신은 귀살대의 정식 대원으로 첫걸음을 내디뎠습니다.
              </p>
              <p>
                카마도 탄지로 일행, 그리고 귀살대를 지탱하는 9명의 <strong>주(柱)</strong>들과 함께
                8개의 전장을 돌파하며 혈귀의 왕 키부츠지 무잔의 위협에 맞서야 합니다.
              </p>
            </div>

            <div className="ds-prologue-stats">
              <div className="ds-prologue-stat">
                <Sword size={20} aria-hidden="true" />
                <div>
                  <strong>전집중 호흡 (초기 50)</strong>
                  <p>수련과 전투 기술, 냉철한 상황 판단력을 나타냅니다.</p>
                </div>
              </div>
              <div className="ds-prologue-stat">
                <Shield size={20} aria-hidden="true" />
                <div>
                  <strong>귀살대 신뢰도 (초기 50)</strong>
                  <p>동료 및 주(柱)들과의 유대와 협력도를 반영합니다.</p>
                </div>
              </div>
              <div className="ds-prologue-stat">
                <Flame size={20} aria-hidden="true" />
                <div>
                  <strong>불굴의 결의 (초기 50)</strong>
                  <p>인간을 지키려는 신념과 희생정신을 의미합니다.</p>
                </div>
              </div>
            </div>

            <p className="ds-prologue-note">
              각 에피소드의 선택은 3가지 능력치(0~100)뿐만 아니라 귀살대 13명의 개별 평가와
              최종 4가지 엔딩 분기에 직접적인 영향을 미칩니다.
            </p>

            <div className="ds-prologue-actions">
              <button
                type="button"
                onClick={beginMission}
                className="ds-btn-primary ds-btn-lg"
              >
                첫 번째 임무로 출정
                <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={() => setState((p) => ({ ...p, phase: "title" }))}
                className="ds-btn-ghost"
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
        <div className="ds-play-shell">
          <HudBar
            episodeLabel={`${episode.code} / 08`}
            episodeTitle={episode.title}
            location={episode.location}
            progressRatio={(state.episodeIndex + (state.phase === "reaction" ? 1 : 0.4)) / EPISODES.length}
            stats={state.stats}
            lastDelta={state.phase === "reaction" ? state.lastDelta : null}
            muted={muted}
            onToggleMute={() => setMuted((m) => !m)}
            onGoTitle={() => setState((p) => ({ ...p, phase: "title" }))}
            onRestart={startNewGame}
          />

          <SceneStage
            background={episode.background}
            location={episode.location}
            sceneDescription={episode.sceneDescription}
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

export default DemonSlayerGame;
