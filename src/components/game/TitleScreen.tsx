import { useGame } from "@/contexts/GameContext";

const DESKTOP_BG_SRC = "/assets/main_bg_desktop.png";
const MOBILE_BG_SRC = "/assets/main_bg_mobile.png";

export default function TitleScreen() {
  const { openWorldSelect } = useGame();

  return (
    <main
      className="animate-screen-fast relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-[#241C5E] select-none"
      data-testid="title-screen"
    >
      <h1 className="sr-only">라프텔 이세계 소환사</h1>

      {/* Desktop (>= 768px): <img> tightly wrapped in aspect-matched relative frame so % button coordinates never drift */}
      <div className="relative hidden aspect-[1844/853] w-[min(100vw,calc(100dvh*1844/853))] md:block">
        <img
          src={DESKTOP_BG_SRC}
          alt="라프텔 이세계 소환사 메인 화면"
          decoding="async"
          className="block h-full w-full object-contain"
          draggable={false}
          data-testid="title-hero-desktop"
        />

        <button
          type="button"
          onClick={openWorldSelect}
          data-testid="title-start-button-desktop"
          aria-label="게임 시작하기 — 애니메이션 세계 선택으로 이동"
          className="absolute left-[4.3%] top-[66.5%] flex h-[8.5%] w-[14.3%] items-center justify-center rounded-full bg-[#FFFFFF] text-[clamp(12px,1.2vw,20px)] font-extrabold tracking-tight text-[#1E1B4B] shadow-[0_6px_20px_rgba(30,27,75,0.28)] transition-transform duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#241C5E] active:scale-95"
        >
          <span className="whitespace-nowrap leading-none">게임 시작하기 &gt;</span>
        </button>
      </div>

      {/* Mobile (< 768px): <img> tightly wrapped in relative w-full frame so % button coordinates stay anchored to the image */}
      <div className="relative block w-full max-w-[calc(100dvh*1055/1491)] md:hidden">
        <img
          src={MOBILE_BG_SRC}
          alt="라프텔 이세계 소환사 모바일 메인 화면"
          decoding="async"
          className="block h-auto w-full"
          draggable={false}
          data-testid="title-hero-mobile"
        />

        <button
          type="button"
          onClick={openWorldSelect}
          data-testid="title-start-button-mobile"
          aria-label="게임 시작하기 — 애니메이션 세계 선택으로 이동"
          className="absolute left-1/2 top-[77%] flex w-[46%] max-w-[210px] -translate-x-1/2 items-center justify-center rounded-full bg-white py-2.5 text-[clamp(13px,3.8vw,18px)] font-bold tracking-tight text-[#1E1B4B] shadow-lg transition-transform duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#241C5E] active:scale-95"
        >
          <span className="whitespace-nowrap leading-none">게임 시작하기 &gt;</span>
        </button>
      </div>
    </main>
  );
}
