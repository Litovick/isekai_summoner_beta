import { useState } from "react";
import { useGame } from "@/contexts/GameContext";
import { ANIME_WORLDS } from "@/data/animeWorlds";
import { AnimeWorld } from "@/data/types";
import { Lock, Sparkles, ArrowLeft, Play } from "lucide-react";
import Starfield from "./Starfield";

const DS_CHAR_BASE = `${(import.meta.env.BASE_URL || "/").replace(/\/$/, "")}/demonslayer/characters`;

function SafeCoverSprite({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setHidden(true)}
    />
  );
}

function DemonSlayerWorldCover() {
  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      style={{
        background:
          "radial-gradient(circle at 22% 20%, rgba(126, 34, 206, 0.55), transparent 56%), radial-gradient(circle at 82% 25%, rgba(185, 28, 28, 0.52), transparent 52%), radial-gradient(circle at 50% 82%, rgba(212, 175, 55, 0.22), transparent 55%), linear-gradient(165deg, #0d0a16 0%, #191026 52%, #1a0b12 100%)",
      }}
    >
      {/* Tanjiro emerald-black Ichimatsu haori check pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-conic-gradient(#10b981 0% 25%, #07080c 0% 50%)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(155deg, rgba(0,0,0,0.85) 0%, transparent 68%)",
          WebkitMaskImage:
            "linear-gradient(155deg, rgba(0,0,0,0.85) 0%, transparent 68%)",
        }}
      />

      {/* Wisteria night mist & moon crest */}
      <div
        className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(216, 180, 254, 0.72) 0%, rgba(153, 27, 27, 0.42) 56%, transparent 74%)",
        }}
      />

      {/* Nichirin blade & wisteria seal backdrop */}
      <svg
        viewBox="0 0 180 220"
        className="absolute inset-x-0 top-5 mx-auto w-[68%] h-auto opacity-80 pointer-events-none drop-shadow-[0_0_16px_rgba(212,175,55,0.4)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="wsDsBlade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fdf8ef" />
            <stop offset="55%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
        <circle cx="90" cy="94" r="56" fill="none" stroke="rgba(212,175,55,0.55)" strokeWidth="1.5" strokeDasharray="5 4" />
        <circle cx="90" cy="94" r="44" fill="rgba(22,12,34,0.45)" stroke="rgba(192,132,252,0.55)" strokeWidth="1.2" />
        <path d="M90 22 L97 112 L90 120 L83 112 Z" fill="url(#wsDsBlade)" />
        <ellipse cx="90" cy="120" rx="22" ry="6.5" fill="#120d1a" stroke="#d4af37" strokeWidth="2" />
        <rect x="86" y="126" width="8" height="34" rx="2.5" fill="#991b1b" stroke="#d4af37" strokeWidth="1.2" />
      </svg>

      {/* Layered transparent character PNGs */}
      <div className="absolute inset-x-0 bottom-0 top-6 pointer-events-none transition-transform duration-500 group-hover:scale-105">
        <SafeCoverSprite
          src={`${DS_CHAR_BASE}/rengoku.png`}
          alt="렌고쿠 쿄쥬로"
          className="absolute bottom-2 left-1/2 -translate-x-1/2 h-[88%] w-auto max-w-none object-contain object-bottom opacity-85 drop-shadow-[0_0_14px_rgba(239,68,68,0.55)]"
        />
        <SafeCoverSprite
          src={`${DS_CHAR_BASE}/tanjiro.png`}
          alt="카마도 탄지로"
          className="absolute -bottom-1 -left-4 h-[78%] w-auto max-w-none object-contain object-bottom drop-shadow-[0_6px_12px_rgba(0,0,0,0.85)]"
        />
        <SafeCoverSprite
          src={`${DS_CHAR_BASE}/nezuko.png`}
          alt="카마도 네즈코"
          className="absolute -bottom-1 -right-4 h-[74%] w-auto max-w-none object-contain object-bottom drop-shadow-[0_6px_12px_rgba(0,0,0,0.85)]"
        />
      </div>

      {/* Taisho typography seal & scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
      <div className="absolute inset-x-3 bottom-3 text-center pointer-events-none">
        <p className="text-[9px] font-black tracking-[0.28em] text-amber-300/90 drop-shadow">
          TAISHO · 惡鬼滅殺
        </p>
        <p
          className="mt-0.5 text-lg sm:text-xl font-black tracking-tight text-amber-50 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
          style={{ fontFamily: '"Black Han Sans", "Noto Sans KR", sans-serif' }}
        >
          귀멸의 칼날
        </p>
      </div>
    </div>
  );
}

export default function WorldSelectScreen() {
  const { startAnime, showLockedNotice, openTitle } = useGame();

  const handleCard = (w: AnimeWorld) => {
    if (w.status === "available") startAnime(w.id);
    else showLockedNotice();
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden text-white selection:bg-[#6C4DFF] selection:text-white"
      style={{ backgroundColor: "#100b22" }}
    >
      <Starfield density={90} />

      {/* Ambient background glows */}
      <div
        className="fixed top-0 left-1/3 w-[700px] h-[700px] rounded-full blur-[140px] opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #6C4DFF 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed bottom-0 right-10 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #b9aaff 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-8 pr-28 sm:pr-0">
          <button
            type="button"
            onClick={openTitle}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-md bg-[#21183a]/75 border border-white/15 text-violet-100 hover:text-white hover:border-violet-300/60 transition-all shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>메인으로</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-[0.25em] text-violet-200 uppercase mb-2">
            <Sparkles className="w-4 h-4 text-violet-200" /> ANIME DIMENSION SELECT
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight drop-shadow-[0_0_30px_rgba(108,77,255,0.45)]">
            당신이 소환될 세계를 선택하세요!
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            20개의 애니메이션 세계가 준비되어 있어요. 게임은 순차적으로 공개됩니다.
          </p>
        </div>

        {/* 20 Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          {ANIME_WORLDS.map((w) => {
            const available = w.status === "available";
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => handleCard(w)}
                className={`group relative text-left rounded-2xl overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 flex flex-col ${
                  available
                    ? "cursor-pointer hover:scale-[1.03] hover:-translate-y-1 shadow-2xl shadow-[#6C4DFF]/25 border-2 border-violet-300/80"
                    : "cursor-pointer hover:scale-[1.02] border border-white/10 opacity-75 hover:opacity-90"
                }`}
                style={{
                  background:
                    "linear-gradient(160deg, rgba(30,20,60,0.95) 0%, rgba(10,8,30,0.98) 100%)",
                }}
              >
                {/* Available glowing border pulse */}
                {available && (
                  <div
                    className="pointer-events-none absolute -inset-0.5 rounded-2xl blur-sm opacity-90 animate-pulse"
                    style={{
                      background:
                        "linear-gradient(135deg, #6C4DFF 0%, #b9aaff 55%, #ffffff 100%)",
                    }}
                  />
                )}

                {/* Card inner */}
                <div className="relative z-10 w-full flex flex-col h-full rounded-2xl overflow-hidden bg-slate-950/80">
                  {/* Cover image area */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
                    {w.id === "demonslayer" ? (
                      <DemonSlayerWorldCover />
                    ) : (
                      <>
                        <img
                          src={w.coverImage}
                          alt={w.title}
                          loading="lazy"
                          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                            available
                              ? "filter brightness-105"
                              : "filter brightness-50 saturate-50"
                          }`}
                        />
                        {/* Gradient shade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      </>
                    )}

                    {/* Number chip */}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider bg-black/75 backdrop-blur-sm border border-white/20 text-violet-100">
                      #{String(w.number).padStart(2, "0")}
                    </span>

                    {/* Status badge */}
                    {available ? (
                      <span className="absolute top-2 right-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider bg-[#6C4DFF] text-white shadow-lg shadow-[#6C4DFF]/35">
                        <Play className="w-2.5 h-2.5 fill-white" /> PLAY AVAILABLE
                      </span>
                    ) : (
                      <span className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-black/80 backdrop-blur-sm border border-white/20 text-slate-300">
                        <Lock className="w-2.5 h-2.5 text-purple-300" /> COMING SOON
                      </span>
                    )}

                    {/* Locked overlay lock icon */}
                    {!available && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                          <Lock className="w-6 h-6 text-violet-200" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card content */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        className={`font-black text-sm sm:text-base tracking-tight leading-snug line-clamp-1 ${
                          available ? "text-violet-100" : "text-slate-300"
                        }`}
                      >
                        {w.title}
                      </h3>
                      <p className="mt-1 text-[11px] sm:text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        “{w.goal}”
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                      <span
                        className={
                          available
                            ? "font-bold text-violet-200 flex items-center gap-1"
                            : "text-slate-500"
                        }
                      >
                        {available ? (
                          <>
                            <Sparkles className="w-3 h-3 text-violet-200" />
                            지금 플레이
                          </>
                        ) : (
                          "업데이트 예정"
                        )}
                      </span>
                      <span className="text-slate-600">입장 ↗</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
