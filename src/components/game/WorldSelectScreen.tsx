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
