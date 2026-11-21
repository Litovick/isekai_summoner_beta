import { useGame } from "@/contexts/GameContext";
import { Sparkles, Wand2 } from "lucide-react";

const TITLE_BACKGROUND = "/assets/anime-summoner-hero.webp";

export default function TitleScreen() {
  const { openWorldSelect } = useGame();

  return (
    <main
      className="title-dvh-shell animate-screen-fast relative flex w-full flex-col justify-between overflow-x-hidden overflow-y-auto bg-[#100b22] text-white selection:bg-[#6C4DFF] selection:text-white"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 24%, rgba(108, 77, 255, 0.32) 0%, rgba(23, 14, 53, 0.72) 48%, #100b22 82%)",
      }}
    >
      {/* Desktop full-bleed hero background */}
      <img
        src={TITLE_BACKGROUND}
        alt="마법진 포털 앞에서 애니메이션 세계를 마주하는 소환사"
        decoding="async"
        className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-center md:block"
      />
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-b from-[#170e35]/25 via-transparent to-[#100b22]/80 md:block" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-2/5 bg-gradient-to-t from-[#100b22]/92 to-transparent md:block" />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl shrink-0 items-center justify-between px-4 pt-3.5 sm:px-8 sm:pt-7">
        <span className="mobile-light-blur inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#180f36]/80 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.2em] text-white/90 md:bg-[#180f36]/45 md:py-2 md:backdrop-blur-md sm:text-xs">
          <Sparkles className="h-3.5 w-3.5 text-violet-200" />
          ANIME DIMENSION
        </span>
      </header>

      {/* Mobile full-width intact hero banner (prevents left/right clipping of baked-in title artwork) */}
      <div className="relative z-10 mt-2 flex w-full shrink-0 items-center justify-center overflow-hidden md:hidden">
        <img
          src={TITLE_BACKGROUND}
          alt="마법진 포털 앞에서 애니메이션 세계를 마주하는 소환사"
          decoding="async"
          className="block max-h-[44dvh] w-full object-contain object-center"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#100b22] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#100b22] to-transparent" />
      </div>

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 pt-3 pb-4 text-center sm:px-6 md:justify-end md:pt-8 md:pb-[8dvh]">
        <div className="mobile-light-blur w-full max-w-[min(92vw,34rem)] rounded-[1.5rem] border border-white/20 bg-[#120b29]/85 px-5 py-4 shadow-[0_14px_48px_rgba(20,8,58,.45)] md:bg-[#120b29]/55 md:backdrop-blur-md sm:rounded-[2rem] sm:px-10 sm:py-7">
          <h1 className="text-[clamp(1.0625rem,4.6vw,1.375rem)] font-black leading-snug tracking-wide text-white break-keep">
            이세계 소환사 : ANIME WORLD
          </h1>
          <p className="mt-1.5 text-[clamp(0.75rem,3.3vw,0.9375rem)] font-semibold tracking-[0.16em] text-violet-100/90 sm:tracking-[0.28em]">
            좋아하는 애니메이션 세계에서
          </p>
          <p className="mt-1.5 text-[clamp(0.8125rem,3.6vw,1rem)] font-medium text-white/85 break-keep">
            선택으로 만들어 가는 나만의 이야기
          </p>
        </div>
        <button
          type="button"
          onClick={openWorldSelect}
          className="group mt-5 inline-flex min-h-[54px] w-full max-w-[min(86vw,18rem)] items-center justify-center gap-3 rounded-full bg-[#6C4DFF] px-8 py-3.5 text-[clamp(1rem,4.2vw,1.125rem)] font-extrabold tracking-wide text-white shadow-[0_10px_32px_rgba(108,77,255,.48)] ring-1 ring-white/30 transition-[transform,background-color] duration-150 hover:-translate-y-0.5 hover:bg-[#795eff] active:scale-[0.98] sm:mt-6 sm:w-auto sm:max-w-none sm:px-12 sm:py-4"
        >
          <Wand2 className="h-5 w-5 shrink-0 transition-transform duration-150 group-hover:rotate-12" />
          <span>소환되기</span>
          <Sparkles className="h-5 w-5 shrink-0 text-violet-100 transition-transform duration-150 group-hover:scale-110" />
        </button>
        <p className="mt-3 max-w-[90vw] text-[clamp(0.75rem,3.2vw,0.875rem)] text-white/80 drop-shadow break-keep">
          20개의 애니메이션 세계 중 이야기를 골라 보세요
        </p>
      </section>
    </main>
  );
}


