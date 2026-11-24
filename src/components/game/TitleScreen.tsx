import { useEffect } from "react";
import { useGame } from "@/contexts/GameContext";
import { Sparkles, Wand2 } from "lucide-react";

const DESKTOP_BG_SRC = "/assets/main_bg_desktop.png";
const MOBILE_BG_SRC = "/assets/main_bg_mobile.png";

export default function TitleScreen() {
  const { openWorldSelect } = useGame();

  // Preload both desktop & mobile hero images so resizing across 768px swaps seamlessly
  useEffect(() => {
    const desktopImg = new Image();
    desktopImg.src = DESKTOP_BG_SRC;
    const mobileImg = new Image();
    mobileImg.src = MOBILE_BG_SRC;
  }, []);

  return (
    <main
      className="title-dvh-shell animate-screen-fast relative flex w-full flex-col justify-between overflow-x-hidden overflow-y-auto bg-[#100b22] text-white selection:bg-[#6C4DFF] selection:text-white"
      data-testid="title-screen"
    >
      {/* Responsive full-bleed background layer: <768px mobile 9:16, >=768px desktop 16:9 */}
      <div
        className="title-hero-bg pointer-events-none absolute inset-0"
        role="img"
        aria-label="마법진 포털 앞에서 애니메이션 세계를 마주하는 소환사"
        data-testid="title-hero-bg"
      />

      {/* Measured contrast scrims: keep upper artwork crisp while grounding bottom CTA legibility */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#100b22]/30 via-transparent to-[#100b22]/80 md:from-[#170e35]/25 md:to-[#100b22]/85"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[32dvh] bg-gradient-to-t from-[#0d081d]/92 via-[#100b22]/45 to-transparent md:h-[28dvh] md:from-[#0d081d]/90 md:via-[#100b22]/35"
        aria-hidden="true"
      />

      {/* Quiet top brand kicker */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl shrink-0 items-center justify-between px-4 pt-3.5 sm:px-8 sm:pt-7">
        <span className="text-[11px] font-bold tracking-[0.24em] text-violet-100/90 drop-shadow-[0_2px_8px_rgba(10,6,26,0.85)] sm:text-xs">
          ANIME DIMENSION
        </span>
      </header>

      {/* Bottom-anchored CTA zone:
          Keeps both mobile (9:16) and desktop (16:9) key-visual artwork (title + portal + summoner)
          completely unobstructed while placing a unified HTML CTA cleanly in the lower button zone. */}
      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-end px-5 pb-[max(7dvh,calc(env(safe-area-inset-bottom,0px)+1.75rem))] pt-8 text-center sm:px-6 md:pb-[5.5dvh]">
        <h1 className="sr-only">이세계 소환사 : ANIME WORLD</h1>

        <button
          type="button"
          onClick={openWorldSelect}
          data-testid="title-start-button"
          aria-label="게임 시작하기 — 애니메이션 세계 선택으로 이동"
          className="group inline-flex min-h-[56px] w-full max-w-[min(82vw,20rem)] items-center justify-center gap-3 rounded-full border border-violet-200/45 bg-gradient-to-r from-[#5b3df5] via-[#6C4DFF] to-[#8462ff] px-8 py-4 text-[clamp(1.02rem,4.3vw,1.15rem)] font-extrabold tracking-wide text-white shadow-[0_12px_36px_rgba(108,77,255,.55),0_0_24px_rgba(167,139,250,.3)] transition-[transform,filter,box-shadow] duration-150 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_16px_42px_rgba(108,77,255,.68)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#100b22] active:scale-[0.98] md:min-h-[58px] md:w-auto md:max-w-none md:px-14"
        >
          <Wand2 className="h-5 w-5 shrink-0 transition-transform duration-150 group-hover:rotate-12" />
          <span className="whitespace-nowrap">게임 시작하기</span>
          <Sparkles className="h-5 w-5 shrink-0 text-violet-100 transition-transform duration-150 group-hover:scale-110" />
        </button>

        <p className="mt-3 max-w-[90vw] text-[clamp(0.76rem,3.2vw,0.875rem)] font-medium text-violet-100/85 drop-shadow-[0_2px_8px_rgba(10,6,26,0.9)] break-keep">
          20개의 애니메이션 세계 중 이야기를 골라 보세요
        </p>
      </section>
    </main>
  );
}
