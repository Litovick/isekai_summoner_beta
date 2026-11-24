import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Award,
  ChevronRight,
  HeartPulse,
  Home,
  Lock,
  Play,
  RotateCcw,
  Save,
  Shield,
  Swords,
  Trophy,
  Volume2,
  VolumeX,
} from "lucide-react";
import "./styles.css";
import { EndingShareAndReward } from "../../components/EndingShareAndReward";
import {
  getGlobalAudioMuted,
  setGlobalAudioMuted,
  subscribeGlobalAudioMuted,
} from "../../utils/mobileAudio";
import {
  ENDING_ORDER,
  missions,
  endings,
  outcome,
  type Outcome,
} from "./game/attack-data";
import { AOT_PEOPLE, Scene, useTypewriter, beep } from "./Scene";
import {
  preloadAttackAudio,
  syncAttackAudioMute,
  type AttackSoundKind,
} from "./game/attack-sound";
import {
  endingBackground,
  homeBackground,
  missionBackgrounds,
  portraits,
} from "./game/attack-images";

type Phase = "home" | "story" | "choice" | "reaction" | "end";
type SaveState = {
  phase: Phase;
  index: number;
  survival: number;
  trust: number;
  answers: number[];
};

const initial: SaveState = {
  phase: "home",
  index: 0,
  survival: 50,
  trust: 50,
  answers: [],
};

const key = "game:attack-on-titan:v2";
const galleryKey = "game:attack-on-titan:gallery";
const clamp = (n: number) => Math.max(0, Math.min(100, n));

const reviews = (s: SaveState) => [
  {
    name: "리바이",
    text:
      s.survival >= 80
        ? "살아남는 것도 실력이다. 그 판단을 유지해라."
        : "운에만 기대서는 오래 살아남지 못한다.",
  },
  {
    name: "엘빈",
    text:
      s.answers[8] === 0
        ? "유인과 철수를 동시에 설계했다. 탁월한 전술적 판단이었다."
        : "결정에는 반드시 대가가 따른다. 그것을 잊지 말게.",
  },
  {
    name: "미카사",
    text:
      s.trust >= 80
        ? "끝까지 동료를 지키려 했다는 걸 알아. 고마워."
        : "다음에는 주변 동료들의 위치도 함께 살펴줘.",
  },
  {
    name: "아르민",
    text:
      s.answers[7] === 2
        ? "절벽 위 사각지대를 읽어 낸 우회 선택이 모두를 살렸어."
        : "지형을 활용했다면 다른 돌파구도 있었을 거야. 다음엔 함께 생각해 보자.",
  },
];

export function AttackGame() {
  const [s, setS] = useState<SaveState>(initial);
  const [savedGame, setSavedGame] = useState<SaveState | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [gallery, setGallery] = useState<Outcome[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const [muted, setMuted] = useState<boolean>(() => getGlobalAudioMuted());
  const [lastDelta, setLastDelta] = useState<{ survival: number; trust: number } | null>(null);
  const [impactTick, setImpactTick] = useState(0);
  const [isImpacting, setIsImpacting] = useState(false);
  const [impactMood, setImpactMood] = useState<"neutral" | "good" | "bad">("neutral");
  const impactTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (impactTimerRef.current !== null) {
        window.clearTimeout(impactTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    preloadAttackAudio();
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const saved = JSON.parse(raw) as SaveState;
        if (
          saved &&
          Array.isArray(saved.answers) &&
          saved.index >= 0 &&
          saved.index <= missions.length &&
          saved.phase !== "home" &&
          saved.phase !== "end"
        ) {
          setSavedGame(saved);
        }
      }
      const g = JSON.parse(localStorage.getItem(galleryKey) || "[]");
      if (Array.isArray(g)) {
        setGallery(g.filter((v): v is Outcome => typeof v === "string" && v in endings));
      }
      setMuted(getGlobalAudioMuted());
    } catch {
      // ignore storage errors
    }
    setLoaded(true);
  }, []);

  useEffect(() => subscribeGlobalAudioMuted(setMuted), []);

  useEffect(() => {
    if (loaded && s.phase !== "home" && s.phase !== "end") {
      try {
        localStorage.setItem(key, JSON.stringify(s));
        setSavedGame(s);
      } catch {
        // ignore
      }
    }
  }, [loaded, s]);

  useEffect(() => {
    syncAttackAudioMute(muted);
    if (loaded) setGlobalAudioMuted(muted);
  }, [muted, loaded]);

  const result = outcome(s.survival, s.trust, s.answers);

  useEffect(() => {
    if (!loaded || s.phase !== "end") return;
    setSavedGame(null);
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
    setGallery((prev) => {
      if (prev.includes(result)) return prev;
      const next = [...prev, result];
      try {
        localStorage.setItem(galleryKey, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, [loaded, s.phase, result]);

  const q = missions[Math.min(s.index, missions.length - 1)]!;
  const last = s.answers[s.answers.length - 1] ?? 0;
  const dialogue =
    s.phase === "story"
      ? q.story
      : s.phase === "reaction"
        ? (q.choices[last]?.reaction ?? "")
        : s.phase === "end"
          ? endings[result].description
          : "";

  const typed = useTypewriter(dialogue);
  const sound = useCallback((kind: AttackSoundKind = "click") => beep(kind, muted), [muted]);

  const start = useCallback(() => {
    sound("slash");
    setLastDelta(null);
    setImpactMood("neutral");
    setS({ ...initial, phase: "story" });
    setSavedGame(null);
    setShowGallery(false);
  }, [sound]);

  const resume = useCallback(() => {
    if (!savedGame) return;
    sound();
    setLastDelta(null);
    setS(savedGame);
    setShowGallery(false);
  }, [savedGame, sound]);

  const goHome = useCallback(() => {
    sound();
    setS((p) => ({ ...p, phase: "home" }));
    setShowGallery(false);
  }, [sound]);

  const pick = (i: number) => {
    if (s.phase !== "choice") return;
    const c = q.choices[i]!;
    const isGood = c.survival + c.trust >= 0;
    const mood: "good" | "bad" = c.survival < 0 && !isGood ? "bad" : isGood ? "good" : "bad";
    sound(isGood ? "good" : "bad");
    setLastDelta({ survival: c.survival, trust: c.trust });
    setImpactMood(mood);
    setImpactTick((t) => t + 1);
    setIsImpacting(true);
    if (impactTimerRef.current !== null) {
      window.clearTimeout(impactTimerRef.current);
    }
    impactTimerRef.current = window.setTimeout(() => {
      setIsImpacting(false);
      impactTimerRef.current = null;
    }, 460);
    setS((p) => ({
      ...p,
      phase: "reaction",
      answers: [...p.answers, i],
      survival: clamp(p.survival + c.survival),
      trust: clamp(p.trust + c.trust),
    }));
  };

  const next = useCallback(() => {
    sound();
    if (!typed.done) {
      typed.finish();
      return;
    }
    if (s.phase === "story") {
      setS((p) => ({ ...p, phase: "choice" }));
      return;
    }
    if (s.phase === "reaction") {
      setLastDelta(null);
      setS((p) => ({
        ...p,
        index: p.index + 1,
        phase: p.index === missions.length - 1 ? "end" : "story",
      }));
    }
  }, [sound, typed, s.phase]);

  // Keyboard support for Title & Dialogue phases
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "BUTTON" || tag === "A") return;

      if (s.phase === "home" && !showGallery) {
        e.preventDefault();
        start();
      } else if (s.phase === "story" || s.phase === "reaction") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [s.phase, showGallery, start, next]);

  const endingArt: Record<Outcome, string> = {
    hidden: endingBackground,
    hero: endingBackground,
    survivor: missionBackgrounds[9]!,
    sacrifice: missionBackgrounds[8]!,
    fallen: missionBackgrounds[3]!,
  };

  const titleCast: Array<{ name: string; slotClass: string }> = [
    { name: "한지", slotClass: "aot-title-char--far-left" },
    { name: "엘빈", slotClass: "aot-title-char--left" },
    { name: "리바이", slotClass: "aot-title-char--right" },
    { name: "미카사", slotClass: "aot-title-char--far-right" },
  ];

  if (!loaded) {
    return <div className="min-h-[calc(100dvh-58px)] bg-[#0b110d]" />;
  }

  /* ==================== GALLERY SUBVIEW ==================== */
  if (showGallery) {
    return (
      <section className="aot-prologue-screen" aria-label="엔딩 컬렉션">
        <div className="aot-bg-texture" aria-hidden="true" />
        <div className="aot-prologue-backdrop" aria-hidden="true">
          <div
            className="aot-bg-photo"
            style={{ backgroundImage: `url("${encodeURI(homeBackground)}")` }}
          />
          <div className="aot-bg-readability" />
        </div>

        <div className="aot-prologue-card">
          <span className="aot-prologue-kicker">EXPEDITION ARCHIVE · 조사병단 원정 기록</span>
          <h2>
            엔딩 컬렉션 ({gallery.length} / {ENDING_ORDER.length})
          </h2>

          <div className="aot-gallery-grid">
            {ENDING_ORDER.map((k, i) => {
              const unlocked = gallery.includes(k);
              return (
                <article
                  key={k}
                  className={`aot-ending-card ${
                    unlocked ? "aot-ending-card--unlocked" : "aot-ending-card--locked"
                  }`}
                >
                  <div className="aot-ending-art">
                    <img
                      src={endingArt[k]}
                      alt={unlocked ? `${endings[k].title} 엔딩 배경` : ""}
                      loading="lazy"
                    />
                    <span className="aot-ending-number">
                      RECORD 0{i + 1} · {endings[k].icon} {endings[k].typeLabel}
                    </span>
                    {!unlocked && (
                      <span className="aot-ending-lock" aria-label="미해금">
                        <Lock size={28} />
                      </span>
                    )}
                  </div>
                  <div className="aot-ending-info">
                    <b>{unlocked ? endings[k].title : "??? 잠긴 엔딩"}</b>
                    <p>{unlocked ? endings[k].subtitle : "다른 선택으로 해금"}</p>
                    {unlocked && (
                      <p className="aot-ending-description">{endings[k].description}</p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="aot-prologue-actions">
            <button
              type="button"
              onClick={() => {
                sound();
                setShowGallery(false);
              }}
              className="aot-btn-secondary"
            >
              <ArrowLeft size={16} />
              돌아가기
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* ==================== TITLE SCREEN ==================== */
  if (s.phase === "home") {
    return (
      <section className="aot-title-screen" aria-label="진격의 거인 메인 메뉴">
        <div className="aot-bg-texture" aria-hidden="true" />
        <div className="aot-title-backdrop" aria-hidden="true">
          <div
            className="aot-bg-photo"
            style={{ backgroundImage: `url("${encodeURI(homeBackground)}")` }}
            data-bg-src={homeBackground}
          />
          <div className="aot-bg-readability" />
          <div className="aot-title-sunburst" />
          <div className="aot-title-characters">
            {titleCast.map(({ name, slotClass }) =>
              portraits[name] ? (
                <img
                  key={name}
                  src={portraits[name]}
                  alt={AOT_PEOPLE[name]?.name ?? name}
                  className={`aot-title-char ${slotClass}`}
                />
              ) : null,
            )}
          </div>
          <div className="aot-title-scrim" />
        </div>

        <div className="aot-title-panel">
          <div className="aot-title-badge-bar" aria-hidden="true" />
          <div className="aot-title-emblem" aria-hidden="true">
            <Swords size={34} />
          </div>

          <p className="aot-title-eyebrow">WALL MARIA · SURVEY CORPS</p>
          <h1 className="aot-title-main">
            진격의 거인
            <span>조사병단 생존 시뮬레이션</span>
          </h1>
          <p className="aot-title-sub">
            벽 밖으로 향하는 순간, 모든 판단에는 대가가 따른다. 열 번의 원정 선택으로 동료를 지키고 살아 돌아올 수 있을까?
          </p>

          <div className="aot-title-actions">
            <button
              type="button"
              data-start="true"
              onClick={start}
              className="aot-btn-primary aot-btn-lg"
            >
              <Play size={18} />
              새 원정 시작하기
            </button>

            {savedGame && (
              <button
                type="button"
                onClick={resume}
                className="aot-btn-secondary aot-btn-lg"
              >
                <Save size={18} />
                원정 이어하기 (MISSION {String(savedGame.index + 1).padStart(2, "0")})
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                sound();
                setShowGallery(true);
              }}
              className="aot-btn-ghost"
            >
              <Trophy size={16} />
              엔딩 컬렉션 ({gallery.length} / {ENDING_ORDER.length} 해금)
            </button>
          </div>

          <p className="aot-title-hint">Enter 또는 Space 키로 시작 · 입체기동 블레이드 효과음 및 자동 저장 지원</p>
        </div>
      </section>
    );
  }

  /* ==================== ENDING / RESULT SCREEN ==================== */
  if (s.phase === "end") {
    const endingInfo = endings[result];
    const quoteSpeakerKey = endingInfo.speaker;
    const quotePerson = AOT_PEOPLE[quoteSpeakerKey] ?? AOT_PEOPLE["리바이"]!;
    const ensembleOrder = ["엘빈", "리바이", "미카사", "아르민"];
    const unlockedSet = Array.from(new Set([...gallery, result]));

    return (
      <section className="aot-result-screen" aria-label="최종 원정 결과 및 동료 평가">
        <div className="aot-bg-texture" aria-hidden="true" />

        <div
          className={`aot-ending-hero aot-ending-hero--${endingInfo.type} ${
            result === "fallen" ? "aot-ending-hero--fallen" : ""
          }`}
        >
          <div className="aot-ending-badge-row">
            <div className="aot-ending-type-group">
              <span className={`aot-ending-type-badge aot-ending-type--${endingInfo.type}`}>
                {endingInfo.icon} {endingInfo.typeLabel}
              </span>
              <span className="aot-ending-kicker">SURVEY CORPS REPORT · 최종 원정 보고</span>
            </div>
            <span className="aot-ending-cond">{endingInfo.condition}</span>
          </div>

          <h1 className="aot-ending-title">{endingInfo.title}</h1>
          <p className="aot-ending-subtitle">{endingInfo.subtitle}</p>

          <div className="aot-ending-visual">
            <div
              className="aot-bg-photo"
              style={{ backgroundImage: `url("${encodeURI(endingArt[result])}")` }}
              data-bg-src={endingArt[result]}
              aria-hidden="true"
            />
            <div className="aot-bg-readability" aria-hidden="true" />
            <div className="aot-ending-ensemble" aria-label="조사병단 주요 인물">
              {ensembleOrder.map((name, idx) =>
                portraits[name] ? (
                  <div
                    key={name}
                    className={`aot-ending-member ${
                      idx === 1 || idx === 2 ? "aot-ending-member--lead" : ""
                    }`}
                  >
                    <img
                      src={portraits[name]}
                      alt={AOT_PEOPLE[name]?.name ?? name}
                      className="aot-ending-member-img"
                    />
                  </div>
                ) : null,
              )}
            </div>
            <div className="aot-ending-scrim" aria-hidden="true" />
            <div className="aot-ending-banner-mark" aria-hidden="true">
              <span>
                ENDING 0{endingInfo.priority} · {endingInfo.type.toUpperCase()}
              </span>
              <strong>{endingInfo.title}</strong>
            </div>
          </div>

          <p className="aot-ending-narration">{endingInfo.narration}</p>

          <div className="aot-ending-quote-box">
            {portraits[quoteSpeakerKey] && (
              <div className="aot-ending-quote-portrait">
                <img src={portraits[quoteSpeakerKey]} alt={quotePerson.name} />
              </div>
            )}
            <div className="aot-ending-quote-copy">
              <div className="aot-ending-quote-speaker">
                <strong>{quotePerson.name}</strong>
                <span>{quotePerson.role} · 작전 총평</span>
              </div>
              <blockquote>“{endingInfo.description}”</blockquote>
            </div>
          </div>

          <div className="aot-final-stats">
            <div className="aot-final-stat aot-final-stat--survival">
              <HeartPulse size={19} aria-hidden="true" />
              <span>생존 가능성</span>
              <b>{s.survival}</b>
            </div>
            <div className="aot-final-stat">
              <Shield size={19} aria-hidden="true" />
              <span>동료 신뢰도</span>
              <b>{s.trust}</b>
            </div>
          </div>
        </div>

        {/* Character Evaluations */}
        <div className="aot-eval-section">
          <div className="aot-eval-header">
            <span className="aot-eval-kicker">SURVEY CORPS EVALUATION · 조사병단 개별 평가</span>
            <h2>조사병단 주역 4인의 전장 평가</h2>
            <p>
              벽 외 조사 열 번의 작전에서 당신이 내린 결단을 리바이·엘빈·미카사·아르민이 각자의 시선으로 평가했습니다.
            </p>
          </div>

          <div className="aot-eval-grid">
            {reviews(s).map((r) => {
              const person = AOT_PEOPLE[r.name];
              return (
                <article key={r.name} className="aot-eval-card">
                  <div className="aot-eval-stage">
                    {portraits[r.name] && (
                      <img
                        src={portraits[r.name]}
                        alt={person?.name ?? r.name}
                        className="aot-eval-portrait"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="aot-eval-body">
                    <span className="aot-eval-role">{person?.role ?? "조사병단"}</span>
                    <h3 className="aot-eval-name">{person?.name ?? r.name}</h3>
                    <p className="aot-eval-comment">“{r.text}”</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Ending Archive */}
        <div className="aot-archive-strip" aria-label="엔딩 달성 현황">
          <div className="aot-archive-head">
            <Award size={18} aria-hidden="true" />
            <strong>
              조사병단 엔딩 도감 ({unlockedSet.length} / {ENDING_ORDER.length} 해금)
            </strong>
          </div>
          <div className="aot-archive-list">
            {ENDING_ORDER.map((eid) => {
              const info = endings[eid];
              const unlocked = unlockedSet.includes(eid);
              const active = eid === result;
              return (
                <div
                  key={eid}
                  className={`aot-archive-item ${unlocked ? "unlocked" : ""} ${
                    active ? "current" : ""
                  }`}
                >
                  <span className="aot-archive-num">
                    ENDING 0{info.priority} · {info.icon} {info.typeLabel}
                  </span>
                  <strong>{unlocked ? info.title : "??? 미해금 엔딩"}</strong>
                  <small>{unlocked ? info.subtitle : "다른 선택으로 해금"}</small>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="aot-result-actions">
          <button type="button" onClick={start} className="aot-btn-primary aot-btn-lg">
            <RotateCcw size={18} />
            다시 원정 도전하기
          </button>
          <button type="button" onClick={goHome} className="aot-btn-secondary aot-btn-lg">
            <Home size={18} />
            타이틀로 돌아가기
          </button>
        </div>

        <EndingShareAndReward
          gameId="aot"
          animeTitle="진격의 거인"
          endingTitle={endingInfo.title}
        />
      </section>
    );
  }

  /* ==================== GAMEPLAY SHELL ==================== */
  const rawReactionPrefix = q.choices[last]?.reaction.split(":")[0]?.trim() ?? "";
  const activeSpeaker =
    s.phase === "reaction" && rawReactionPrefix in portraits ? rawReactionPrefix : q.speaker;
  const activePerson = AOT_PEOPLE[activeSpeaker] ?? AOT_PEOPLE[q.speaker] ?? AOT_PEOPLE["엘빈"]!;
  const stageMood: "neutral" | "good" | "bad" =
    s.phase === "reaction"
      ? (q.choices[last]?.survival ?? 0) < 0
        ? "bad"
        : "good"
      : "neutral";
  const progressRatio =
    (s.index + (s.phase === "choice" ? 0.65 : s.phase === "reaction" ? 0.92 : 0.25)) /
    missions.length;

  const nextLabel =
    s.phase === "story"
      ? "선택지 보기"
      : s.index === missions.length - 1
        ? "최종 결과 확인"
        : "다음 임무로";

  return (
    <div className="aot-play-shell" data-phase={s.phase}>
      <div className="aot-bg-texture" aria-hidden="true" />

      {/* Unified Top HUD Bar */}
      <header className="aot-hud" aria-label="작전 진행 상황 및 상태 게이지">
        <div className="aot-hud-top">
          <div className="aot-hud-ep">
            <span className="aot-hud-code">
              MISSION {String(s.index + 1).padStart(2, "0")} / {missions.length}
            </span>
            <span className="aot-hud-title">{q.title}</span>
            <span className="aot-hud-location">{q.place}</span>
          </div>

          <div className="aot-hud-actions">
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="aot-icon-btn"
              aria-label={muted ? "효과음 켜기" : "효과음 음소거"}
              title={muted ? "효과음 켜기" : "효과음 음소거"}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button
              type="button"
              onClick={start}
              className="aot-icon-btn"
              aria-label="처음부터 다시하기"
              title="처음부터 다시하기"
            >
              <RotateCcw size={16} />
            </button>
            <button
              type="button"
              onClick={goHome}
              className="aot-icon-btn"
              aria-label="타이틀로 이동"
              title="타이틀로 이동"
            >
              <Home size={16} />
            </button>
          </div>
        </div>

        <div className="aot-stats-row">
          <div className="aot-stat-card">
            <div className="aot-stat-head">
              <span className="aot-stat-label aot-stat-label--survival">
                <HeartPulse size={14} aria-hidden="true" />
                생존 가능성
              </span>
              <span className="aot-stat-values">
                {s.phase === "reaction" && lastDelta && lastDelta.survival !== 0 && (
                  <span
                    className={`aot-stat-delta ${lastDelta.survival > 0 ? "pos" : "neg"}`}
                  >
                    {lastDelta.survival > 0
                      ? `+${lastDelta.survival}`
                      : lastDelta.survival}
                  </span>
                )}
                <span className="aot-stat-num">{s.survival}</span>
              </span>
            </div>
            <div
              className="aot-stat-bar"
              role="progressbar"
              aria-label="생존 가능성"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={s.survival}
            >
              <div
                className="aot-stat-fill aot-stat-fill--survival"
                style={{ width: `${s.survival}%` }}
              />
            </div>
          </div>

          <div className="aot-stat-card">
            <div className="aot-stat-head">
              <span className="aot-stat-label">
                <Shield size={14} aria-hidden="true" />
                동료 신뢰도
              </span>
              <span className="aot-stat-values">
                {s.phase === "reaction" && lastDelta && lastDelta.trust !== 0 && (
                  <span className={`aot-stat-delta ${lastDelta.trust > 0 ? "pos" : "neg"}`}>
                    {lastDelta.trust > 0 ? `+${lastDelta.trust}` : lastDelta.trust}
                  </span>
                )}
                <span className="aot-stat-num">{s.trust}</span>
              </span>
            </div>
            <div
              className="aot-stat-bar"
              role="progressbar"
              aria-label="동료 신뢰도"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={s.trust}
            >
              <div
                className="aot-stat-fill aot-stat-fill--trust"
                style={{ width: `${s.trust}%` }}
              />
            </div>
          </div>
        </div>

        <div className="aot-progress-track" aria-hidden="true">
          <div
            className="aot-progress-fill"
            style={{ width: `${Math.round(progressRatio * 100)}%` }}
          />
        </div>
      </header>

      {/* Unified Visual Novel Stage */}
      <Scene
        index={s.index}
        speaker={activeSpeaker}
        location={q.place}
        mood={isImpacting ? impactMood : stageMood}
        mode={s.phase}
        isImpacting={isImpacting}
        impactTick={impactTick}
      />

      {/* Unified Bottom Panel */}
      <section className="aot-bottom-panel" aria-live="polite">
        {s.phase === "choice" ? (
          <div className="aot-choice-box">
            <div className="aot-choice-header">
              <span className="aot-choice-kicker">DECISION · 조사병단의 결단</span>
              <p className="aot-choice-prompt">당신은 어떻게 행동할 것인가?</p>
            </div>
            <div className="aot-choices-grid" role="group" aria-label="선택지 목록">
              {q.choices.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => pick(i)}
                  className="aot-choice-btn"
                >
                  <span className="aot-choice-badge">{"ABC"[i]}</span>
                  <span className="aot-choice-label">{c.label}</span>
                  <ChevronRight size={17} className="aot-choice-arrow" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div
            role="button"
            tabIndex={0}
            onClick={next}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                next();
              }
            }}
            className="aot-dialogue-card"
            aria-label="대화 진행"
          >
            <div
              className={`aot-speaker-plate ${
                s.phase === "reaction" ? "aot-speaker-plate--reaction" : ""
              }`}
            >
              {s.phase === "reaction" ? `${activePerson.name} · 선택의 결과` : activePerson.name}
            </div>

            <p className="aot-dialogue-text">
              {typed.shown}
              {!typed.done && <span className="aot-caret">▍</span>}
            </p>

            <div className="aot-dialogue-footer">
              <div className="aot-reaction-deltas">
                {s.phase === "reaction" && lastDelta && (
                  <>
                    {lastDelta.survival !== 0 && (
                      <span
                        className={`aot-delta-pill ${lastDelta.survival > 0 ? "pos" : "neg"}`}
                      >
                        생존 가능성{" "}
                        {lastDelta.survival > 0
                          ? `+${lastDelta.survival}`
                          : lastDelta.survival}
                      </span>
                    )}
                    {lastDelta.trust !== 0 && (
                      <span
                        className={`aot-delta-pill ${lastDelta.trust > 0 ? "pos" : "neg"}`}
                      >
                        동료 신뢰도{" "}
                        {lastDelta.trust > 0 ? `+${lastDelta.trust}` : lastDelta.trust}
                      </span>
                    )}
                  </>
                )}
              </div>

              <span className="aot-next-indicator">
                {typed.done ? nextLabel : "클릭하여 스킵"}
                <ChevronRight size={16} aria-hidden="true" />
              </span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
