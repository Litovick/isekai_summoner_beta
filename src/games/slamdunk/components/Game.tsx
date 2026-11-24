import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  ChevronRight,
  Flame,
  Home,
  Play,
  RotateCcw,
  Save,
  Shield,
  Trophy,
  Volume2,
  VolumeX,
} from "lucide-react";
import { characterReviews, readCollection, unlockEnding, type EndingCollection } from "../game/collection";
import { advance, choose, newGame, resolveEnding, type GameState } from "../game/engine";
import type { Line, Theme } from "../game/types";
import { CharacterReviewImage, EndingPortraitImg, SceneStage } from "./Scene";
import { beep, playBasketballSfx, useTypewriter } from "./useTypewriter";
import { EndingShareAndReward } from "../../../components/EndingShareAndReward";
import {
  getGlobalAudioMuted,
  setGlobalAudioMuted,
  subscribeGlobalAudioMuted,
} from "../../../utils/mobileAudio";
import {
  preloadImagesInBackground,
  preloadPriorityImages,
} from "../../../utils/imagePreloader";

type Saved = GameState & { step: number };

const STAT_META = {
  trust: { icon: Shield, fillClass: "sd-stat-fill--trust" },
  judgment: { icon: Brain, fillClass: "sd-stat-fill--judgment" },
} as const;

export function Game({ theme }: { theme: Theme }) {
  const key = `game:${theme.id}`;
  const [s, setS] = useState<Saved>({ ...newGame(theme), step: 0 });
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState<boolean>(() => getGlobalAudioMuted());
  const [fx, setFx] = useState<"good" | "bad" | null>(null);
  const [collection, setCollection] = useState<EndingCollection>({});
  const [showCollection, setShowCollection] = useState(false);
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
      const raw = localStorage.getItem(key);
      if (raw) setS(JSON.parse(raw));
      setMuted(getGlobalAudioMuted());
      setCollection(readCollection(theme.id));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, [key, theme.id]);

  useEffect(() => subscribeGlobalAudioMuted(setMuted), []);
  useEffect(() => {
    if (loaded) localStorage.setItem(key, JSON.stringify(s));
  }, [s, loaded, key]);
  useEffect(() => {
    if (loaded) setGlobalAudioMuted(muted);
  }, [muted, loaded]);

  useEffect(() => {
    return preloadImagesInBackground([
      ...Object.values(theme.backgrounds).map((b) => b.image),
      ...Object.values(theme.characters).map((c) => c.image),
    ]);
  }, [theme]);

  useEffect(() => {
    const currentQ = theme.questions[s.qIndex];
    const nextQ = theme.questions[s.qIndex + 1];
    preloadPriorityImages([
      currentQ ? theme.backgrounds[currentQ.background]?.image : undefined,
      ...(currentQ ? currentQ.cast.map((id) => theme.characters[id]?.image) : []),
      nextQ
        ? theme.backgrounds[nextQ.background]?.image
        : theme.backgrounds["ending"]?.image,
      ...(nextQ ? nextQ.cast.map((id) => theme.characters[id]?.image) : []),
    ]);
  }, [theme, s.qIndex, s.phase]);

  const click = useCallback(() => beep("click", muted), [muted]);

  const reset = useCallback(
    (phase: GameState["phase"]) => {
      setShowCollection(false);
      setFx(null);
      setS({ ...newGame(theme), phase, step: 0 });
    },
    [theme],
  );

  const q = theme.questions[s.qIndex]!;
  const ending = s.phase === "ending" ? resolveEnding(theme, s.stats, s.answers) : null;
  const reviews = ending ? characterReviews(s) : [];

  useEffect(() => {
    if (!loaded || !ending || s.step < ending.lines.length) return;
    setCollection(unlockEnding(theme.id, ending.id));
  }, [loaded, ending?.id, s.step, theme.id]);

  // Determine current lines for dialog-driven phases
  let lines: Line[] = [];
  let bg = "gym";
  let cast: string[] = [];
  if (s.phase === "opening") {
    lines = theme.opening;
    cast = ["hanna", "baekho", "taewoong", "chisu"];
  }
  if (s.phase === "question" || s.phase === "result") {
    bg = q.background;
    cast = q.cast;
    lines = s.phase === "question" ? q.lines : q.choices[s.answers[q.id] ?? 0]!.reactions;
  }
  if (ending) {
    lines = ending.lines;
    bg = ending.background;
    cast = ["chisu", "baekho", "taewoong", "hanna"];
  }

  const line = lines[Math.min(s.step, Math.max(0, lines.length - 1))];
  const isLastLine = s.step >= lines.length - 1;
  const speaker = line?.speaker ? theme.characters[line.speaker] : undefined;
  const allCast = Array.from(
    new Set([
      ...cast,
      ...lines.map((l) => l.speaker).filter((x): x is string => !!x && x !== "me"),
    ]),
  );
  const mood =
    s.phase === "result"
      ? (fx ?? "neutral")
      : ending
        ? ending.type === "hidden" || ending.type === "happy"
          ? "good"
          : "neutral"
        : "neutral";

  const onPick = (i: number) => {
    if (s.phase !== "question" || q.id in s.answers) return;
    const e = q.choices[i]!.effects;
    const good = Object.values(e).reduce((a, b) => a + b, 0) > 0;
    playBasketballSfx(good, i, muted);
    setFx(good ? "good" : "bad");
    setImpactTick((t) => t + 1);
    setIsImpacting(true);
    if (impactTimerRef.current !== null) {
      window.clearTimeout(impactTimerRef.current);
    }
    impactTimerRef.current = window.setTimeout(() => {
      setIsImpacting(false);
      impactTimerRef.current = null;
    }, 540);
    setS((prev) => ({ ...choose(theme, prev, i), step: 0 }));
  };

  const onNext = () => {
    click();
    setFx(null);
    setS((prev) => ({ ...advance(theme, prev), step: 0 }));
  };

  const hasSavedProgress =
    Object.keys(s.answers).length > 0 && Object.keys(s.answers).length < theme.questions.length;

  const gymBgUrl = theme.backgrounds["gym"]?.image
    ? `url('${encodeURI(theme.backgrounds["gym"].image)}')`
    : undefined;

  const titleCast: Array<{ id: string; slotClass: string }> = [
    { id: "chisu", slotClass: "sd-title-char--far-left" },
    { id: "baekho", slotClass: "sd-title-char--left" },
    { id: "taewoong", slotClass: "sd-title-char--right" },
    { id: "hanna", slotClass: "sd-title-char--far-right" },
  ];

  // Keyboard support on title screen
  useEffect(() => {
    if (s.phase !== "title" || showCollection) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag === "BUTTON" || tag === "A") return;
        e.preventDefault();
        click();
        reset("opening");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [s.phase, showCollection, click, reset]);

  if (!loaded) {
    return <div className="min-h-[calc(100dvh-58px)] bg-[#0c090b]" />;
  }

  /* ==================== TITLE & SUBVIEWS ==================== */
  if (s.phase === "title" || s.phase === "howto") {
    if (showCollection) {
      const unlockedCount = theme.endings.filter((e) => collection[e.id]).length;
      return (
        <div className="sd-prologue-screen" aria-label="엔딩 컬렉션">
          <div className="sd-bg-texture" aria-hidden="true" />
          <div className="sd-prologue-backdrop" aria-hidden="true">
            {gymBgUrl && <div className="sd-bg-photo" style={{ backgroundImage: gymBgUrl }} />}
            <div className="sd-bg-readability" />
          </div>

          <div className="sd-prologue-card">
            <span className="sd-prologue-kicker">SHOHOKU ARCHIVE · 엔딩 도감</span>
            <h2>엔딩 컬렉션 ({unlockedCount} / {theme.endings.length})</h2>
            <p className="sd-title-sub" style={{ margin: "8px 0 18px", textAlign: "left" }}>
              북산고 농구부 매니저로서의 10가지 선택에 따라 해금된 결말을 확인할 수 있습니다.
            </p>

            <div className="sd-archive-list">
              {theme.endings.map((e, idx) => {
                const unlocked = Boolean(collection[e.id]);
                return (
                  <div key={e.id} className={`sd-archive-item ${unlocked ? "unlocked" : ""}`}>
                    <span className="sd-archive-num">
                      ENDING 0{idx + 1} · {e.icon} {e.typeLabel}
                    </span>
                    <strong>{unlocked ? e.title : "??? 미해금 엔딩"}</strong>
                    <small>{unlocked ? e.subtitle : "게임을 플레이해 해금하세요."}</small>
                  </div>
                );
              })}
            </div>

            <div className="sd-prologue-actions">
              <button
                type="button"
                onClick={() => {
                  click();
                  setShowCollection(false);
                }}
                className="sd-btn-secondary"
              >
                <ArrowLeft size={16} />
                타이틀로 돌아가기
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (s.phase === "howto") {
      return (
        <div className="sd-prologue-screen" aria-label="게임 방법">
          <div className="sd-bg-texture" aria-hidden="true" />
          <div className="sd-prologue-backdrop" aria-hidden="true">
            {gymBgUrl && <div className="sd-bg-photo" style={{ backgroundImage: gymBgUrl }} />}
            <div className="sd-bg-readability" />
          </div>

          <div className="sd-prologue-card">
            <span className="sd-prologue-kicker">MANAGER HANDBOOK · 플레이 가이드</span>
            <h2>게임 방법</h2>
            <ul className="sd-howto-list">
              {theme.howTo.map((h, i) => (
                <li key={h}>
                  <span className="sd-howto-dot">{i + 1}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="sd-prologue-actions">
              <button
                type="button"
                onClick={() => {
                  click();
                  reset("opening");
                }}
                className="sd-btn-primary"
              >
                <Play size={17} />
                바로 시작하기
              </button>
              <button
                type="button"
                onClick={() => {
                  click();
                  setS((p) => ({ ...p, phase: "title" }));
                }}
                className="sd-btn-ghost"
              >
                <ArrowLeft size={16} />
                타이틀로 돌아가기
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <section className="sd-title-screen" aria-label="슬램덩크 시작 화면">
        <div className="sd-bg-texture" aria-hidden="true" />
        <div className="sd-title-backdrop" aria-hidden="true">
          {gymBgUrl && (
            <div
              className="sd-bg-photo"
              style={{ backgroundImage: gymBgUrl }}
              data-bg-src={theme.backgrounds["gym"]?.image}
            />
          )}
          <div className="sd-bg-readability" />
          <div className="sd-title-sunburst" />
          <div className="sd-title-characters">
            {titleCast.map(({ id, slotClass }) => {
              const char = theme.characters[id];
              return char ? (
                <EndingPortraitImg key={id} c={char} className={`sd-title-char ${slotClass}`} />
              ) : null;
            })}
          </div>
          <div className="sd-title-scrim" />
        </div>

        <div className="sd-title-panel">
          <div className="sd-title-badge-bar" aria-hidden="true" />
          <div className="sd-title-emblem" aria-hidden="true">
            <Flame size={34} />
          </div>

          <p className="sd-title-eyebrow">SHOHOKU HIGH · BASKETBALL CLUB</p>
          <h1 className="sd-title-main">
            {theme.title}
            <span>{theme.subtitle}</span>
          </h1>
          <p className="sd-title-sub">
            북산고 농구부의 신입 매니저가 되어 열 가지 코트 위 위기를 돌파하고 팀의 신뢰와 판단력을 증명하세요.
          </p>

          <div className="sd-title-actions">
            <button
              type="button"
              data-start="true"
              onClick={() => {
                click();
                reset("opening");
              }}
              className="sd-btn-primary sd-btn-lg"
            >
              <Play size={18} />
              새 게임 시작하기
            </button>

            {hasSavedProgress && (
              <button
                type="button"
                onClick={() => {
                  click();
                  setS((p) => ({ ...p, phase: "question", step: 0 }));
                }}
                className="sd-btn-secondary sd-btn-lg"
              >
                <Save size={18} />
                이어하기 (Q{String(s.qIndex + 1).padStart(2, "0")} / {theme.questions.length})
              </button>
            )}

            <div className="sd-title-actions-row">
              <button
                type="button"
                onClick={() => {
                  click();
                  setShowCollection(true);
                }}
                className="sd-btn-secondary"
              >
                <Trophy size={16} />
                엔딩 컬렉션 ({theme.endings.filter((e) => collection[e.id]).length}/{theme.endings.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  click();
                  setS((p) => ({ ...p, phase: "howto" }));
                }}
                className="sd-btn-ghost"
              >
                <BookOpen size={16} />
                게임 방법
              </button>
            </div>
          </div>

          <p className="sd-title-hint">Enter 또는 Space 키로 시작 · 코트 효과음 및 자동 저장 지원</p>
        </div>
      </section>
    );
  }

  const showBanner = s.phase === "opening" && s.step >= lines.length;
  const showChoices = s.phase === "question" && s.step >= lines.length;
  const showEndingCard = !!ending && s.step >= lines.length;

  /* ==================== OPENING PROLOGUE BANNER ==================== */
  if (showBanner) {
    return (
      <section className="sd-prologue-screen" aria-label="프롤로그 안내">
        <div className="sd-bg-texture" aria-hidden="true" />
        <div className="sd-prologue-backdrop" aria-hidden="true">
          {gymBgUrl && <div className="sd-bg-photo" style={{ backgroundImage: gymBgUrl }} />}
          <div className="sd-bg-readability" />
        </div>

        <div className="sd-prologue-card">
          <span className="sd-prologue-kicker">PROLOGUE · 북산고 농구부 입부 완료</span>
          <h2>{theme.openingBanner}</h2>
          <div className="sd-prologue-story">
            {theme.openingGuide.map((g) => (
              <p key={g}>{g}</p>
            ))}
          </div>

          <div className="sd-prologue-stats">
            <div className="sd-prologue-stat">
              <Shield size={20} aria-hidden="true" />
              <div>
                <strong>팀 신뢰도 (초기 50)</strong>
                <p>선수들과 감독이 매니저인 당신을 얼마나 믿고 의지하는지 나타냅니다.</p>
              </div>
            </div>
            <div className="sd-prologue-stat">
              <Brain size={20} aria-hidden="true" />
              <div>
                <strong>판단력 (초기 50)</strong>
                <p>훈련·경기·선수 관리의 순간마다 냉정하고 현명한 결정을 내리는 능력입니다.</p>
              </div>
            </div>
          </div>

          <div className="sd-prologue-actions">
            <button
              type="button"
              onClick={() => {
                click();
                setS((p) => ({ ...p, phase: "question", qIndex: 0, step: 0 }));
              }}
              className="sd-btn-primary sd-btn-lg"
            >
              첫 번째 상황으로
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => {
                click();
                setS((p) => ({ ...p, phase: "title" }));
              }}
              className="sd-btn-ghost"
            >
              타이틀로 돌아가기
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* ==================== ENDING / RESULT SCREEN ==================== */
  if (showEndingCard && ending) {
    const endingBg = theme.backgrounds[ending.background]?.image;
    const endingBgUrl = endingBg ? `url('${encodeURI(endingBg)}')` : gymBgUrl;
    const endingIndex = Math.max(0, theme.endings.findIndex((e) => e.id === ending.id));
    const leadSpeaker =
      theme.characters[ending.leadSpeakerId ?? (ending.type === "happy" ? "chisu" : "hanna")] ??
      theme.characters["hanna"]!;
    const showcaseIds = ["chisu", "baekho", "taewoong", "hanna"];
    const unlockedCount = theme.endings.filter(
      (e) => collection[e.id] || e.id === ending.id,
    ).length;

    return (
      <section className="sd-result-screen" aria-label="최종 매니저 결과 및 선수 평가">
        <div className="sd-bg-texture" aria-hidden="true" />

        <div className={`sd-ending-hero sd-ending-hero--${ending.type}`}>
          <div className="sd-ending-badge-row">
            <div className="sd-ending-type-group">
              <span className={`sd-ending-type-badge sd-ending-type--${ending.type}`}>
                {ending.icon} {ending.typeLabel}
              </span>
              <span className="sd-ending-kicker">SHOHOKU HIGH BASKETBALL · 최종 매니저 보고</span>
            </div>
            <span className="sd-ending-cond">{ending.conditionLabel}</span>
          </div>

          <h1 className="sd-ending-title">{ending.title}</h1>
          <p className="sd-ending-subtitle">{ending.subtitle}</p>

          <div className="sd-ending-visual">
            {endingBgUrl && (
              <div
                className="sd-bg-photo"
                style={{ backgroundImage: endingBgUrl }}
                data-bg-src={endingBg}
                aria-hidden="true"
              />
            )}
            <div className="sd-bg-readability" aria-hidden="true" />
            <div className="sd-ending-ensemble" aria-label="북산고 주요 인물">
              {showcaseIds.map((id, idx) => {
                const char = theme.characters[id];
                if (!char) return null;
                return (
                  <div
                    key={id}
                    className={`sd-ending-member ${idx === 1 || idx === 2 ? "sd-ending-member--lead" : ""}`}
                  >
                    <EndingPortraitImg c={char} className="sd-ending-member-img" />
                  </div>
                );
              })}
            </div>
            <div className="sd-ending-scrim" aria-hidden="true" />
            <div className="sd-ending-banner-mark" aria-hidden="true">
              <span>
                ENDING 0{endingIndex + 1} · {ending.type.toUpperCase()}
              </span>
              <strong>{ending.title}</strong>
            </div>
          </div>

          <p className="sd-ending-narration">{ending.narration}</p>

          <div className="sd-ending-quote-box">
            <div className="sd-ending-quote-portrait">
              <EndingPortraitImg c={leadSpeaker} />
            </div>
            <div className="sd-ending-quote-copy">
              <div className="sd-ending-quote-speaker">
                <strong>{leadSpeaker.name}</strong>
                <span>북산고 농구부 최종 총평</span>
              </div>
              <blockquote>“{ending.quote}”</blockquote>
            </div>
          </div>

          <div className="sd-final-stats">
            {theme.stats.map((d) => {
              const Icon = d.id === "trust" ? Shield : Brain;
              return (
                <div key={d.id} className="sd-final-stat">
                  <Icon size={19} aria-hidden="true" />
                  <span>{d.label}</span>
                  <b>{s.stats[d.id]}</b>
                </div>
              );
            })}
          </div>
        </div>

        {/* Character Evaluations */}
        <div className="sd-eval-section">
          <div className="sd-eval-header">
            <span className="sd-eval-kicker">SHOHOKU ROSTER EVALUATION · 선수단 개별 평가</span>
            <h2>북산고 주역 4인의 매니저 평가</h2>
            <p>10번의 훈련과 경기 속에서 당신이 보여 준 신뢰와 판단력을 북산고 멤버들이 평가했습니다.</p>
          </div>

          <div className="sd-eval-grid">
            {reviews.map((r) => {
              const char = theme.characters[r.id];
              return (
                <article key={r.id} className="sd-eval-card">
                  <CharacterReviewImage c={char} />
                  <div className="sd-eval-body">
                    <span className="sd-eval-role">
                      {char?.number ? `NO.${char.number} · SHOHOKU` : "SHOHOKU MANAGER"}
                    </span>
                    <h3 className="sd-eval-name">{r.title}</h3>
                    <p className="sd-eval-comment">“{r.comment}”</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Ending Archive */}
        <div className="sd-archive-strip" aria-label="엔딩 달성 현황">
          <div className="sd-archive-head">
            <Award size={18} aria-hidden="true" />
            <strong>북산고 매니저 엔딩 도감 ({unlockedCount} / {theme.endings.length} 해금)</strong>
          </div>
          <div className="sd-archive-list">
            {theme.endings.map((e, idx) => {
              const unlocked = Boolean(collection[e.id] || e.id === ending.id);
              const active = e.id === ending.id;
              return (
                <div
                  key={e.id}
                  className={`sd-archive-item ${unlocked ? "unlocked" : ""} ${active ? "current" : ""}`}
                >
                  <span className="sd-archive-num">
                    ENDING 0{idx + 1} · {e.icon} {e.typeLabel}
                  </span>
                  <strong>{unlocked ? e.title : "??? 미해금 엔딩"}</strong>
                  <small>{unlocked ? e.subtitle : "다른 선택으로 해금"}</small>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="sd-result-actions">
          <button
            type="button"
            onClick={() => {
              click();
              reset("opening");
            }}
            className="sd-btn-primary sd-btn-lg"
          >
            <RotateCcw size={18} />
            {ending.retryLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              click();
              reset("title");
            }}
            className="sd-btn-secondary sd-btn-lg"
          >
            <Home size={18} />
            타이틀로 돌아가기
          </button>
        </div>

        <EndingShareAndReward
          gameId="slamdunk"
          animeTitle={theme.title}
          endingTitle={ending.title}
        />
      </section>
    );
  }

  /* ==================== GAMEPLAY SHELL ==================== */
  const stageCode =
    s.phase === "opening"
      ? "OPENING"
      : ending
        ? "FINAL EPISODE"
        : `QUESTION ${String(s.qIndex + 1).padStart(2, "0")} / ${String(theme.questions.length).padStart(2, "0")}`;
  const stageTitle =
    s.phase === "opening"
      ? "북산고 농구부 입부 첫날"
      : ending
        ? ending.title
        : q.title;
  const stageLocation = theme.backgrounds[bg]?.label ?? "북산고 체육관";
  const progressRatio =
    s.phase === "opening"
      ? 0.04
      : ending
        ? 1
        : Math.min(
            1,
            (s.qIndex + (showChoices ? 0.65 : s.phase === "result" ? 0.92 : 0.25)) /
              theme.questions.length,
          );

  const nextLabel =
    s.phase === "question" && isLastLine
      ? "선택지 보기"
      : s.phase === "result" && isLastLine
        ? s.qIndex + 1 >= theme.questions.length
          ? "최종 결과 확인"
          : "다음 상황으로"
        : ending && isLastLine
          ? "최종 결과 확인"
          : "계속 진행";

  const handleDialogAdvance = () => {
    if (s.phase === "result" && isLastLine) {
      onNext();
      return;
    }
    click();
    setS((p) => ({ ...p, step: p.step + 1 }));
  };

  return (
    <div className="sd-play-shell" data-phase={s.phase}>
      <div className="sd-bg-texture" aria-hidden="true" />

      {/* Unified Top HUD Bar */}
      <header
        className={`sd-hud ${isImpacting ? "sd-scoreboard--flash" : ""} ${
          isImpacting && fx === "bad" ? "sd-scoreboard--bad" : ""
        }`}
        aria-label="진행 상황 및 능력치"
      >
        <div className="sd-hud-top">
          <div className="sd-hud-ep">
            <span className="sd-hud-code">{stageCode}</span>
            <span className="sd-hud-title">{stageTitle}</span>
            <span className="sd-hud-location">{stageLocation}</span>
          </div>

          <div className="sd-hud-actions">
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="sd-icon-btn"
              aria-label={muted ? "효과음 켜기" : "효과음 음소거"}
              title={muted ? "효과음 켜기" : "효과음 음소거"}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button
              type="button"
              onClick={() => {
                click();
                reset("opening");
              }}
              className="sd-icon-btn"
              aria-label="처음부터 다시하기"
              title="처음부터 다시하기"
            >
              <RotateCcw size={16} />
            </button>
            <button
              type="button"
              onClick={() => {
                click();
                setS((p) => ({ ...p, phase: "title" }));
              }}
              className="sd-icon-btn"
              aria-label="타이틀로 이동"
              title="타이틀로 이동"
            >
              <Home size={16} />
            </button>
          </div>
        </div>

        <div className="sd-stats-row">
          {theme.stats.map((d) => {
            const v = s.stats[d.id] ?? d.initial;
            const delta = s.phase === "result" ? s.lastDelta?.[d.id] : undefined;
            const meta = STAT_META[d.id as keyof typeof STAT_META] ?? STAT_META.trust;
            const Icon = meta.icon;
            const pct = Math.max(0, Math.min(100, ((v - d.min) / (d.max - d.min)) * 100));

            return (
              <div key={d.id} className="sd-stat-card">
                <div className="sd-stat-head">
                  <span className="sd-stat-label">
                    <Icon size={14} aria-hidden="true" />
                    {d.label}
                  </span>
                  <span className="sd-stat-values">
                    {delta !== undefined && delta !== 0 && (
                      <span className={`sd-stat-delta ${delta > 0 ? "pos" : "neg"}`}>
                        {delta > 0 ? `+${delta}` : delta}
                      </span>
                    )}
                    <span className="sd-stat-num">{v}</span>
                  </span>
                </div>
                <div
                  className="sd-stat-bar"
                  role="progressbar"
                  aria-label={d.label}
                  aria-valuemin={d.min}
                  aria-valuemax={d.max}
                  aria-valuenow={v}
                >
                  <div className={`sd-stat-fill ${meta.fillClass}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="sd-progress-track" aria-hidden="true">
          <div className="sd-progress-fill" style={{ width: `${Math.round(progressRatio * 100)}%` }} />
        </div>
      </header>

      {/* Unified Visual Novel Stage */}
      <SceneStage
        theme={theme}
        bg={bg}
        cast={allCast}
        activeSpeakerId={showChoices ? undefined : speaker?.id}
        mood={mood}
        isChoicePhase={showChoices}
        isImpacting={isImpacting}
        impactTick={impactTick}
        fx={fx}
      />

      {/* Unified Bottom Panel */}
      <section className="sd-bottom-panel" aria-live="polite">
        {showChoices ? (
          <div className="sd-choice-box">
            <div className="sd-choice-header">
              <span className="sd-choice-kicker">DECISION · 매니저의 판단</span>
              <p className="sd-choice-prompt">{q.prompt}</p>
            </div>
            <div className="sd-choices-grid" role="group" aria-label="선택지 목록">
              {q.choices.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onPick(i)}
                  className="sd-choice-btn"
                >
                  <span className="sd-choice-badge">{"ABC"[i]}</span>
                  <span className="sd-choice-label">{c.label}</span>
                  <ChevronRight size={17} className="sd-choice-arrow" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <UnifiedDialog
            key={`${s.phase}-${s.qIndex}-${s.step}`}
            name={speaker?.name}
            text={line?.text ?? ""}
            nextLabel={nextLabel}
            reactionDeltas={
              s.phase === "result" && s.lastDelta
                ? theme.stats.map((d) => ({
                    id: d.id,
                    label: d.label,
                    value: s.lastDelta?.[d.id] ?? 0,
                  }))
                : undefined
            }
            onAdvance={handleDialogAdvance}
          />
        )}
      </section>
    </div>
  );
}

function UnifiedDialog({
  name,
  text,
  nextLabel,
  reactionDeltas,
  onAdvance,
}: {
  name?: string;
  text: string;
  nextLabel: string;
  reactionDeltas?: Array<{ id: string; label: string; value: number }>;
  onAdvance: () => void;
}) {
  const { shown, done, finish } = useTypewriter(text);

  const handleClick = useCallback(() => {
    if (!done) {
      finish();
    } else {
      onAdvance();
    }
  }, [done, finish, onAdvance]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag === "BUTTON" || tag === "A") return;
        e.preventDefault();
        handleClick();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClick]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className="sd-dialogue-card"
      aria-label="대화 진행"
    >
      <div className={`sd-speaker-plate ${!name ? "sd-speaker-plate--narrator" : ""}`}>
        {name ?? "내레이션"}
      </div>

      <p className={`sd-dialogue-text ${!name ? "sd-dialogue-text--narrator" : ""}`}>
        {name ? `“${shown}”` : shown}
        {!done && <span className="sd-caret">▍</span>}
      </p>

      <div className="sd-dialogue-footer">
        <div className="sd-reaction-deltas">
          {reactionDeltas?.map((d) =>
            d.value !== 0 ? (
              <span key={d.id} className={`sd-delta-pill ${d.value > 0 ? "pos" : "neg"}`}>
                {d.label} {d.value > 0 ? `+${d.value}` : d.value}
              </span>
            ) : null,
          )}
        </div>

        <span className="sd-next-indicator">
          {done ? nextLabel : "클릭하여 스킵"}
          <ChevronRight size={16} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
