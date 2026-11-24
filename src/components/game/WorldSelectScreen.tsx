import { useGame } from "@/contexts/GameContext";
import { ANIME_WORLDS } from "@/data/animeWorlds";
import { AnimeWorld } from "@/data/types";
import { Lock, Sparkles, ArrowLeft, Play } from "lucide-react";
import Starfield from "./Starfield";

export default function WorldSelectScreen() {
  const { startAnime, showLockedNotice, openTitle } = useGame();

  const handleCard = (w: AnimeWorld) => {
    if (w.status === "available") startAnime(w.id);
    else showLockedNotice();
  };

  return (
    <div
      className="world-select-shell animate-screen-fast relative w-full overflow-x-hidden text-white selection:bg-[#6C4DFF] selection:text-white"
      style={{
        backgroundColor: "#100b22",
        backgroundImage:
          "radial-gradient(circle at 38% 12%, rgba(108, 77, 255, 0.22) 0%, transparent 45%), radial-gradient(circle at 88% 85%, rgba(185, 170, 255, 0.16) 0%, transparent 42%)",
      }}
    >
      <Starfield density={72} />

      <div className="relative z-10 mx-auto max-w-7xl px-3.5 py-6 sm:px-6 sm:py-12">
        {/* Top nav */}
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <button
            type="button"
            onClick={openTitle}
            className="mobile-light-blur group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 bg-slate-900/85 px-4 py-2 text-xs font-semibold text-violet-100 shadow-lg transition-[transform,border-color,color] duration-150 hover:border-violet-300/60 hover:text-white active:scale-[0.98] md:bg-[#21183a]/80 md:backdrop-blur-sm sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-150 group-hover:-translate-x-1" />
            <span>메인으로</span>
          </button>
        </div>

        {/* Title */}
        <div className="mb-7 text-center sm:mb-12">
          <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.22em] text-violet-200 uppercase sm:text-sm sm:tracking-[0.25em]">
            <Sparkles className="h-3.5 w-3.5 text-violet-200 sm:h-4 sm:w-4" /> ANIME DIMENSION SELECT
          </p>
          <h2 className="text-[clamp(1.5rem,6.4vw,3.75rem)] font-black leading-tight tracking-tight break-keep drop-shadow-[0_0_24px_rgba(108,77,255,0.4)]">
            당신이 소환될 세계를 선택하세요!
          </h2>
          <p className="mx-auto mt-2.5 max-w-2xl text-[clamp(0.8125rem,3.4vw,1rem)] text-slate-300 break-keep sm:mt-3">
            20개의 애니메이션 세계가 준비되어 있어요. 게임은 순차적으로 공개됩니다.
          </p>
        </div>

        {/* 20 Cards Grid */}
        <div className="grid grid-cols-2 gap-3 max-[359px]:grid-cols-1 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-5">
          {ANIME_WORLDS.map((w) => {
            const available = w.status === "available";
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => handleCard(w)}
                className={`world-card-item group relative flex min-w-0 flex-col overflow-hidden rounded-2xl text-left transition-[transform,opacity] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 ${
                  available
                    ? "cursor-pointer border-2 border-violet-300/80 shadow-xl shadow-[#6C4DFF]/25 md:hover:-translate-y-1 md:hover:scale-[1.03] active:scale-[0.98]"
                    : "cursor-pointer border border-white/10 opacity-75 hover:opacity-90 md:hover:scale-[1.02] active:scale-[0.98]"
                }`}
                style={{
                  background:
                    "linear-gradient(160deg, rgba(30,20,60,0.95) 0%, rgba(10,8,30,0.98) 100%)",
                }}
              >
                {/* Available glowing border accent (desktop pulse only to keep mobile GPU fast) */}
                {available && (
                  <div
                    className="pointer-events-none absolute -inset-0.5 hidden rounded-2xl opacity-85 blur-sm md:block md:animate-pulse"
                    style={{
                      background:
                        "linear-gradient(135deg, #6C4DFF 0%, #b9aaff 55%, #ffffff 100%)",
                    }}
                  />
                )}

                {/* Card inner */}
                <div className="relative z-10 flex h-full w-full flex-col overflow-hidden rounded-2xl bg-slate-950/85">
                  {/* Cover image area */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
                    <img
                      src={w.coverImage}
                      alt={w.title}
                      loading="lazy"
                      decoding="async"
                      className={`h-full w-full object-cover transition-transform duration-300 md:group-hover:scale-105 ${
                        available
                          ? "brightness-105"
                          : "brightness-50 saturate-50"
                      }`}
                    />
                    {/* Gradient shade */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    {/* Number chip */}
                    <span className="mobile-light-blur absolute top-2 left-2 rounded-full border border-white/20 bg-black/80 px-1.5 py-0.5 text-[9px] font-black tracking-wider text-violet-100 md:backdrop-blur-sm sm:px-2 sm:text-[10px]">
                      #{String(w.number).padStart(2, "0")}
                    </span>

                    {/* Status badge */}
                    {available ? (
                      <span className="absolute top-2 right-2 inline-flex items-center gap-0.5 rounded-full bg-[#6C4DFF] px-1.5 py-0.5 text-[8.5px] font-black tracking-wide text-white shadow-md shadow-[#6C4DFF]/35 sm:gap-1 sm:px-2.5 sm:text-[10px] sm:tracking-wider">
                        <Play className="h-2 w-2 fill-white sm:h-2.5 sm:w-2.5" /> PLAY AVAILABLE
                      </span>
                    ) : (
                      <span className="mobile-light-blur absolute top-2 right-2 inline-flex items-center gap-0.5 rounded-full border border-white/20 bg-black/85 px-1.5 py-0.5 text-[8.5px] font-bold tracking-wide text-slate-300 md:backdrop-blur-sm sm:gap-1 sm:px-2 sm:text-[10px] sm:tracking-wider">
                        <Lock className="h-2 w-2 text-purple-300 sm:h-2.5 sm:w-2.5" /> COMING SOON
                      </span>
                    )}

                    {/* Locked overlay lock icon */}
                    {!available && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="mobile-light-blur flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-900/85 shadow-xl transition-transform duration-200 md:h-12 md:w-12 md:backdrop-blur-sm md:group-hover:scale-110">
                          <Lock className="h-5 w-5 text-violet-200 md:h-6 md:w-6" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card content */}
                  <div className="flex flex-1 flex-col justify-between p-2.5 sm:p-4">
                    <div>
                      <h3
                        className={`line-clamp-1 text-sm font-black leading-snug tracking-tight sm:text-base ${
                          available ? "text-violet-100" : "text-slate-300"
                        }`}
                      >
                        {w.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-400 sm:text-xs">
                        “{w.goal}”
                      </p>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2 text-[10px] sm:mt-3">
                      <span
                        className={
                          available
                            ? "flex items-center gap-1 font-bold text-violet-200"
                            : "text-slate-500"
                        }
                      >
                        {available ? (
                          <>
                            <Sparkles className="h-3 w-3 text-violet-200" />
                            지금 플레이
                          </>
                        ) : (
                          "업데이트 예정"
                        )}
                      </span>
                      <span className="text-slate-500">입장 ↗</span>
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

