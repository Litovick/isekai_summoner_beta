import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  ChevronRight,
  Crown,
  Heart,
  Home,
  Play,
  RotateCcw,
  Save,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
} from "lucide-react";
import { EndingShareAndReward } from "../../components/EndingShareAndReward";
import {
  getGlobalAudioMuted,
  runWithUnlockedAudioContext,
  setGlobalAudioMuted,
  subscribeGlobalAudioMuted,
} from "../../utils/mobileAudio";
import "./styles.css";
import classroom from "../sugarsugarune_assets/backgrounds/classroom.svg";
import garden from "../sugarsugarune_assets/backgrounds/school_garden.svg";
import witchHouse from "../sugarsugarune_assets/backgrounds/witch_house.svg";
import street from "../sugarsugarune_assets/backgrounds/town_street.svg";
import darkMagic from "../sugarsugarune_assets/backgrounds/dark_magic.svg";
import palace from "../sugarsugarune_assets/backgrounds/magic_palace.svg";
import titleBackdrop from "../sugarsugarune_assets/main/title_backdrop.svg";
import pinkHeart from "../sugarsugarune_assets/items/pink_heart.svg";
import goldHeart from "../sugarsugarune_assets/items/gold_heart.svg";

import {
  stages,
  opening,
  endings,
  getEnding,
  judgeProfiles,
  characterAssessments,
  clamp,
  type Character,
  type Judge,
} from "./story";

type Phase =
  | "title"
  | "guide"
  | "opening"
  | "story"
  | "choice"
  | "reaction"
  | "ending"
  | "collection";
type Save = {
  phase: Phase;
  index: number;
  line: number;
  heart: number;
  virtue: number;
  answers: number[];
  unlocked: string[];
  muted: boolean;
};

const stageSvgBackdrops = [
  classroom,
  garden,
  garden,
  witchHouse,
  street,
  darkMagic,
  witchHouse,
  darkMagic,
  palace,
  palace,
] as const;

const validEndingIds = new Set<string>(endings.map((e) => e.id));

const initial: Save = {
  phase: "title",
  index: 0,
  line: 0,
  heart: 50,
  virtue: 50,
  answers: [],
  unlocked: [],
  muted: false,
};
const key = "isekai:sugarsugarune:v1";

export const sugarSugarRuneBackgrounds = {
  prologue: "/sugarsugarune/backgrounds/magic world.jpg",
  prologueFallback: "/sugarsugarune/backgrounds/magic world.png",
  magicKingdom: "/sugarsugarune/backgrounds/magic kingdom.png",
  witchHouse: "/sugarsugarune/backgrounds/witch house.jpg",
  bedroom: "/sugarsugarune/backgrounds/bedroom.png",
  humanStreet: "/sugarsugarune/backgrounds/human street.png",
  humanSchool: "/sugarsugarune/backgrounds/human school.jpg",
  humanSchoolFallback: "/sugarsugarune/backgrounds/human school.png",
  schoolGarden: "/sugarsugarune/backgrounds/school garden.png",
  schoolyard: "/sugarsugarune/backgrounds/schoolyard.png",
  darkMagicRoom: "/sugarsugarune/backgrounds/dark magic room.jpg",
  shadowRoom: "/sugarsugarune/backgrounds/shadow room.png",
  lastHeart: "/sugarsugarune/backgrounds/last heart.jpg",
} as const;

const chapterBackdrops = [
  sugarSugarRuneBackgrounds.humanSchool, // 01 인간계 첫 등교 (인간계 학교 교실)
  sugarSugarRuneBackgrounds.schoolGarden, // 02 첫 번째 하트 (학교 분수대 정원)
  sugarSugarRuneBackgrounds.schoolyard, // 03 쇼콜라의 승부 (학교 교정 벤치)
  sugarSugarRuneBackgrounds.bedroom, // 04 바닐라의 고민 (침실 / 방)
  sugarSugarRuneBackgrounds.humanStreet, // 05 인기를 만드는 마법 (인간계 거리)
  sugarSugarRuneBackgrounds.darkMagicRoom, // 06 피에르의 초대 (마법 보석함 / 어둠의 방)
  sugarSugarRuneBackgrounds.witchHouse, // 07 사라진 하트 (마녀의 집 외관)
  sugarSugarRuneBackgrounds.shadowRoom, // 08 검은 하트의 유혹 (검은 하트 방 / 위기 장면)
  sugarSugarRuneBackgrounds.magicKingdom, // 09 여왕 후보의 시험 (마계 여왕 알현실)
  sugarSugarRuneBackgrounds.lastHeart, // 10 마지막 하트 (최종 결전 / 엔딩)
] as const;

const openingBackdrop = sugarSugarRuneBackgrounds.prologue;
const endingBackdrop = sugarSugarRuneBackgrounds.lastHeart;

const bgCssUrl = (primary: string, fallbackSvg: string) => {
  const encoded = encodeURI(primary);
  const altPng =
    primary === sugarSugarRuneBackgrounds.prologue
      ? encodeURI(sugarSugarRuneBackgrounds.prologueFallback)
      : primary === sugarSugarRuneBackgrounds.humanSchool
        ? encodeURI(sugarSugarRuneBackgrounds.humanSchoolFallback)
        : null;
  return altPng
    ? `url('${encoded}'), url('${altPng}'), url('${fallbackSvg}')`
    : `url('${encoded}'), url('${fallbackSvg}')`;
};

const portraits: Partial<Record<Character, string>> = {
  쇼콜라: `${import.meta.env.BASE_URL}sugarsugarune/characters/chocolat.png?v=5692b8ac`,
  바닐라: `${import.meta.env.BASE_URL}sugarsugarune/characters/vanilla.png?v=167927f4`,
  피에르: `${import.meta.env.BASE_URL}sugarsugarune/characters/pierre.png?v=eb8ba196`,
  로빈: `${import.meta.env.BASE_URL}sugarsugarune/characters/robin.png?v=ac86edb4`,
};

function sound(type: "click" | "good" | "bad", muted: boolean) {
  if (muted) return;
  runWithUnlockedAudioContext((ctx) => {
    const now = ctx.currentTime + 0.002;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(type === "good" ? 880 : type === "bad" ? 260 : 600, now);
    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.145);
  });
}

function CharacterStandee({ name, active }: { name: Character; active: boolean }) {
  const img = portraits[name];
  return (
    <div
      className={`ssr-character ${active ? "ssr-character--active" : "ssr-character--idle"}`}
      data-character={name}
      data-active={active ? "true" : "false"}
    >
      <div className="ssr-character-figure">
        {img && <img src={img} alt={name} decoding="async" className="ssr-character-img" />}
      </div>
      <div className="ssr-character-plate">
        <span>{name}</span>
      </div>
    </div>
  );
}

export default function SugarSugarRuneGame() {
  const [s, setS] = useState<Save>(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const p = JSON.parse(saved) as Save;
        if (
          p &&
          p.index >= 0 &&
          p.index <= 10 &&
          Array.isArray(p.answers) &&
          Array.isArray(p.unlocked)
        ) {
          return {
            ...p,
            unlocked: p.unlocked.filter((id) => validEndingIds.has(id)),
            muted: getGlobalAudioMuted(),
          };
        }
      }
    } catch {
      // ignore corrupted save
    }
    return { ...initial, muted: getGlobalAudioMuted() };
  });

  const [showText, setShowText] = useState(0);
  const [impactTick, setImpactTick] = useState(0);
  const [isImpacting, setIsImpacting] = useState(false);
  const [impactMood, setImpactMood] = useState<"good" | "bad">("good");
  const impactTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (impactTimerRef.current !== null) {
        window.clearTimeout(impactTimerRef.current);
      }
    };
  }, []);

  useEffect(
    () =>
      subscribeGlobalAudioMuted((m) =>
        setS((p) => (p.muted === m ? p : { ...p, muted: m })),
      ),
    [],
  );

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(s));
    } catch {
      // ignore
    }
  }, [s]);

  useEffect(() => {
    setGlobalAudioMuted(s.muted);
  }, [s.muted]);

  const stage = stages[Math.min(s.index, 9)]!;
  const chosen = s.answers[s.index];
  const lines =
    s.phase === "opening"
      ? opening
      : s.phase === "story"
        ? stage.lines
        : s.phase === "reaction" && chosen !== undefined
          ? (stage.choices[chosen]?.reaction ?? [])
          : [];
  const current = lines[Math.min(s.line, Math.max(0, lines.length - 1))];

  useEffect(() => {
    setShowText(0);
    if (!current) return;
    const timer = window.setInterval(() => {
      setShowText((v) => Math.min(current.text.length, v + 2));
    }, 22);
    return () => clearInterval(timer);
  }, [current?.text, s.phase, s.index, s.line]);

  const ending = useMemo(
    () => getEnding(s.heart, s.virtue, s.answers),
    [s.heart, s.virtue, s.answers],
  );
  const isTypingDone = !current || showText >= current.text.length;

  const next = useCallback(() => {
    sound("click", s.muted);
    if (current && showText < current.text.length) {
      setShowText(current.text.length);
      return;
    }
    setS((p) => {
      if (p.line + 1 < lines.length) return { ...p, line: p.line + 1 };
      if (p.phase === "opening") return { ...p, phase: "story", line: 0 };
      if (p.phase === "story") return { ...p, phase: "choice", line: 0 };
      if (p.phase === "reaction") {
        if (p.index === 9) {
          const e = getEnding(p.heart, p.virtue, p.answers);
          return {
            ...p,
            phase: "ending",
            line: 0,
            unlocked: Array.from(new Set([...p.unlocked, e.id])),
          };
        }
        return { ...p, index: p.index + 1, phase: "story", line: 0 };
      }
      return p;
    });
  }, [s.muted, current, showText, lines.length]);

  const choose = (i: number) => {
    if (s.phase !== "choice" || s.answers[s.index] !== undefined) return;
    const c = stage.choices[i]!;
    const type: "good" | "bad" = c.heart + c.virtue >= 0 ? "good" : "bad";
    sound(type, s.muted);
    setImpactMood(type);
    setImpactTick((t) => t + 1);
    setIsImpacting(true);
    if (impactTimerRef.current !== null) {
      window.clearTimeout(impactTimerRef.current);
    }
    impactTimerRef.current = window.setTimeout(() => {
      setIsImpacting(false);
      impactTimerRef.current = null;
    }, 480);
    setS((p) => ({
      ...p,
      heart: clamp(p.heart + c.heart),
      virtue: clamp(p.virtue + c.virtue),
      answers: [...p.answers, i],
      phase: "reaction",
      line: 0,
    }));
  };

  const restart = useCallback(
    (phase: Phase = "opening") => {
      sound("click", s.muted);
      setS((p) => ({ ...initial, phase, unlocked: p.unlocked, muted: p.muted }));
    },
    [s.muted],
  );

  const resumeProgress = useCallback(() => {
    sound("click", s.muted);
    setS((p) => ({ ...p, phase: "story", line: 0 }));
  }, [s.muted]);

  // Keyboard support
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "BUTTON" || tag === "A") return;

      if (s.phase === "title") {
        e.preventDefault();
        restart("opening");
      } else if (s.phase === "opening" || s.phase === "story" || s.phase === "reaction") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [s.phase, restart, next]);

  const backdrop =
    s.phase === "title" || s.phase === "guide" || s.phase === "collection"
      ? titleBackdrop
      : s.phase === "opening"
        ? witchHouse
        : s.phase === "ending"
          ? palace
          : stageSvgBackdrops[Math.min(s.index, 9)]!;
  const sceneImage =
    s.phase === "title" ||
    s.phase === "guide" ||
    s.phase === "collection" ||
    s.phase === "opening"
      ? openingBackdrop
      : s.phase === "ending"
        ? endingBackdrop
        : chapterBackdrops[Math.min(s.index, 9)]!;
  const sceneBackgroundCss = bgCssUrl(sceneImage, backdrop);

  const hasSavedProgress = s.answers.length > 0 && s.answers.length < stages.length;

  const titleCast: Array<{ name: Judge; slotClass: string }> = [
    { name: "로빈", slotClass: "ssr-title-char--far-left" },
    { name: "쇼콜라", slotClass: "ssr-title-char--left" },
    { name: "바닐라", slotClass: "ssr-title-char--right" },
    { name: "피에르", slotClass: "ssr-title-char--far-right" },
  ];

  const isLastLine = s.line + 1 >= lines.length;
  const nextLabel =
    s.phase === "story" && isLastLine
      ? "선택지 보기"
      : s.phase === "reaction" && isLastLine
        ? s.index === 9
          ? "최종 결과 확인"
          : "다음 챕터로"
        : "계속 진행";

  const progressRatio =
    s.phase === "opening"
      ? 0.04
      : (s.index +
          (s.phase === "choice" ? 0.65 : s.phase === "reaction" ? 0.92 : 0.25)) /
        stages.length;

  const currentChoice = chosen !== undefined ? stage.choices[chosen] : undefined;

  return (
    <div className="ssr-game" data-phase={s.phase}>
      <div className="ssr-bg-texture" aria-hidden="true" />

      {/* ==================== TITLE SCREEN ==================== */}
      {s.phase === "title" && (
        <section className="ssr-title-screen" aria-label="슈가슈가룬 시작 화면">
          <div className="ssr-title-backdrop" aria-hidden="true">
            <div
              className="ssr-bg-photo"
              style={{ backgroundImage: sceneBackgroundCss }}
              data-bg-src={sceneImage}
            />
            <div className="ssr-bg-readability" />
            <div className="ssr-title-sunburst" />
            <div className="ssr-title-characters">
              {titleCast.map(({ name, slotClass }) =>
                portraits[name] ? (
                  <img
                    key={name}
                    src={portraits[name]}
                    alt={name}
                    className={`ssr-title-char ${slotClass}`}
                  />
                ) : null,
              )}
            </div>
            <div className="ssr-title-scrim" />
          </div>

          <div className="ssr-title-panel">
            <div className="ssr-title-badge-bar" aria-hidden="true" />
            <div className="ssr-title-emblem" aria-hidden="true">
              <Crown size={34} />
            </div>

            <p className="ssr-title-eyebrow">MAGIC WORLD · QUEEN&apos;S HEART TRIAL</p>
            <h1 className="ssr-title-main">
              슈가슈가룬
              <span>당신은 마녀 여왕이 될 수 있을까?</span>
            </h1>
            <p className="ssr-title-sub">
              하트를 모으고, 진심을 지켜라. 쇼콜라·바닐라·피에르·로빈과 함께하는 열 번의 마계 여왕 선발 시험!
            </p>

            <div className="ssr-title-actions">
              <button
                type="button"
                data-start="true"
                onClick={() => restart("opening")}
                className="ssr-btn-primary ssr-btn-lg"
              >
                <Play size={18} />
                여왕 시험 시작하기
              </button>

              {hasSavedProgress && (
                <button
                  type="button"
                  onClick={resumeProgress}
                  className="ssr-btn-secondary ssr-btn-lg"
                >
                  <Save size={18} />
                  이어하기 (CHAPTER {String(s.index + 1).padStart(2, "0")} / 10)
                </button>
              )}

              <div className="ssr-title-actions-row">
                <button
                  type="button"
                  onClick={() => {
                    sound("click", s.muted);
                    setS((p) => ({ ...p, phase: "collection" }));
                  }}
                  className="ssr-btn-secondary"
                >
                  <Trophy size={16} />
                  엔딩 컬렉션 ({s.unlocked.length}/{endings.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound("click", s.muted);
                    setS((p) => ({ ...p, phase: "guide" }));
                  }}
                  className="ssr-btn-ghost"
                >
                  <BookOpen size={16} />
                  게임 방법
                </button>
              </div>
            </div>

            <p className="ssr-title-hint">
              Enter 또는 Space 키로 시작 · 마법 효과음 및 자동 저장 지원
            </p>
          </div>
        </section>
      )}

      {/* ==================== GUIDE SUBVIEW ==================== */}
      {s.phase === "guide" && (
        <section className="ssr-prologue-screen" aria-label="게임 방법">
          <div className="ssr-prologue-backdrop" aria-hidden="true">
            <div className="ssr-bg-photo" style={{ backgroundImage: sceneBackgroundCss }} />
            <div className="ssr-bg-readability" />
          </div>

          <div className="ssr-prologue-card">
            <span className="ssr-prologue-kicker">QUEEN&apos;S TRIAL GUIDE · 시험 안내</span>
            <h2>마녀 여왕의 시험 안내</h2>
            <div className="ssr-guide-story">
              <p>
                당신은 쇼콜라와 바닐라와 함께 인간계로 파견된 새로운 여왕 후보입니다. 10개의
                상황마다 세 가지 선택지 중 하나를 선택하세요. 두 능력치는 0~100 사이에서 변합니다.
              </p>
              <p>
                하트와 자질 모두 80점 이상이면 진정한 마녀 여왕 해피 엔딩! 피에르의 위험한 유혹을
                끝까지 파고드는 비밀 히든 엔딩을 포함해 총 {endings.length}종의 결말과 4인의 개별
                평가를 확인할 수 있어요. 대화창을 클릭하면 다음 대사로 진행되며 자동 저장을
                지원합니다.
              </p>
            </div>

            <div className="ssr-guide-stats">
              <div className="ssr-guide-stat">
                <img src={pinkHeart} alt="" />
                <div>
                  <strong>하트 포인트 (시작 50점)</strong>
                  <p>사람들의 마음을 얻고 매력을 증명하는 능력입니다.</p>
                </div>
              </div>
              <div className="ssr-guide-stat">
                <img src={goldHeart} alt="" />
                <div>
                  <strong>마녀의 자질 (시작 50점)</strong>
                  <p>공감과 용기, 여왕으로서의 올바른 판단력을 나타냅니다.</p>
                </div>
              </div>
            </div>

            <div className="ssr-prologue-actions">
              <button
                type="button"
                onClick={() => restart("opening")}
                className="ssr-btn-primary"
              >
                시험 시작
                <ArrowRight size={17} />
              </button>
              <button
                type="button"
                onClick={() => {
                  sound("click", s.muted);
                  setS((p) => ({ ...p, phase: "title" }));
                }}
                className="ssr-btn-ghost"
              >
                <ArrowLeft size={16} />
                돌아가기
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ==================== COLLECTION SUBVIEW ==================== */}
      {s.phase === "collection" && (
        <section className="ssr-prologue-screen" aria-label="엔딩 컬렉션">
          <div className="ssr-prologue-backdrop" aria-hidden="true">
            <div className="ssr-bg-photo" style={{ backgroundImage: sceneBackgroundCss }} />
            <div className="ssr-bg-readability" />
          </div>

          <div className="ssr-prologue-card">
            <span className="ssr-prologue-kicker">MAGIC WORLD ARCHIVE · 엔딩 도감</span>
            <h2>
              엔딩 컬렉션 ({s.unlocked.length} / {endings.length})
            </h2>
            <p className="ssr-title-sub" style={{ margin: "8px 0 18px", textAlign: "left" }}>
              여왕 선발 시험에서 해금한 엔딩 기록을 확인할 수 있습니다.
            </p>

            <div className="ssr-archive-list">
              {endings.map((e) => {
                const unlocked = s.unlocked.includes(e.id);
                return (
                  <div
                    key={e.id}
                    className={`ssr-archive-item ${unlocked ? "unlocked" : ""}`}
                  >
                    <span className="ssr-archive-num">
                      ENDING 0{e.priority} · {unlocked ? `${e.icon} ${e.typeLabel}` : "🔒 미해금"}
                    </span>
                    <strong>{unlocked ? e.title : "??? 잠긴 엔딩"}</strong>
                    <small>{unlocked ? e.condition : "여왕 시험에 도전해 해금하세요."}</small>
                  </div>
                );
              })}
            </div>

            <div className="ssr-prologue-actions">
              <button
                type="button"
                onClick={() => {
                  sound("click", s.muted);
                  setS((p) => ({ ...p, phase: "title" }));
                }}
                className="ssr-btn-secondary"
              >
                <ArrowLeft size={16} />
                타이틀로 돌아가기
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ==================== GAMEPLAY SHELL ==================== */}
      {["opening", "story", "choice", "reaction"].includes(s.phase) && (
        <div className="ssr-play-shell">
          {/* Unified Top HUD Bar */}
          <header className="ssr-hud" aria-label="진행 상황 및 능력치">
            <div className="ssr-hud-top">
              <div className="ssr-hud-ep">
                <span className="ssr-hud-code">
                  {s.phase === "opening"
                    ? "PROLOGUE"
                    : `CHAPTER ${String(s.index + 1).padStart(2, "0")} / 10`}
                </span>
                <span className="ssr-hud-title">
                  {s.phase === "opening" ? "여왕 후보의 소환" : stage.title}
                </span>
                <span className="ssr-hud-location">
                  {s.phase === "opening" ? "마계" : stage.location}
                </span>
              </div>

              <div className="ssr-hud-actions">
                <button
                  type="button"
                  onClick={() => setS((p) => ({ ...p, muted: !p.muted }))}
                  className="ssr-icon-btn"
                  aria-label={s.muted ? "효과음 켜기" : "효과음 음소거"}
                  title={s.muted ? "효과음 켜기" : "효과음 음소거"}
                >
                  {s.muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button
                  type="button"
                  onClick={() => restart("opening")}
                  className="ssr-icon-btn"
                  aria-label="처음부터 다시하기"
                  title="처음부터 다시하기"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound("click", s.muted);
                    setS((p) => ({ ...p, phase: "title", line: 0 }));
                  }}
                  className="ssr-icon-btn"
                  aria-label="타이틀로 이동"
                  title="타이틀로 이동"
                >
                  <Home size={16} />
                </button>
              </div>
            </div>

            <div className="ssr-stats-row">
              <div className="ssr-stat-card">
                <div className="ssr-stat-head">
                  <span className="ssr-stat-label ssr-stat-label--heart">
                    <Heart size={14} aria-hidden="true" />
                    하트 포인트
                  </span>
                  <span className="ssr-stat-values">
                    {s.phase === "reaction" &&
                      currentChoice &&
                      currentChoice.heart !== 0 && (
                        <span
                          className={`ssr-stat-delta ${
                            currentChoice.heart > 0 ? "pos" : "neg"
                          }`}
                        >
                          {currentChoice.heart > 0
                            ? `+${currentChoice.heart}`
                            : currentChoice.heart}
                        </span>
                      )}
                    <span className="ssr-stat-num">{s.heart}</span>
                  </span>
                </div>
                <div
                  className="ssr-stat-bar"
                  role="progressbar"
                  aria-label="하트 포인트"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={s.heart}
                >
                  <div
                    className="ssr-stat-fill ssr-stat-fill--heart"
                    style={{ width: `${s.heart}%` }}
                  />
                </div>
              </div>

              <div className="ssr-stat-card">
                <div className="ssr-stat-head">
                  <span className="ssr-stat-label ssr-stat-label--virtue">
                    <Sparkles size={14} aria-hidden="true" />
                    마녀의 자질
                  </span>
                  <span className="ssr-stat-values">
                    {s.phase === "reaction" &&
                      currentChoice &&
                      currentChoice.virtue !== 0 && (
                        <span
                          className={`ssr-stat-delta ${
                            currentChoice.virtue > 0 ? "pos" : "neg"
                          }`}
                        >
                          {currentChoice.virtue > 0
                            ? `+${currentChoice.virtue}`
                            : currentChoice.virtue}
                        </span>
                      )}
                    <span className="ssr-stat-num">{s.virtue}</span>
                  </span>
                </div>
                <div
                  className="ssr-stat-bar"
                  role="progressbar"
                  aria-label="마녀의 자질"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={s.virtue}
                >
                  <div
                    className="ssr-stat-fill ssr-stat-fill--virtue"
                    style={{ width: `${s.virtue}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="ssr-progress-track" aria-hidden="true">
              <div
                className="ssr-progress-fill"
                style={{ width: `${Math.round(progressRatio * 100)}%` }}
              />
            </div>
          </header>

          {/* Unified Visual Novel Stage */}
          <div
            className={`ssr-stage ${s.phase === "choice" ? "ssr-stage--choice" : ""} ${
              isImpacting && impactMood === "bad" ? "ssr-stage--shake" : ""
            }`}
            data-impacting={isImpacting ? "true" : "false"}
            data-impact-tick={impactTick}
          >
            <div
              className="ssr-backdrop"
              role="region"
              aria-label={s.phase === "opening" ? "마계" : stage.location}
            >
              <div
                key={sceneImage}
                className="ssr-bg-photo"
                style={{ backgroundImage: sceneBackgroundCss }}
                data-bg-src={sceneImage}
                aria-hidden="true"
              />
              <div className="ssr-backdrop-vignette" aria-hidden="true" />
            </div>

            <div className="ssr-stage-badge">
              {s.phase === "opening" ? "마계 · 여왕 선발 개회" : stage.location}
            </div>

            <div className="ssr-cast" aria-label="등장인물 무대">
              {(s.phase === "opening"
                ? (["쇼콜라", "바닐라", "로빈"] as Character[])
                : stage.cast
              )
                .filter((c) => c !== "나" && c !== "내레이션")
                .map((c) => (
                  <CharacterStandee
                    key={c}
                    name={c}
                    active={s.phase !== "choice" && current?.who === c}
                  />
                ))}
            </div>

            {isImpacting && impactTick > 0 && (
              <div
                key={impactTick}
                className={`ssr-magic-fx ${impactMood === "bad" ? "ssr-magic-fx--bad" : ""}`}
                aria-hidden="true"
              />
            )}
          </div>

          {/* Unified Bottom Panel */}
          <section className="ssr-bottom-panel" aria-live="polite">
            {s.phase === "choice" ? (
              <div className="ssr-choice-box">
                <div className="ssr-choice-header">
                  <span className="ssr-choice-kicker">DECISION · 여왕 후보의 선택</span>
                  <p className="ssr-choice-prompt">{stage.prompt}</p>
                </div>
                <div className="ssr-choices-grid" role="group" aria-label="선택지 목록">
                  {stage.choices.map((c, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => choose(i)}
                      className="ssr-choice-btn"
                    >
                      <span className="ssr-choice-badge">{String.fromCharCode(65 + i)}</span>
                      <span className="ssr-choice-label">{c.text}</span>
                      <ChevronRight
                        size={17}
                        className="ssr-choice-arrow"
                        aria-hidden="true"
                      />
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
                className="ssr-dialogue-card"
                aria-label="대화 진행"
              >
                <div
                  className={`ssr-speaker-plate ${
                    current?.who === "내레이션" ? "ssr-speaker-plate--narrator" : ""
                  }`}
                >
                  {current?.who === "내레이션" ? "내레이션" : current?.who}
                </div>

                <p
                  className={`ssr-dialogue-text ${
                    current?.who === "내레이션" ? "ssr-dialogue-text--narrator" : ""
                  }`}
                >
                  {current?.who === "내레이션"
                    ? current.text.slice(0, showText)
                    : `“${current?.text.slice(0, showText) ?? ""}”`}
                  {!isTypingDone && <span className="ssr-caret">▍</span>}
                </p>

                <div className="ssr-dialogue-footer">
                  <div className="ssr-reaction-deltas">
                    {s.phase === "reaction" && currentChoice && (
                      <>
                        {currentChoice.heart !== 0 && (
                          <span
                            className={`ssr-delta-pill ${
                              currentChoice.heart > 0 ? "pos" : "neg"
                            }`}
                          >
                            하트{" "}
                            {currentChoice.heart > 0
                              ? `+${currentChoice.heart}`
                              : currentChoice.heart}
                          </span>
                        )}
                        {currentChoice.virtue !== 0 && (
                          <span
                            className={`ssr-delta-pill ${
                              currentChoice.virtue > 0 ? "pos" : "neg"
                            }`}
                          >
                            자질{" "}
                            {currentChoice.virtue > 0
                              ? `+${currentChoice.virtue}`
                              : currentChoice.virtue}
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  <span className="ssr-next-indicator">
                    {isTypingDone ? nextLabel : "클릭하여 스킵"}
                    <ChevronRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* ==================== ENDING / RESULT SCREEN ==================== */}
      {s.phase === "ending" && (
        <section className="ssr-result-screen" aria-label="최종 시험 결과 및 캐릭터 평가">
          <div className="ssr-ending-hero">
            <div className="ssr-ending-badge-row">
              <div className="ssr-ending-type-group">
                <span className={`ssr-ending-type-badge ssr-ending-type--${ending.type}`}>
                  {ending.icon} {ending.typeLabel}
                </span>
                <span className="ssr-ending-kicker">QUEEN&apos;S TRIAL REPORT · 최종 여왕 선발 보고</span>
              </div>
              <span className="ssr-ending-cond">{ending.condition}</span>
            </div>

            <h1 className="ssr-ending-title">
              {ending.icon} {ending.title}
            </h1>
            <p className="ssr-ending-subtitle">{ending.subtitle}</p>

            <div className="ssr-ending-visual">
              <div
                className="ssr-bg-photo"
                style={{ backgroundImage: bgCssUrl(endingBackdrop, palace) }}
                data-bg-src={endingBackdrop}
                aria-hidden="true"
              />
              <div className="ssr-bg-readability" aria-hidden="true" />
              <div className="ssr-ending-ensemble" aria-label="마계 여왕 시험 주요 인물">
                {(["로빈", "쇼콜라", "바닐라", "피에르"] as Judge[]).map((name, idx) =>
                  portraits[name] ? (
                    <div
                      key={name}
                      className={`ssr-ending-member ${
                        idx === 1 || idx === 2 ? "ssr-ending-member--lead" : ""
                      }`}
                    >
                      <img src={portraits[name]} alt={name} className="ssr-ending-member-img" />
                    </div>
                  ) : null,
                )}
              </div>
              <div className="ssr-ending-scrim" aria-hidden="true" />
              <div className="ssr-ending-banner-mark" aria-hidden="true">
                <span>
                  {ending.typeLabel} · ENDING 0{ending.priority}
                </span>
                <strong>{ending.title}</strong>
              </div>
            </div>

            <p className="ssr-ending-narration">{ending.narration}</p>

            <div className="ssr-ending-quote-box">
              {portraits[ending.speaker] && (
                <div className="ssr-ending-quote-portrait">
                  <img src={portraits[ending.speaker]} alt={ending.speaker} />
                </div>
              )}
              <div className="ssr-ending-quote-copy">
                <div className="ssr-ending-quote-speaker">
                  <strong>{ending.speaker}</strong>
                  <span>{judgeProfiles[ending.speaker].role} · 최종 판정</span>
                </div>
                <blockquote>“{ending.description}”</blockquote>
              </div>
            </div>

            <div className="ssr-final-stats">
              <div className="ssr-final-stat">
                <img src={pinkHeart} alt="" />
                <span>하트 포인트</span>
                <b>{s.heart}</b>
              </div>
              <div className="ssr-final-stat">
                <img src={goldHeart} alt="" />
                <span>마녀의 자질</span>
                <b>{s.virtue}</b>
              </div>
            </div>
          </div>

          {/* Character Evaluations */}
          <div className="ssr-eval-section">
            <div className="ssr-eval-header">
              <span className="ssr-eval-kicker">MAGIC WORLD EVALUATION · 4인의 최종 평가</span>
              <h2>쇼콜라·바닐라·피에르·로빈의 개별 평가</h2>
              <p>당신이 10개 챕터에서 내린 선택을 각 캐릭터의 관점으로 평가했습니다.</p>
            </div>

            <div className="ssr-eval-grid">
              {characterAssessments(s.answers).map((r) => (
                <article key={r.name} className="ssr-eval-card">
                  <div className="ssr-eval-stage">
                    {portraits[r.name] && (
                      <img
                        src={portraits[r.name]}
                        alt={r.name}
                        className="ssr-eval-portrait"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="ssr-eval-body">
                    <div className="ssr-eval-top">
                      <h3 className="ssr-eval-name">{r.name}</h3>
                      <span className={`ssr-grade-badge ssr-grade-${r.grade}`}>
                        {r.grade}등급
                      </span>
                    </div>
                    <div className="ssr-eval-score-row">
                      <span>{r.focus}</span>
                      <b className="ssr-eval-score">{r.score} / 100</b>
                    </div>
                    <div
                      className="ssr-eval-bar"
                      role="progressbar"
                      aria-label={`${r.name} 평가 점수`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={r.score}
                    >
                      <i style={{ width: `${r.score}%` }} />
                    </div>
                    <p className="ssr-eval-comment">“{r.comment}”</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Ending Archive */}
          <div className="ssr-archive-strip" aria-label="엔딩 달성 현황">
            <div className="ssr-archive-head">
              <Award size={18} aria-hidden="true" />
              <strong>
                여왕 선발 엔딩 도감 (
                {Array.from(new Set([...s.unlocked, ending.id])).length} / {endings.length} 해금)
              </strong>
            </div>
            <div className="ssr-archive-list">
              {endings.map((e) => {
                const unlocked = s.unlocked.includes(e.id) || e.id === ending.id;
                const active = e.id === ending.id;
                return (
                  <div
                    key={e.id}
                    className={`ssr-archive-item ${unlocked ? "unlocked" : ""} ${
                      active ? "current" : ""
                    }`}
                  >
                    <span className="ssr-archive-num">
                      ENDING 0{e.priority} · {unlocked ? `${e.icon} ${e.typeLabel}` : "🔒 미해금"}
                    </span>
                    <strong>{unlocked ? e.title : "??? 미해금 엔딩"}</strong>
                    <small>{unlocked ? e.condition : "다른 선택으로 해금"}</small>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="ssr-result-actions">
            <button
              type="button"
              onClick={() => restart("opening")}
              className="ssr-btn-primary ssr-btn-lg"
            >
              <RotateCcw size={18} />
              다시 도전하기
            </button>
            <button
              type="button"
              onClick={() => {
                sound("click", s.muted);
                setS((p) => ({ ...p, phase: "title", line: 0 }));
              }}
              className="ssr-btn-secondary ssr-btn-lg"
            >
              <Home size={18} />
              타이틀로 돌아가기
            </button>
          </div>

          <EndingShareAndReward
            gameId="sugarsugarrune"
            animeTitle="슈가슈가룬"
            endingTitle={ending.title}
          />
        </section>
      )}
    </div>
  );
}
