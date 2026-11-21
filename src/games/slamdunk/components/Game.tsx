import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { characterReviews, readCollection, unlockEnding, type EndingCollection } from "../game/collection";
import { advance, choose, newGame, resolveEnding, type GameState } from "../game/engine";
import type { Line, Theme } from "../game/types";
import { cn } from "../lib/utils";
import { Backdrop, Portrait } from "./Scene";
import { beep, playBasketballSfx, useTypewriter } from "./useTypewriter";
import { EndingShareAndReward } from "../../../components/EndingShareAndReward";

type Saved = GameState & { step: number };
const gaugeBg: Record<string, string> = { trust: "bg-trust", judgment: "bg-judgment" };
const gaugeText: Record<string, string> = { trust: "text-trust", judgment: "text-judgment" };

export function Game({ theme }: { theme: Theme }) {
  const key = `game:${theme.id}`;
  const [s, setS] = useState<Saved>({ ...newGame(theme), step: 0 });
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [fx, setFx] = useState<"good" | "bad" | null>(null);
  const [collection, setCollection] = useState<EndingCollection>({});
  const [showCollection, setShowCollection] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
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
      setMuted(localStorage.getItem("game:muted") === "1");
      setCollection(readCollection(theme.id));
    } catch { /* ignore */ }
    setLoaded(true);
  }, [key]);
  useEffect(() => { if (loaded) localStorage.setItem(key, JSON.stringify(s)); }, [s, loaded, key]);
  useEffect(() => { localStorage.setItem("game:muted", muted ? "1" : "0"); }, [muted]);

  const click = () => beep("click", muted);
  const reset = (phase: GameState["phase"]) => { setShowReviews(false); setShowCollection(false); setS({ ...newGame(theme), phase, step: 0 }); };

  const q = theme.questions[s.qIndex]!;
  const ending = s.phase === "ending" ? resolveEnding(theme, s.stats) : null;
  const reviews = ending ? characterReviews(s) : [];
  useEffect(() => {
    if (!loaded || !ending || s.step < ending.lines.length) return;
    setCollection(unlockEnding(theme.id, ending.id));
  }, [loaded, ending?.id, s.step, theme.id]);

  // Determine current lines for dialog-driven phases
  let lines: Line[] = [];
  let bg = "gym";
  let cast: string[] = [];
  if (s.phase === "opening") { lines = theme.opening; cast = ["hanna", "baekho", "taewoong", "chisu"]; }
  if (s.phase === "question" || s.phase === "result") {
    bg = q.background; cast = q.cast;
    lines = s.phase === "question" ? q.lines : q.choices[s.answers[q.id] ?? 0]!.reactions;
  }
  if (ending) { lines = ending.lines; bg = ending.background; cast = ["chisu", "baekho", "taewoong", "hanna"]; }

  const line = lines[Math.min(s.step, lines.length - 1)];
  const dialogDone = s.step >= lines.length - 1;
  const speaker = line?.speaker ? theme.characters[line.speaker] : undefined;
  const allCast = Array.from(new Set([...cast, ...lines.map((l) => l.speaker).filter((x): x is string => !!x && x !== "me")]));
  const mood = s.phase === "result" ? (fx ?? "neutral") : ending ? (ending.id === "happy" ? "good" : "neutral") : "neutral";

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
  const onNext = () => { click(); setFx(null); setS((prev) => ({ ...advance(theme, prev), step: 0 })); };

  if (!loaded) return <div className="min-h-screen bg-ink" />;

  if (s.phase === "title" || s.phase === "howto") {
    return (
      <main className="relative min-h-[calc(100vh-58px)] min-h-[calc(100dvh-58px)] overflow-x-hidden overflow-y-auto">
        <Backdrop theme={theme} bg="gym">
          <div className="absolute bottom-[18%] left-[18%] h-16 w-16 rounded-full border-4 border-ink bg-ball shadow-2xl [background-image:linear-gradient(90deg,transparent_47%,var(--ink)_47%_53%,transparent_53%)]" />
        </Backdrop>
        <div className="relative z-10 flex min-h-[calc(100vh-58px)] min-h-[calc(100dvh-58px)] flex-col items-center justify-center px-4 py-8 pb-[max(2rem,calc(env(safe-area-inset-bottom,0px)+1.5rem))] text-center">
          {showCollection ? (
            <div className="animate-scene w-full max-w-xl border-4 border-ink bg-card p-5 text-card-foreground shadow-[8px_8px_0_var(--ink)] sm:p-6">
              <h2 className="font-display text-3xl text-primary">엔딩 컬렉션</h2>
              <p className="mt-2 text-sm">해금한 엔딩 {theme.endings.filter((e) => collection[e.id]).length} / {theme.endings.length}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">{theme.endings.map((e) => <div key={e.id} className="border-2 border-ink p-4 text-left"><p className="font-display text-xl">{collection[e.id] ? e.title : "??? 잠긴 엔딩"}</p><p className="mt-2 text-sm">{collection[e.id] ? e.subtitle : "게임을 플레이해 해금하세요."}</p></div>)}</div>
              <button onClick={() => setShowCollection(false)} className="mt-6 min-h-[48px] border-4 border-ink bg-primary px-5 py-2 font-display text-primary-foreground">돌아가기</button>
            </div>
          ) : s.phase === "title" ? (
            <div className="animate-scene w-full max-w-2xl">
              <h1 className="font-display text-[clamp(3.25rem,14vw,8rem)] leading-none text-primary drop-shadow-[0_6px_0_var(--ink)]" style={{ WebkitTextStroke: "2px var(--foreground)" }}>
                {theme.title}
              </h1>
              <p className="mt-4 inline-block max-w-full -rotate-2 bg-ink px-4 py-2 font-display text-[clamp(1rem,4.5vw,1.875rem)] text-foreground sm:px-5">{theme.subtitle}</p>
              <div className="mt-8 flex flex-col flex-wrap items-center justify-center gap-3 sm:mt-10 sm:flex-row">
                <button onClick={() => { click(); reset("opening"); }} className="min-h-[52px] w-full max-w-[15rem] border-4 border-ink bg-primary px-6 py-3 font-display text-2xl text-primary-foreground shadow-[6px_6px_0_var(--ink)] transition hover:-translate-y-1 hover:bg-trust sm:w-56">게임 시작</button>
                <button onClick={() => { click(); setShowCollection(true); }} className="min-h-[52px] w-full max-w-[15rem] border-4 border-ink bg-ball px-6 py-3 font-display text-2xl text-ink shadow-[6px_6px_0_var(--ink)] transition hover:-translate-y-1 sm:w-56">엔딩 컬렉션</button>
                <button onClick={() => { click(); setS((p) => ({ ...p, phase: "howto" })); }} className="min-h-[52px] w-full max-w-[15rem] border-4 border-ink bg-card px-6 py-3 font-display text-2xl text-card-foreground shadow-[6px_6px_0_var(--ink)] transition hover:-translate-y-1 hover:bg-ball sm:w-56">게임 방법</button>
              </div>
            </div>
          ) : (
            <div className="animate-scene max-w-2xl border-4 border-ink bg-card p-5 text-left text-card-foreground shadow-[8px_8px_0_var(--ink)] sm:p-6">
              <h2 className="mb-4 font-display text-3xl text-primary">게임 방법</h2>
              <ul className="space-y-3 text-sm sm:text-base">
                {theme.howTo.map((h) => <li key={h} className="flex gap-2"><span className="text-ball">●</span>{h}</li>)}
              </ul>
              <button onClick={() => { click(); setS((p) => ({ ...p, phase: "title" })); }} className="mt-6 min-h-[48px] border-4 border-ink bg-primary px-5 py-2 font-display text-lg text-primary-foreground hover:bg-trust">돌아가기</button>
            </div>
          )}
        </div>
      </main>
    );
  }

  const showBanner = s.phase === "opening" && s.step >= lines.length;
  const showChoices = s.phase === "question" && dialogDone;
  const showEndingCard = !!ending && s.step >= lines.length;

  return (
    <main
      className={cn(
        "relative flex min-h-[calc(100vh-58px)] min-h-[calc(100dvh-58px)] flex-col justify-between overflow-x-hidden overflow-y-auto md:block md:h-[calc(100dvh-58px)] md:min-h-[600px] md:overflow-hidden",
        isImpacting && "sd-stage--shake",
        !isImpacting && fx === "bad" && s.phase === "result" && "animate-shake",
      )}
      data-impacting={isImpacting ? "true" : "false"}
      data-impact-tick={impactTick}
    >
      <Backdrop theme={theme} bg={bg} />
      {isImpacting && impactTick > 0 && (
        <div key={impactTick} aria-hidden="true">
          <div className={cn("sd-court-flash", fx === "bad" && "sd-court-flash--bad")} />
          <div className={cn("sd-rim-burst", fx === "bad" && "sd-rim-burst--bad")} />
        </div>
      )}

      {/* HUD */}
      <header
        className={cn(
          "relative z-20 flex flex-wrap items-center gap-2.5 bg-ink/88 px-3 py-2 md:absolute md:inset-x-0 md:top-0 md:gap-6 md:px-6",
          isImpacting && "sd-scoreboard--flash",
          isImpacting && fx === "bad" && "sd-scoreboard--bad",
        )}
      >
        <div className="font-display text-base text-ball sm:text-lg md:text-xl">
          {s.phase === "opening" ? "OPENING" : ending ? "FINAL" : `QUESTION ${String(s.qIndex + 1).padStart(2, "0")} / ${theme.questions.length}`}
        </div>
        {theme.stats.map((d) => {
          const v = s.stats[d.id] ?? d.initial;
          const delta = s.phase === "result" ? s.lastDelta?.[d.id] : undefined;
          return (
            <div key={d.id} className="flex min-w-[125px] flex-1 items-center gap-2">
              <span className={cn("whitespace-nowrap text-xs font-bold sm:text-sm", gaugeText[d.tone])}>{d.label}</span>
              <div className="h-3.5 flex-1 overflow-hidden rounded-sm border-2 border-foreground/40 bg-foreground/10 sm:h-4">
                <div className={cn("h-full transition-all duration-700", gaugeBg[d.tone])} style={{ width: `${((v - d.min) / (d.max - d.min)) * 100}%` }} />
              </div>
              <span className="w-7 text-right font-display text-sm text-foreground sm:w-8 sm:text-base">{v}</span>
              {delta !== undefined && (
                <span key={`${q?.id}-${d.id}`} className={cn("animate-float-up w-9 font-display text-sm", delta >= 0 ? gaugeText[d.tone] : "text-muted-foreground")}>{delta >= 0 ? `+${delta}` : delta}</span>
              )}
            </div>
          );
        })}
        <button aria-label={muted ? "소리 켜기" : "음소거"} onClick={() => setMuted((m) => !m)} className="min-h-[36px] min-w-[36px] inline-flex items-center justify-center text-foreground hover:text-ball">
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-foreground/10">
          <div className="h-full bg-primary transition-all" style={{ width: `${(Object.keys(s.answers).length / theme.questions.length) * 100}%` }} />
        </div>
      </header>

      {/* Cast */}
      <div className="relative z-10 flex min-h-[210px] flex-1 items-end justify-center gap-1.5 px-2 pt-3 md:absolute md:inset-x-0 md:bottom-[34%] md:min-h-0 md:gap-8 md:px-0 md:pt-0">
        {allCast.slice(0, 4).filter((id) => theme.characters[id]).map((id) => (
          <Portrait key={id} c={theme.characters[id]!} mood={speaker?.id === id ? mood : "neutral"} active={speaker?.id === id} />
        ))}
      </div>
      {fx === "good" && s.phase === "result" && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="animate-ball h-14 w-14 rounded-full border-4 border-ink bg-ball" />
          {[...Array(6)].map((_, i) => (
            <span key={i} className="animate-sparkle absolute text-3xl text-ball" style={{ left: `${20 + i * 12}%`, top: `${25 + (i % 3) * 12}%`, animationDelay: `${i * 0.1}s` }}>✦</span>
          ))}
        </div>
      )}

      {/* Bottom panel */}
      <section className="relative z-20 p-3 pb-[max(1rem,calc(env(safe-area-inset-bottom,0px)+0.75rem))] md:absolute md:inset-x-0 md:bottom-0 md:p-6">
        {showBanner ? (
          <div className="animate-scene mx-auto max-w-3xl border-4 border-ink bg-card p-5 text-center text-card-foreground shadow-[8px_8px_0_var(--ink)] md:p-6">
            <p className="font-display text-2xl text-primary sm:text-3xl md:text-4xl">「{theme.openingBanner}」</p>
            {theme.openingGuide.map((g) => <p key={g} className="mt-3 text-sm sm:text-base">{g}</p>)}
            <button onClick={() => { click(); setS((p) => ({ ...p, phase: "question", qIndex: 0, step: 0 })); }} className="mt-5 min-h-[48px] border-4 border-ink bg-primary px-6 py-2.5 font-display text-xl text-primary-foreground hover:bg-trust">첫 번째 상황으로 ▶</button>
          </div>
        ) : showEndingCard && ending ? (
          <div className="animate-scene mx-auto max-h-[72dvh] max-w-3xl overflow-y-auto border-4 border-ink bg-card p-4 text-center text-card-foreground shadow-[8px_8px_0_var(--ink)] md:p-6">
            <p className={cn("font-display text-3xl sm:text-5xl", ending.id === "happy" ? "text-primary" : "text-ink")}>「{ending.title}」</p>
            <p className="mt-2 font-display text-xl sm:text-2xl">「{ending.subtitle}」</p>
            <p className="mt-4 italic text-muted-foreground">"{ending.quote}"</p>
            <div className="mt-4 flex justify-center gap-6 font-display text-lg sm:text-xl">
              {theme.stats.map((d) => <span key={d.id} className={gaugeText[d.tone]}>{d.label} {s.stats[d.id]}</span>)}
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button onClick={() => setShowReviews((v) => !v)} className="min-h-[44px] border-2 border-ink bg-ball px-4 py-2 font-display text-ink">{showReviews ? "캐릭터 평가 접기 ▲" : "캐릭터별 평가 보기 ▼"}</button>
              <button onClick={() => setShowCollection((v) => !v)} className="min-h-[44px] border-2 border-ink bg-ink px-4 py-2 font-display text-foreground">{showCollection ? "컬렉션 접기 ▲" : "엔딩 컬렉션 보기 ▼"}</button>
            </div>
            {showReviews && <div className="mt-3 grid max-h-[28vh] gap-2 overflow-y-auto text-left sm:grid-cols-2">{reviews.map((r) => <div key={r.id} className="flex gap-3 border-2 border-ink bg-background/10 p-2"><img src={theme.characters[r.id]?.image} alt="" className="h-16 w-14 shrink-0 object-cover" /><div><p className="font-display text-primary">{r.title}</p><p className="text-sm">{r.comment}</p></div></div>)}</div>}
            {showCollection && <div className="mt-3 grid gap-2 text-left sm:grid-cols-2">{theme.endings.map((e) => <div key={e.id} className="border-2 border-ink p-2"><p className="font-display">{collection[e.id] || e.id === ending.id ? e.title : "??? 잠긴 엔딩"}</p><p className="text-xs">{collection[e.id] || e.id === ending.id ? e.subtitle : "아직 발견하지 못한 엔딩"}</p></div>)}</div>}
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button onClick={() => { click(); reset("opening"); }} className="min-h-[48px] border-4 border-ink bg-primary px-5 py-2 font-display text-lg text-primary-foreground hover:bg-trust">{ending.retryLabel}</button>
              <button onClick={() => { click(); reset("title"); }} className="min-h-[48px] border-4 border-ink bg-card px-5 py-2 font-display text-lg hover:bg-ball">처음 화면으로</button>
            </div>
            <EndingShareAndReward
              gameId="slamdunk"
              animeTitle={theme.title}
              endingTitle={ending.title}
            />
          </div>
        ) : (
          <div className="mx-auto max-w-4xl">
            {s.phase === "question" && s.step === 0 && (
              <div className="mb-2 inline-block bg-primary px-3 py-1 font-display text-primary-foreground">{q.title}</div>
            )}
            <Dialog
              key={`${s.phase}-${s.qIndex}-${s.step}`}
              name={line?.speaker ? (theme.characters[line.speaker]?.name ?? "") : undefined}
              text={line?.text ?? ""}
              canAdvance={!showChoices}
              onAdvance={() => { click(); setS((p) => ({ ...p, step: p.step + 1 })); }}
            />
            {showChoices && (
              <div className="animate-scene mt-3">
                <p className="mb-2 bg-ink/85 px-3 py-1.5 text-sm font-bold text-ball sm:text-base">{q.prompt}</p>
                <div className="grid gap-2.5 md:grid-cols-3">
                  {q.choices.map((c, i) => (
                    <button key={i} onClick={() => onPick(i)} className="group flex min-h-[54px] items-start gap-3 border-4 border-ink bg-card p-3 text-left text-sm text-card-foreground shadow-[4px_4px_0_var(--ink)] transition-[transform,background-color] duration-150 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-ink font-display text-xl text-ball group-hover:text-foreground">{"ABC"[i]}</span>
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {s.phase === "result" && dialogDone && (
              <div className="animate-scene mt-3 flex flex-wrap items-center justify-end gap-3">
                <div className="flex gap-4 bg-ink/85 px-4 py-2 font-display">
                  {theme.stats.map((d) => {
                    const v = s.lastDelta?.[d.id] ?? 0;
                    return <span key={d.id} className={gaugeText[d.tone]}>{d.label} {v >= 0 ? `+${v}` : v}</span>;
                  })}
                </div>
                <button onClick={onNext} className="min-h-[48px] border-4 border-ink bg-primary px-6 py-2 font-display text-xl text-primary-foreground shadow-[4px_4px_0_var(--ink)] hover:bg-trust">
                  {s.qIndex + 1 >= theme.questions.length ? "결과 보기 ▶" : "다음 상황으로 ▶"}
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

function Dialog({ name, text, canAdvance, onAdvance }: { name?: string | undefined; text: string; canAdvance: boolean; onAdvance: () => void }) {
  const { shown, done, finish } = useTypewriter(text);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => (!done ? finish() : canAdvance && onAdvance())}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (!done) finish(); else if (canAdvance) onAdvance(); } }}
      className="mobile-light-blur relative min-h-[110px] cursor-pointer select-none border-4 border-ink bg-ink/90 p-4 pt-5 text-foreground md:bg-ink/80 md:backdrop-blur-sm"
    >
      {name && <div className="absolute -top-4 left-4 border-2 border-ink bg-primary px-3 py-0.5 font-display text-primary-foreground">{name}</div>}
      <p className={cn("text-sm leading-relaxed sm:text-base md:text-lg", !name && "italic text-foreground/85")}>{name ? `"${shown}"` : shown}</p>
      {done && canAdvance && <span className="absolute bottom-2 right-3 animate-pulse text-ball">▼ 클릭</span>}
    </div>
  );
}
