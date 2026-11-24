import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Anchor, ArrowLeft, ArrowRight, Compass, Play, Save, Shield, Swords } from "lucide-react";
import { CHARACTERS } from "./data/characters";
import { ONEPIECE_BACKGROUNDS, toOnePieceBgUrl } from "./data/backgrounds";
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
import { applyImageFallback } from "./components/imageFallback";
import {
  playHakiPulseSound,
  playTone,
  preloadOnePieceAudio,
  syncOnePieceAudioMute,
} from "./sound";
import {
  getGlobalAudioMuted,
  setGlobalAudioMuted,
  subscribeGlobalAudioMuted,
} from "../../utils/mobileAudio";
import type { CharacterId, EndingId, GameState } from "./types";
import "./styles.css";

const SAVE_KEY = "isekai:onepiece:v1";
const MUTE_KEY = "isekai:onepiece:muted";

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

export interface OnePieceGameProps {
  onReturnWorldSelect?: () => void;
}

export function OnePieceGame({ onReturnWorldSelect }: OnePieceGameProps) {
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
    preloadOnePieceAudio();
  }, []);

  useEffect(() => subscribeGlobalAudioMuted(setMuted), []);

  useEffect(() => {
    syncOnePieceAudioMute(muted);
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

  const beginVoyage = useCallback(() => {
    playHakiPulseSound("good", muted, 0);
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
        picked.effects.haki + picked.effects.trust + picked.effects.adventure;
      const hasPenalty =
        picked.effects.haki < 0 ||
        picked.effects.trust < 0 ||
        picked.effects.adventure < 0;
      const mood = !hasPenalty && sum >= 18 ? "good" : sum < 0 ? "bad" : "neutral";
      playHakiPulseSound(mood, muted, choiceIndex);
      setFxMood(mood);
      setImpactTick((tick) => tick + 1);
      setIsImpacting(true);
      if (impactTimerRef.current !== null) {
        window.clearTimeout(impactTimerRef.current);
      }
      impactTimerRef.current = window.setTimeout(() => {
        setIsImpacting(false);
        impactTimerRef.current = null;
      }, 540);
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
    { id: "shanks", slotClass: "op-title-char--far-left" },
    { id: "sanji", slotClass: "op-title-char--far-right" },
    { id: "luffy", slotClass: "op-title-char--center" },
    { id: "zoro", slotClass: "op-title-char--left" },
    { id: "nami", slotClass: "op-title-char--right" },
  ];

  return (
    <main className="op-game" data-phase={state.phase}>
      <div className="op-bg-texture" aria-hidden="true" />

      {state.phase === "title" && (
        <section className="op-title-screen" aria-label="원피스 시작 화면">
          <div className="op-title-backdrop" aria-hidden="true">
            <div
              className="op-bg-photo"
              style={{ backgroundImage: toOnePieceBgUrl(ONEPIECE_BACKGROUNDS.titlePrologue) }}
              data-bg-src={ONEPIECE_BACKGROUNDS.titlePrologue}
            />
            <div className="op-bg-readability" />
            <div className="op-title-sunburst" />
            <div className="op-title-characters">
              {titleCast.map(({ id, slotClass }) => (
                <img
                  key={id}
                  src={CHARACTERS[id].image}
                  alt={CHARACTERS[id].name}
                  className={`op-title-char ${slotClass}`}
                  onError={(e) =>
                    applyImageFallback(e, CHARACTERS[id].fallbackImage)
                  }
                />
              ))}
            </div>
            <div className="op-title-scrim" />
          </div>

          <div className="op-title-panel">
            <div className="op-title-badge-bar" aria-hidden="true" />
            <div className="op-title-emblem" aria-hidden="true">
              <Anchor size={34} className="op-title-anchor" />
            </div>

            <p className="op-title-eyebrow">EAST BLUE TO THE NEW WORLD · GRAND LINE</p>
            <h1 className="op-title-main">
              원피스
              <span>밀짚모자 일당 · 대해적의 항해</span>
            </h1>
            <p className="op-title-sub">
              이스트 블루의 출항부터 불타는 해군 포위선과 신세계의 여명까지 — 일곱 바다의 선택으로 증명하는 당신의 패기와 모험심
            </p>

            <div className="op-title-actions">
              <button
                type="button"
                data-start="true"
                onClick={startNewGame}
                className="op-btn-primary op-btn-lg"
              >
                <Play size={18} />
                위대한 항로 출항하기
              </button>

              {hasSavedProgress && (
                <button
                  type="button"
                  onClick={resumeSaved}
                  className="op-btn-secondary op-btn-lg"
                >
                  <Save size={18} />
                  항해 이어하기 (EP {String(state.episodeIndex + 1).padStart(2, "0")})
                </button>
              )}

              {onReturnWorldSelect && (
                <button
                  type="button"
                  onClick={onReturnWorldSelect}
                  className="op-btn-ghost"
                >
                  <ArrowLeft size={16} />
                  작품 선택으로 돌아가기
                </button>
              )}
            </div>

            <p className="op-title-hint">
              Enter 또는 Space 키로 시작 · 견문색 패기 효과음 및 자동 저장 지원
            </p>
          </div>
        </section>
      )}

      {state.phase === "prologue" && (
        <section className="op-prologue-screen" aria-label="프롤로그">
          <div className="op-prologue-backdrop" aria-hidden="true">
            <div
              className="op-bg-photo"
              style={{ backgroundImage: toOnePieceBgUrl(ONEPIECE_BACKGROUNDS.titlePrologue) }}
              data-bg-src={ONEPIECE_BACKGROUNDS.titlePrologue}
            />
            <div className="op-bg-readability" />
          </div>
          <div className="op-prologue-card">
            <span className="op-prologue-kicker">PROLOGUE · 대해적 시대의 막이 오른다</span>
            <h2>황금빛 나침반과 밀짚모자 깃발 아래</h2>

            <div className="op-prologue-story">
              <p>
                이스트 블루의 작은 항구에서 시작된 꿈은 이제 <strong>위대한 항로</strong>를
                향합니다. 당신은 루피, 조로, 나미, 상디, 쵸파, 그리고 사황 샹크스가
                주목하는 새로운 항해의 동료로 배에 올랐습니다.
              </p>
              <p>
                눈보라 치는 드럼 왕국과 타오르는 알라바스타 사막, 1만 미터 상공의
                하늘섬과 불타는 해군 포위선 돌파까지—일곱 바다의 기로에서{" "}
                <strong>진정한 해적왕의 동료</strong>가 될 자격을 증명해야 합니다.
              </p>
            </div>

            <div className="op-prologue-stats">
              <div className="op-prologue-stat">
                <Swords size={20} aria-hidden="true" />
                <div>
                  <strong>패기와 전투력 (초기 50)</strong>
                  <p>견문색·무장색 패기와 적진을 뚫는 실전 결단력을 나타냅니다.</p>
                </div>
              </div>
              <div className="op-prologue-stat">
                <Shield size={20} aria-hidden="true" />
                <div>
                  <strong>동료의 신뢰 (초기 50)</strong>
                  <p>선원들과의 호흡, 의리, 위기 속에서 서로를 지키는 유대입니다.</p>
                </div>
              </div>
              <div className="op-prologue-stat">
                <Compass size={20} aria-hidden="true" />
                <div>
                  <strong>항해와 모험심 (초기 50)</strong>
                  <p>미지의 섬과 폭풍 앞에서도 꺾이지 않는 낭만과 항해 지혜입니다.</p>
                </div>
              </div>
            </div>

            <p className="op-prologue-note">
              각 선택지의 결과는 능력치(0~100)뿐만 아니라 주요 6명의 개별 호감도
              평가(S~D등급)와 5가지 엔딩(히든 엔딩 포함) 분기에 즉시 반영됩니다.
            </p>

            <div className="op-prologue-actions">
              <button
                type="button"
                onClick={beginVoyage}
                className="op-btn-primary op-btn-lg"
              >
                이스트 블루 출항하기
                <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={() => setState((p) => ({ ...p, phase: "title" }))}
                className="op-btn-ghost"
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
        <div className="op-play-shell">
          <HudBar
            episodeLabel={`${episode.code} / 07`}
            episodeTitle={episode.title}
            location={episode.location}
            progressRatio={
              (state.episodeIndex +
                (state.phase === "choice" ? 0.65 : state.phase === "reaction" ? 0.9 : 0.25)) /
              EPISODES.length
            }
            stats={state.stats}
            lastDelta={state.lastDelta}
            muted={muted}
            onToggleMute={() => setMuted((m) => !m)}
            onGoTitle={() => setState((p) => ({ ...p, phase: "title" }))}
            onRestart={startNewGame}
          />

          <SceneStage
            stageTheme={episode.stageTheme}
            location={episode.location}
            cast={episode.featuredCast}
            activeSpeaker={activeLine?.speaker ?? "narrator"}
            mood={fxMood}
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
          onReturnWorldSelect={() => {
            if (onReturnWorldSelect) onReturnWorldSelect();
            else setState((p) => ({ ...p, phase: "title" }));
          }}
        />
      )}
    </main>
  );
}
