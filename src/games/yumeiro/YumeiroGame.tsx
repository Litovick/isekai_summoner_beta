import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Award,
  ChefHat,
  ChevronRight,
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
import {
  stages,
  clamp,
  dessertOf,
  endingOf,
  type Dessert,
  type YumeiroEndingId,
} from "./story";
import cover from "../../assets/anime/17_yumeiro.webp";
import {
  characterArt,
  sceneArt,
  dessertArt,
  titleBackground,
  endingBackground,
} from "./art";
import { EndingShareAndReward } from "../../components/EndingShareAndReward";
import {
  getGlobalAudioMuted,
  runWithUnlockedAudioContext,
  setGlobalAudioMuted,
  subscribeGlobalAudioMuted,
} from "../../utils/mobileAudio";
import {
  preloadImagesInBackground,
  preloadPriorityImages,
} from "../../utils/imagePreloader";
import "./styles.css";

type SaveData = {
  step: number;
  skill: number;
  team: number;
  history: number[];
  phase: "intro" | "choose" | "reaction" | "end";
  last: number;
};

const initial: SaveData = {
  step: 0,
  skill: 50,
  team: 50,
  history: [],
  phase: "intro",
  last: 0,
};

const KEY = "isekai-yumeiro-v1";
const COLLECTION_KEY = "isekai-yumeiro-collection-v1";

const desserts: Record<Dessert, { name: string; icon: string; desc: string }> = {
  strawberry: {
    name: "딸기 타르트",
    icon: "🍓",
    desc: "친구들의 마음을 담은 부드러운 달콤함",
  },
  chocolate: {
    name: "초콜릿 케이크",
    icon: "🍫",
    desc: "섬세한 기술로 완성한 깊은 풍미",
  },
  creative: {
    name: "미라클 창작 디저트",
    icon: "🍰",
    desc: "요정의 영감과 상상력을 담은 단 하나의 맛",
  },
};

const END_ORDER: YumeiroEndingId[] = ["hidden", "happy", "normal", "sad"];

const END_COPY: Record<
  YumeiroEndingId,
  {
    type: YumeiroEndingId;
    typeLabel: string;
    icon: string;
    priority: number;
    condition: string;
    title: string;
    desc: string;
    narration: string;
    speaker: string;
    speakerRole: string;
    comment: string;
  }
> = {
  hidden: {
    type: "hidden",
    typeLabel: "히든 엔딩",
    icon: "👑",
    priority: 1,
    condition: "실력 80↑ · 팀워크 80↑ + 미라클 창작 3분기 달성",
    title: "황금빛 미라클 레시피 · 전설의 스위트 여왕",
    desc: "세인트 마리 역사에 남을 기적의 디저트! 요정과 A그룹이 함께 빚어 낸 완벽한 전설",
    narration:
      "바닐라의 영감에서 시작된 허브 크림, 서로진의 빛을 머금은 설탕 베일, 그리고 결승 무대에서 피어난 미라클 피날레까지—심사위원 전원이 기립 박수를 보냅니다. 스위트 왕국에서도 전설로 회자될 새로운 명작이 오늘 당신의 손끝에서 탄생했습니다.",
    speaker: "바닐라",
    speakerRole: "스위트 왕국 · 스위트 요정",
    comment: "해냈어! 인간과 요정의 꿈이 하나 된 최고의 기적이야! 넌 진정한 스위트 여왕이야!",
  },
  happy: {
    type: "happy",
    typeLabel: "해피 엔딩",
    icon: "🏆",
    priority: 2,
    condition: "제과 실력 75↑ · 팀워크 75↑ 달성",
    title: "꿈을 담은 최고의 디저트",
    desc: "스위트 콘테스트 그랑프리 우승! A그룹의 땀과 우정이 빚어 낸 가장 달콤한 결실",
    narration:
      "오븐의 열기 속에서 밤늦도록 다듬어 온 기술과 동료들을 향한 믿음이 완벽한 하모니를 이루었습니다. 트로피를 들어 올리는 순간, 감딸기의 환한 웃음과 스위트 왕자들의 자부심 어린 박수가 콘테스트 무대를 가득 채웁니다.",
    speaker: "원가온",
    speakerRole: "초콜릿의 귀공자 · A그룹",
    comment: "…제법인데. 실력도 팀워크도 흠잡을 데 없다. 다음엔 파리 본선에서 나와 정면으로 겨뤄 보자.",
  },
  normal: {
    type: "normal",
    typeLabel: "노멀 엔딩",
    icon: "✨",
    priority: 3,
    condition: "제과 실력 45↑ · 팀워크 45↑ 달성",
    title: "아직 끝나지 않은 꿈",
    desc: "우승 트로피는 한 끗 차로 놓쳤지만, 모두가 기억한 너만의 색깔과 가능성",
    narration:
      "완벽함에는 아직 작은 여백이 남았지만, 심사위원들은 당신의 접시에서 반짝이는 잠재력을 읽어 냈습니다. 콘테스트가 끝난 뒤 실습실에 남은 A그룹은 다음 대회를 향해 다시 앞치마 끈을 단단히 묶습니다.",
    speaker: "안도하",
    speakerRole: "화과자의 달인 · A그룹",
    comment: "오늘 배운 균형과 아쉬움을 잊지 않으면, 다음 무대에서는 분명 가장 빛나는 디저트를 만들 거야.",
  },
  sad: {
    type: "sad",
    typeLabel: "새드 엔딩",
    icon: "🥀",
    priority: 4,
    condition: "제과 실력 45 미만 또는 팀워크 45 미만",
    title: "식어 버린 오븐, 남겨진 눈물",
    desc: "조급함과 엇갈린 마음 끝에 무너진 디저트, 씁쓸하지만 잊지 못할 첫 교훈",
    narration:
      "결승 타이머가 멈추는 순간, 균형을 잃은 크림과 엇갈린 호흡이 접시 위에 고스란히 남고 말았습니다. 조명이 꺼진 실습실의 식어 가는 오븐 앞에서, 감딸기가 조용히 당신의 손을 잡으며 다시 일어서자고 속삭입니다.",
    speaker: "감딸기",
    speakerRole: "세인트 마리 학원 · A그룹",
    comment: "괜찮아, 울지 마… 실패한 맛도 파티시엘에겐 소중한 레시피래. 내일부터 처음부터 다시 도전하자!",
  },
};

const CHARACTER_ROLES: Record<string, string> = {
  감딸기: "세인트 마리 학원 · 파티시엘 지망생",
  원가온: "초콜릿의 귀공자 · A그룹",
  안도하: "화과자의 달인 · A그룹",
  서로진: "슈가 아트 천재 · A그룹",
  바닐라: "스위트 왕국 · 스위트 요정",
};

function buildCharacterReviews(skill: number, team: number, dessert: Dessert) {
  return [
    {
      name: "감딸기",
      role: CHARACTER_ROLES["감딸기"]!,
      comment:
        team >= 75
          ? "함께 만들면서 정말 즐거웠어! 네가 있어서 끝까지 웃을 수 있었어!"
          : "조금 아쉬웠지만 같이 연습한 시간은 정말 소중했어! 다음엔 꼭 더 맛있게 만들자!",
    },
    {
      name: "원가온",
      role: CHARACTER_ROLES["원가온"]!,
      comment:
        skill >= 75
          ? "기본기와 완성도 모두 합격점이다. …제법인데, 다음엔 나와 제대로 승부하자."
          : "계량과 공정의 정교함이 아직 부족해. 하지만 끈기만큼은 인정해 주지.",
    },
    {
      name: "안도하",
      role: CHARACTER_ROLES["안도하"]!,
      comment:
        team >= 60
          ? "동료들의 의견을 조율하는 모습이 인상적이었어. 좋은 팀을 만들 줄 아는구나."
          : "혼자 끌어안지 말고 주변을 조금만 더 믿어 봐. 함께할 때 맛이 깊어져.",
    },
    {
      name: "서로진",
      role: CHARACTER_ROLES["서로진"]!,
      comment:
        dessert === "creative" || skill >= 70
          ? "플레이팅과 감각이 눈부시게 우아했어. 너만의 개성이 확실히 전해졌는걸?"
          : "맛만큼이나 첫인상도 중요해. 다음엔 네 상상력을 조금 더 과감하게 담아 봐.",
    },
  ];
}

function playYumeiroSfx(type: "click" | "good" | "bad", muted: boolean) {
  if (muted) return;
  runWithUnlockedAudioContext((ctx) => {
    const now = ctx.currentTime + 0.002;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(type === "good" ? 880 : type === "bad" ? 310 : 640, now);
    gain.gain.setValueAtTime(0.035, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.14);
  });
}

function load(): SaveData {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "null");
    if (
      v &&
      Number.isInteger(v.step) &&
      v.step >= 0 &&
      v.step < stages.length &&
      Array.isArray(v.history) &&
      ["intro", "choose", "reaction", "end"].includes(v.phase)
    ) {
      return v;
    }
  } catch {
    // ignore corrupted save
  }
  return initial;
}

function loadUnlocked(): YumeiroEndingId[] {
  try {
    const raw = JSON.parse(localStorage.getItem(COLLECTION_KEY) || "[]");
    if (Array.isArray(raw)) {
      return raw.filter((x): x is YumeiroEndingId => END_ORDER.includes(x as YumeiroEndingId));
    }
  } catch {
    // ignore
  }
  return [];
}

export default function YumeiroGame() {
  const [game, setGame] = useState<SaveData>(load);
  const [started, setStarted] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [unlocked, setUnlocked] = useState<YumeiroEndingId[]>(loadUnlocked);
  const [visible, setVisible] = useState(0);
  const [muted, setMuted] = useState<boolean>(() => getGlobalAudioMuted());
  const [impactTick, setImpactTick] = useState(0);
  const [isImpacting, setIsImpacting] = useState(false);
  const [impactMood, setImpactMood] = useState<"good" | "bad">("good");
  const impactTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return preloadImagesInBackground([
      titleBackground,
      endingBackground,
      ...sceneArt,
      ...Object.values(characterArt),
      ...Object.values(dessertArt),
    ]);
  }, []);

  useEffect(() => {
    preloadPriorityImages([
      sceneArt[game.step],
      sceneArt[game.step + 1] ?? endingBackground,
    ]);
  }, [game.step, game.phase]);

  useEffect(() => {
    return () => {
      if (impactTimerRef.current !== null) {
        window.clearTimeout(impactTimerRef.current);
      }
    };
  }, []);

  useEffect(() => subscribeGlobalAudioMuted(setMuted), []);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    setGlobalAudioMuted(next);
  };

  const scene = stages[Math.min(game.step, stages.length - 1)]!;
  const speakerName =
    game.phase === "reaction" ? scene.choices[game.last]!.speaker : scene.speaker;
  const result: YumeiroEndingId | null =
    game.phase === "end" ? endingOf(game.skill, game.team, game.history) : null;
  const dessert = dessertOf(game.history);
  const grade =
    result === "hidden"
      ? "전설의 미라클"
      : game.skill >= 75 && game.team >= 75
        ? "완벽"
        : game.skill < 45 || game.team < 45
          ? "미완성"
          : "정성 가득";

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(game));
    } catch {
      // ignore
    }
  }, [game]);

  useEffect(() => {
    if (!result) return;
    setUnlocked((prev) => {
      if (prev.includes(result)) return prev;
      const next = [...prev, result];
      try {
        localStorage.setItem(COLLECTION_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, [result]);

  const spoken =
    game.phase === "reaction" ? scene.choices[game.last]!.response : scene.dialogue;

  useEffect(() => {
    setVisible(0);
    if (!started || game.phase === "end" || game.phase === "choose") return;
    const timer = window.setInterval(() => {
      setVisible((v) => Math.min(spoken.length, v + 2));
    }, 24);
    return () => clearInterval(timer);
  }, [game.step, game.phase, game.last, started, spoken]);

  const complete = visible >= spoken.length;

  const choose = (index: number) => {
    if (game.phase !== "choose") return;
    const option = scene.choices[index]!;
    const isGood = option.skill + option.team >= 0;
    playYumeiroSfx(isGood ? "good" : "bad", muted);
    setImpactMood(isGood ? "good" : "bad");
    setImpactTick((t) => t + 1);
    setIsImpacting(true);
    if (impactTimerRef.current !== null) {
      window.clearTimeout(impactTimerRef.current);
    }
    impactTimerRef.current = window.setTimeout(() => {
      setIsImpacting(false);
      impactTimerRef.current = null;
    }, 460);
    setGame((g) => ({
      ...g,
      skill: clamp(g.skill + option.skill),
      team: clamp(g.team + option.team),
      history: [...g.history, index],
      last: index,
      phase: "reaction",
    }));
  };

  const handleDialogueClick = useCallback(() => {
    if (!started || game.phase === "choose" || game.phase === "end") return;
    playYumeiroSfx("click", muted);
    if (!complete) {
      setVisible(spoken.length);
      return;
    }
    if (game.phase === "intro") {
      setGame((g) => ({ ...g, phase: "choose" }));
      return;
    }
    if (game.phase === "reaction") {
      setGame((g) =>
        g.step === stages.length - 1
          ? { ...g, phase: "end" }
          : { ...g, step: g.step + 1, phase: "intro", last: 0 },
      );
    }
  }, [started, game.phase, muted, complete, spoken.length]);

  const startFresh = useCallback(() => {
    playYumeiroSfx("click", muted);
    setShowCollection(false);
    setGame(initial);
    setStarted(true);
  }, [muted]);

  const resumeSaved = useCallback(() => {
    playYumeiroSfx("click", muted);
    setShowCollection(false);
    setStarted(true);
  }, [muted]);

  const goTitle = useCallback(() => {
    playYumeiroSfx("click", muted);
    setShowCollection(false);
    setStarted(false);
  }, [muted]);

  // Keyboard support
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "BUTTON" || tag === "A") return;

      if (!started && !showCollection) {
        e.preventDefault();
        startFresh();
      } else if (started && (game.phase === "intro" || game.phase === "reaction")) {
        e.preventDefault();
        handleDialogueClick();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [started, showCollection, game.phase, startFresh, handleDialogueClick]);

  const hasSavedProgress =
    (game.history.length > 0 || game.step > 0) && game.phase !== "end";

  const titleCast: Array<{ name: string; slotClass: string }> = [
    { name: "서로진", slotClass: "ym-title-char--far-left" },
    { name: "감딸기", slotClass: "ym-title-char--left" },
    { name: "원가온", slotClass: "ym-title-char--right" },
    { name: "안도하", slotClass: "ym-title-char--far-right" },
  ];

  const currentChoice = scene.choices[game.last];
  const progressRatio =
    (game.step + (game.phase === "choose" ? 0.65 : game.phase === "reaction" ? 0.92 : 0.25)) /
    stages.length;

  return (
    <main className="yumeiro" data-phase={!started ? "title" : game.phase}>
      <div className="ym-bg-texture" aria-hidden="true" />

      {/* ==================== COLLECTION SUBVIEW ==================== */}
      {!started && showCollection && (
        <section className="ym-prologue-screen" aria-label="엔딩 컬렉션">
          <div className="ym-prologue-backdrop" aria-hidden="true">
            <div
              className="ym-bg-photo"
              style={{ backgroundImage: `url('${encodeURI(titleBackground)}')` }}
            />
            <div className="ym-bg-readability" />
          </div>

          <div className="ym-prologue-card">
            <span className="ym-prologue-kicker">SAINT MARIE ARCHIVE · 엔딩 도감</span>
            <h2>
              스위트 콘테스트 엔딩 도감 ({unlocked.length} / {END_ORDER.length})
            </h2>
            <p className="ym-title-sub" style={{ margin: "8px 0 18px", textAlign: "left" }}>
              세인트 마리 학원에서의 10가지 제과 선택을 통해 해금된 콘테스트 결말입니다.
            </p>

            <div className="ym-archive-list">
              {END_ORDER.map((eid) => {
                const info = END_COPY[eid];
                const isUnlocked = unlocked.includes(eid);
                return (
                  <div
                    key={eid}
                    className={`ym-archive-item ${isUnlocked ? "unlocked" : ""}`}
                  >
                    <span className="ym-archive-num">
                      ENDING 0{info.priority} · {isUnlocked ? `${info.icon} ${info.typeLabel}` : "🔒 미해금"}
                    </span>
                    <strong>{isUnlocked ? info.title : "??? 미해금 엔딩"}</strong>
                    <small>{isUnlocked ? info.condition : "콘테스트에 도전해 해금하세요."}</small>
                  </div>
                );
              })}
            </div>

            <div className="ym-prologue-actions">
              <button
                type="button"
                onClick={() => {
                  playYumeiroSfx("click", muted);
                  setShowCollection(false);
                }}
                className="ym-btn-secondary"
              >
                <ArrowLeft size={16} />
                타이틀로 돌아가기
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ==================== TITLE SCREEN ==================== */}
      {!started && !showCollection && (
        <section className="ym-title-screen" aria-label="꿈빛 파티시엘 시작 화면">
          <div className="ym-title-backdrop" aria-hidden="true">
            <div
              className="ym-bg-photo"
              style={{ backgroundImage: `url('${encodeURI(titleBackground)}')` }}
              data-bg-src={titleBackground}
            />
            <div className="ym-bg-readability" />
            <div className="ym-title-sunburst" />
            <div className="ym-title-characters">
              {titleCast.map(({ name, slotClass }) =>
                characterArt[name] ? (
                  <img
                    key={name}
                    src={characterArt[name]}
                    alt={name}
                    decoding="async"
                    className={`ym-title-char ${slotClass}`}
                  />
                ) : null,
              )}
            </div>
            <div className="ym-title-scrim" />
          </div>

          <div className="ym-title-panel">
            <div className="ym-title-badge-bar" aria-hidden="true" />
            <div className="ym-title-emblem" aria-hidden="true">
              <ChefHat size={34} />
            </div>

            <p className="ym-title-eyebrow">SAINT MARIE ACADEMY · SWEET CHALLENGE</p>
            <h1 className="ym-title-main">
              꿈빛 파티시엘
              <span>세인트 마리 · 스위트 그랑프리 도전기</span>
            </h1>
            <p className="ym-title-sub">
              감딸기, 그리고 스위트 왕자들과 함께 10가지 제과 실습과 위기를 돌파해 세상에서 하나뿐인 디저트를 완성하세요!
            </p>

            <div className="ym-title-actions">
              <button
                type="button"
                data-start="true"
                onClick={startFresh}
                className="ym-btn-primary ym-btn-lg"
              >
                <Play size={18} />
                새 게임 시작하기
              </button>

              {hasSavedProgress && (
                <button
                  type="button"
                  onClick={resumeSaved}
                  className="ym-btn-secondary ym-btn-lg"
                >
                  <Save size={18} />
                  이어하기 (EP {String(game.step + 1).padStart(2, "0")} / 10)
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  playYumeiroSfx("click", muted);
                  setShowCollection(true);
                }}
                className="ym-btn-ghost"
              >
                <Trophy size={16} />
                엔딩 도감 ({unlocked.length} / {END_ORDER.length} 해금)
              </button>
            </div>

            <p className="ym-title-hint">
              Enter 또는 Space 키로 시작 · 스위트 효과음 및 자동 저장 지원
            </p>
          </div>
        </section>
      )}

      {/* ==================== ENDING / RESULT SCREEN ==================== */}
      {started && result && (
        <section className="ym-result-screen" aria-label="최종 콘테스트 결과 및 동료 평가">
          <div className="ym-ending-hero">
            <div className="ym-ending-badge-row">
              <div className="ym-ending-type-group">
                <span className={`ym-ending-type-badge ym-ending-type--${END_COPY[result].type}`}>
                  {END_COPY[result].icon} {END_COPY[result].typeLabel}
                </span>
                <span className="ym-ending-kicker">SAINT MARIE CONTEST · 최종 심사 결과</span>
              </div>
              <span className="ym-ending-cond">
                {grade} · {desserts[dessert].icon} {desserts[dessert].name}
              </span>
            </div>

            <h1 className="ym-ending-title">{END_COPY[result].title}</h1>
            <p className="ym-ending-subtitle">{END_COPY[result].desc}</p>

            <div className="ym-ending-visual">
              <div
                className="ym-bg-photo"
                style={{ backgroundImage: `url('${encodeURI(endingBackground)}')` }}
                data-bg-src={endingBackground}
                aria-hidden="true"
              />
              <div className="ym-bg-readability" aria-hidden="true" />
              <div className="ym-ending-ensemble" aria-label="세인트 마리 주요 인물">
                {["서로진", "감딸기", "원가온", "안도하"].map((name, idx) =>
                  characterArt[name] ? (
                    <div
                      key={name}
                      className={`ym-ending-member ${
                        idx === 1 || idx === 2 ? "ym-ending-member--lead" : ""
                      }`}
                    >
                      <img
                        src={characterArt[name]}
                        alt={name}
                        decoding="async"
                        className="ym-ending-member-img"
                      />
                    </div>
                  ) : null,
                )}
              </div>
              <div className="ym-ending-scrim" aria-hidden="true" />
              <div className="ym-ending-banner-mark" aria-hidden="true">
                <span>
                  {END_COPY[result].typeLabel} · ENDING 0{END_COPY[result].priority}
                </span>
                <strong>{END_COPY[result].title}</strong>
              </div>
            </div>

            <p className="ym-ending-narration">{END_COPY[result].narration}</p>

            {/* Completed Signature Dessert Card */}
            <div className="ym-dessert-showcase">
              <div className="ym-dessert-thumb">
                <img
                  src={dessertArt[dessert]}
                  alt={`${desserts[dessert].name} 디저트 일러스트`}
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = cover;
                  }}
                />
              </div>
              <div className="ym-dessert-copy">
                <span className="ym-dessert-kicker">SIGNATURE DESSERT · 완성된 작품</span>
                <h3>
                  {desserts[dessert].icon} {grade} · {desserts[dessert].name}
                </h3>
                <p>{desserts[dessert].desc}</p>
              </div>
            </div>

            {/* Lead Quote */}
            <div className="ym-ending-quote-box">
              {characterArt[END_COPY[result].speaker] && (
                <div className="ym-ending-quote-portrait">
                  <img
                    src={characterArt[END_COPY[result].speaker]}
                    alt={END_COPY[result].speaker}
                    decoding="async"
                  />
                </div>
              )}
              <div className="ym-ending-quote-copy">
                <div className="ym-ending-quote-speaker">
                  <strong>{END_COPY[result].speaker}</strong>
                  <span>{END_COPY[result].speakerRole}</span>
                </div>
                <blockquote>“{END_COPY[result].comment}”</blockquote>
              </div>
            </div>

            {/* Final Stats */}
            <div className="ym-final-stats">
              <div className="ym-final-stat ym-final-stat--skill">
                <ChefHat size={19} aria-hidden="true" />
                <span>제과 실력</span>
                <b>{game.skill}</b>
              </div>
              <div className="ym-final-stat ym-final-stat--team">
                <Heart size={19} aria-hidden="true" />
                <span>팀워크</span>
                <b>{game.team}</b>
              </div>
            </div>
          </div>

          {/* Character Evaluations */}
          <div className="ym-eval-section">
            <div className="ym-eval-header">
              <span className="ym-eval-kicker">GROUP A EVALUATION · A그룹 동료 평가</span>
              <h2>감딸기와 스위트 왕자들의 개별 평가</h2>
              <p>
                10번의 제과 실습과 콘테스트에서 당신이 보여 준 실력과 팀워크를 A그룹 멤버들이 평가했습니다.
              </p>
            </div>

            <div className="ym-eval-grid">
              {buildCharacterReviews(game.skill, game.team, dessert).map((ev) => (
                <article key={ev.name} className="ym-eval-card">
                  <div className="ym-eval-stage">
                    {characterArt[ev.name] && (
                      <img
                        src={characterArt[ev.name]}
                        alt={ev.name}
                        className="ym-eval-portrait"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                  <div className="ym-eval-body">
                    <span className="ym-eval-role">{ev.role}</span>
                    <h3 className="ym-eval-name">{ev.name}</h3>
                    <p className="ym-eval-comment">“{ev.comment}”</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Ending Archive */}
          <div className="ym-archive-strip" aria-label="엔딩 달성 현황">
            <div className="ym-archive-head">
              <Award size={18} aria-hidden="true" />
              <strong>
                스위트 콘테스트 엔딩 도감 (
                {Array.from(new Set([...unlocked, result])).length} / {END_ORDER.length} 해금)
              </strong>
            </div>
            <div className="ym-archive-list">
              {END_ORDER.map((eid) => {
                const info = END_COPY[eid];
                const isUnlocked = unlocked.includes(eid) || eid === result;
                const active = eid === result;
                return (
                  <div
                    key={eid}
                    className={`ym-archive-item ${isUnlocked ? "unlocked" : ""} ${
                      active ? "current" : ""
                    }`}
                  >
                    <span className="ym-archive-num">
                      ENDING 0{info.priority} · {isUnlocked ? `${info.icon} ${info.typeLabel}` : "🔒 미해금"}
                    </span>
                    <strong>{isUnlocked ? info.title : "??? 미해금 엔딩"}</strong>
                    <small>{isUnlocked ? info.condition : "다른 선택으로 해금"}</small>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="ym-result-actions">
            <button type="button" onClick={startFresh} className="ym-btn-primary ym-btn-lg">
              <RotateCcw size={18} />
              다시 도전하기
            </button>
            <button type="button" onClick={goTitle} className="ym-btn-secondary ym-btn-lg">
              <Home size={18} />
              타이틀로 돌아가기
            </button>
          </div>

          <EndingShareAndReward
            gameId="yumeiro"
            animeTitle="꿈빛 파티시엘"
            endingTitle={END_COPY[result].title}
          />
        </section>
      )}

      {/* ==================== GAMEPLAY SHELL ==================== */}
      {started && !result && (
        <div className="ym-play-shell">
          {/* Unified Top HUD Bar */}
          <header className="ym-hud" aria-label="진행 상황 및 능력치">
            <div className="ym-hud-top">
              <div className="ym-hud-ep">
                <span className="ym-hud-code">
                  EPISODE {String(game.step + 1).padStart(2, "0")} / {stages.length}
                </span>
                <span className="ym-hud-title">{scene.title}</span>
                <span className="ym-hud-location">{scene.location}</span>
              </div>

              <div className="ym-hud-actions">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="ym-icon-btn"
                  aria-label={muted ? "효과음 켜기" : "효과음 음소거"}
                  title={muted ? "효과음 켜기" : "효과음 음소거"}
                >
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button
                  type="button"
                  onClick={startFresh}
                  className="ym-icon-btn"
                  aria-label="처음부터 다시하기"
                  title="처음부터 다시하기"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  type="button"
                  onClick={goTitle}
                  className="ym-icon-btn"
                  aria-label="타이틀로 이동"
                  title="타이틀로 이동"
                >
                  <Home size={16} />
                </button>
              </div>
            </div>

            <div className="ym-stats-row">
              <div className="ym-stat-card">
                <div className="ym-stat-head">
                  <span className="ym-stat-label ym-stat-label--skill">
                    <ChefHat size={14} aria-hidden="true" />
                    제과 실력
                  </span>
                  <span className="ym-stat-values">
                    {game.phase === "reaction" &&
                      currentChoice &&
                      currentChoice.skill !== 0 && (
                        <span
                          className={`ym-stat-delta ${
                            currentChoice.skill > 0 ? "pos" : "neg"
                          }`}
                        >
                          {currentChoice.skill > 0
                            ? `+${currentChoice.skill}`
                            : currentChoice.skill}
                        </span>
                      )}
                    <span className="ym-stat-num">{game.skill}</span>
                  </span>
                </div>
                <div
                  className="ym-stat-bar"
                  role="progressbar"
                  aria-label="제과 실력"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={game.skill}
                >
                  <div
                    className="ym-stat-fill ym-stat-fill--skill"
                    style={{ width: `${game.skill}%` }}
                  />
                </div>
              </div>

              <div className="ym-stat-card">
                <div className="ym-stat-head">
                  <span className="ym-stat-label ym-stat-label--team">
                    <Heart size={14} aria-hidden="true" />
                    팀워크
                  </span>
                  <span className="ym-stat-values">
                    {game.phase === "reaction" &&
                      currentChoice &&
                      currentChoice.team !== 0 && (
                        <span
                          className={`ym-stat-delta ${
                            currentChoice.team > 0 ? "pos" : "neg"
                          }`}
                        >
                          {currentChoice.team > 0
                            ? `+${currentChoice.team}`
                            : currentChoice.team}
                        </span>
                      )}
                    <span className="ym-stat-num">{game.team}</span>
                  </span>
                </div>
                <div
                  className="ym-stat-bar"
                  role="progressbar"
                  aria-label="팀워크"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={game.team}
                >
                  <div
                    className="ym-stat-fill ym-stat-fill--team"
                    style={{ width: `${game.team}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="ym-progress-track" aria-hidden="true">
              <div
                className="ym-progress-fill"
                style={{ width: `${Math.round(progressRatio * 100)}%` }}
              />
            </div>
          </header>

          {/* Unified Visual Novel Stage */}
          <div
            className={`ym-stage ${game.phase === "choose" ? "ym-stage--choice" : ""} ${
              isImpacting && impactMood === "bad" ? "ym-stage--shake" : ""
            }`}
            data-impacting={isImpacting ? "true" : "false"}
            data-impact-tick={impactTick}
          >
            <div className="ym-backdrop" role="region" aria-label={scene.location}>
              <div
                key={sceneArt[game.step]}
                className="ym-bg-photo"
                style={{ backgroundImage: `url('${encodeURI(sceneArt[game.step]!)}')` }}
                data-bg-src={sceneArt[game.step]}
                aria-hidden="true"
              />
              <div className="ym-backdrop-vignette" aria-hidden="true" />
            </div>

            <div className="ym-stage-badge">{scene.location}</div>

            <div className="ym-cast" aria-label="등장인물 무대">
              <div
                key={speakerName}
                className={`ym-character ym-character--active ${
                  speakerName === "바닐라" ? "ym-character--fairy" : ""
                }`}
                data-character={speakerName}
                data-active="true"
              >
                <div className="ym-character-figure">
                  {characterArt[speakerName] && (
                    <img
                      src={characterArt[speakerName]}
                      alt={`${speakerName} 캐릭터 이미지`}
                      decoding="async"
                      className="ym-character-img"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                </div>
                <div className="ym-character-plate">
                  <span>{speakerName}</span>
                </div>
              </div>
            </div>

            {isImpacting && impactTick > 0 && (
              <div
                key={impactTick}
                className={`ym-sparkle-fx ${impactMood === "bad" ? "ym-sparkle-fx--bad" : ""}`}
                aria-hidden="true"
              />
            )}
          </div>

          {/* Unified Bottom Panel */}
          <section className="ym-bottom-panel" aria-live="polite">
            {game.phase === "choose" ? (
              <div className="ym-choice-box">
                <div className="ym-choice-header">
                  <span className="ym-choice-kicker">
                    <Sparkles
                      size={12}
                      style={{ display: "inline", verticalAlign: "-1px", marginRight: 4 }}
                      aria-hidden="true"
                    />
                    DECISION · 파티시엘의 선택
                  </span>
                  <p className="ym-choice-prompt">{scene.title} — 어떤 방법을 선택할까요?</p>
                </div>
                <div className="ym-choices-grid" role="group" aria-label="선택지 목록">
                  {scene.choices.map((choice, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => choose(i)}
                      className="ym-choice-btn"
                    >
                      <span className="ym-choice-badge">{"ABC"[i]}</span>
                      <span className="ym-choice-label">{choice.text}</span>
                      <ChevronRight
                        size={17}
                        className="ym-choice-arrow"
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
                onClick={handleDialogueClick}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleDialogueClick();
                  }
                }}
                className="ym-dialogue-card"
                aria-label="대화 진행"
              >
                <div className="ym-speaker-plate">{speakerName}</div>

                <p className="ym-dialogue-text">
                  “{spoken.slice(0, visible)}”
                  {!complete && <span className="ym-caret">▍</span>}
                </p>

                <div className="ym-dialogue-footer">
                  <div className="ym-reaction-deltas">
                    {game.phase === "reaction" && currentChoice && (
                      <>
                        {currentChoice.skill !== 0 && (
                          <span
                            className={`ym-delta-pill ${
                              currentChoice.skill > 0 ? "pos" : "neg"
                            }`}
                          >
                            제과 실력{" "}
                            {currentChoice.skill > 0
                              ? `+${currentChoice.skill}`
                              : currentChoice.skill}
                          </span>
                        )}
                        {currentChoice.team !== 0 && (
                          <span
                            className={`ym-delta-pill ${
                              currentChoice.team > 0 ? "pos" : "neg"
                            }`}
                          >
                            팀워크{" "}
                            {currentChoice.team > 0
                              ? `+${currentChoice.team}`
                              : currentChoice.team}
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  <span className="ym-next-indicator">
                    {!complete
                      ? "클릭하여 스킵"
                      : game.phase === "intro"
                        ? "선택지 보기"
                        : game.step === stages.length - 1
                          ? "최종 결과 확인"
                          : "다음 이야기로"}
                    <ChevronRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
