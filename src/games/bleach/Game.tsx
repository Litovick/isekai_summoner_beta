import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Flame, Play, Save, Shield, Swords } from "lucide-react";
import { CHARACTERS } from "./data/characters";
import { BLEACH_BACKGROUNDS, toBleachBgUrl } from "./data/backgrounds";
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
  playTone,
  playZanpakutoSlashSound,
  preloadBleachAudio,
  syncBleachAudioMute,
} from "./sound";
import {
  getGlobalAudioMuted,
  setGlobalAudioMuted,
  subscribeGlobalAudioMuted,
} from "../../utils/mobileAudio";
import type { CharacterId, EndingId, GameState } from "./types";
import "./styles.css";

const SAVE_KEY = "isekai:bleach:v1";
const MUTE_KEY = "isekai:bleach:muted";

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

export interface BleachGameProps {
  onReturnWorldSelect?: () => void;
}

export function BleachGame({ onReturnWorldSelect }: BleachGameProps) {
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
    preloadBleachAudio();
  }, []);

  useEffect(() => subscribeGlobalAudioMuted(setMuted), []);

  useEffect(() => {
    syncBleachAudioMute(muted);
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
    playZanpakutoSlashSound("good", muted, 0);
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
        picked.effects.reiatsu + picked.effects.bond + picked.effects.resolve;
      const hasPenalty =
        picked.effects.reiatsu < 0 ||
        picked.effects.bond < 0 ||
        picked.effects.resolve < 0;
      const mood = !hasPenalty && sum >= 18 ? "good" : sum < 0 ? "bad" : "neutral";
      playZanpakutoSlashSound(mood, muted, choiceIndex);
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
    { id: "urahara", slotClass: "bl-title-char--far-left" },
    { id: "ishida", slotClass: "bl-title-char--far-right" },
    { id: "ichigo", slotClass: "bl-title-char--center" },
    { id: "rukia", slotClass: "bl-title-char--left" },
    { id: "orihime", slotClass: "bl-title-char--right" },
  ];

  return (
    <main className="bl-game" data-phase={state.phase}>
      <div className="bl-bg-texture" aria-hidden="true" />

      {state.phase === "title" && (
        <section className="bl-title-screen" aria-label="블리치 시작 화면">
          <div className="bl-title-backdrop" aria-hidden="true">
            <div
              className="bl-bg-photo"
              style={{ backgroundImage: toBleachBgUrl(BLEACH_BACKGROUNDS.titlePrologue) }}
              data-bg-src={BLEACH_BACKGROUNDS.titlePrologue}
            />
            <div className="bl-bg-readability" />
            <div className="bl-title-slash-grid" />
            <div className="bl-title-reiatsu" />
            <div className="bl-title-characters">
              {titleCast.map(({ id, slotClass }) => (
                <img
                  key={id}
                  src={CHARACTERS[id].image}
                  alt={CHARACTERS[id].name}
                  className={`bl-title-char ${slotClass}`}
                />
              ))}
            </div>
            <div className="bl-title-scrim" />
          </div>

          <div className="bl-title-panel">
            <div className="bl-title-badge-bar" aria-hidden="true" />
            <div className="bl-title-emblem" aria-hidden="true">
              <span className="bl-shinigami-skull">卍</span>
            </div>

            <p className="bl-title-eyebrow">KARAKURA · SUBSTITUTE SHINIGAMI</p>
            <h1 className="bl-title-main">
              블리치
              <span>사신 대행 · 월아의 검</span>
            </h1>
            <p className="bl-title-sub">
              카라쿠라 마을의 밤부터 정령정과 웨코문드까지 — 일곱 번의 사투로 증명하는 당신의 영압
            </p>

            <div className="bl-title-actions">
              <button
                type="button"
                data-start="true"
                onClick={startNewGame}
                className="bl-btn-primary bl-btn-lg"
              >
                <Play size={18} />
                사신 대행 출동
              </button>

              {hasSavedProgress && (
                <button
                  type="button"
                  onClick={resumeSaved}
                  className="bl-btn-secondary bl-btn-lg"
                >
                  <Save size={18} />
                  진행 이어하기 (EP {String(state.episodeIndex + 1).padStart(2, "0")})
                </button>
              )}

              {onReturnWorldSelect && (
                <button
                  type="button"
                  onClick={onReturnWorldSelect}
                  className="bl-btn-ghost"
                >
                  <ArrowLeft size={16} />
                  작품 선택으로 돌아가기
                </button>
              )}
            </div>

            <p className="bl-title-hint">
              Enter 또는 Space 키로 시작 · 참백도 참격 효과음 및 자동 저장 지원
            </p>
          </div>
        </section>
      )}

      {state.phase === "prologue" && (
        <section className="bl-prologue-screen" aria-label="프롤로그">
          <div className="bl-prologue-backdrop" aria-hidden="true">
            <div
              className="bl-bg-photo"
              style={{ backgroundImage: toBleachBgUrl(BLEACH_BACKGROUNDS.titlePrologue) }}
              data-bg-src={BLEACH_BACKGROUNDS.titlePrologue}
            />
            <div className="bl-bg-readability" />
          </div>
          <div className="bl-prologue-card">
            <span className="bl-prologue-kicker">PROLOGUE · 사신 대행증 수여</span>
            <h2>어둠을 베어 가르는 새로운 참백도</h2>

            <div className="bl-prologue-story">
              <p>
                영력이 남달랐던 당신은 카라쿠라 마을의 밤, 호로의 습격 속에서 사신의
                힘을 각성해 <strong>사신 대행</strong> 동료로 합류했습니다.
              </p>
              <p>
                쿠로사키 이치고, 쿠치키 루키아, 이시다 우류, 오리히메, 사도, 우라하라,
                콘과 함께 일곱 개의 전장을 돌파하며 <strong>소울 소사이어티</strong>와{" "}
                <strong>웨코문드</strong>의 위협에 맞서야 합니다.
              </p>
            </div>

            <div className="bl-prologue-stats">
              <div className="bl-prologue-stat">
                <Swords size={20} aria-hidden="true" />
                <div>
                  <strong>영압 제어 (초기 50)</strong>
                  <p>참백도 운용, 전투 기술, 냉철한 전황 판단을 나타냅니다.</p>
                </div>
              </div>
              <div className="bl-prologue-stat">
                <Shield size={20} aria-hidden="true" />
                <div>
                  <strong>동료의 유대 (초기 50)</strong>
                  <p>신뢰, 협력, 동료를 끝까지 지켜 내려는 마음을 반영합니다.</p>
                </div>
              </div>
              <div className="bl-prologue-stat">
                <Flame size={20} aria-hidden="true" />
                <div>
                  <strong>수호의 각오 (초기 50)</strong>
                  <p>절망에 굴하지 않는 신념과 결단력을 의미합니다.</p>
                </div>
              </div>
            </div>

            <p className="bl-prologue-note">
              각 선택지의 결과는 능력치(0~100)뿐만 아니라 주요 7명의 개별 호감도
              평가(S~D등급)와 5가지 엔딩(히든 엔딩 포함) 분기에 즉시 반영됩니다.
            </p>

            <div className="bl-prologue-actions">
              <button
                type="button"
                onClick={beginMission}
                className="bl-btn-primary bl-btn-lg"
              >
                제1전장 출정하기
                <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={() => setState((p) => ({ ...p, phase: "title" }))}
                className="bl-btn-ghost"
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
        <div className="bl-play-shell">
          <HudBar
            episodeLabel={`${episode.code} / 07`}
            episodeTitle={episode.title}
            location={episode.location}
            progressRatio={
              (state.episodeIndex + (state.phase === "choice" ? 0.65 : state.phase === "reaction" ? 0.9 : 0.25)) /
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
            phase={state.phase}
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
