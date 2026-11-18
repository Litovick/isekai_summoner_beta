import { useGame } from "@/contexts/GameContext";
import { Sparkles, Wand2 } from "lucide-react";

const TITLE_BACKGROUND = "/assets/anime-summoner-hero.webp";

export default function TitleScreen() {
  const { openWorldSelect } = useGame();

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-[#100b22] text-white selection:bg-[#6C4DFF] selection:text-white">
      <img
        src={TITLE_BACKGROUND}
        alt="마법진 포털 앞에서 애니메이션 세계를 마주하는 소환사"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#170e35]/20 via-transparent to-[#100b22]/75" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#100b22]/90 to-transparent" />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 pt-5 sm:px-8 sm:pt-7">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#180f36]/45 px-3.5 py-2 text-[10px] font-bold tracking-[0.2em] text-white/85 backdrop-blur-md sm:text-xs">
          <Sparkles className="h-3.5 w-3.5 text-violet-200" />
          ANIME DIMENSION
        </span>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-80px)] max-w-7xl flex-col items-center justify-end px-4 pb-[12svh] text-center sm:pb-[10svh]">
        <div className="rounded-[2rem] border border-white/20 bg-[#120b29]/55 px-5 py-5 shadow-[0_18px_80px_rgba(30,12,83,.35)] backdrop-blur-md sm:px-10 sm:py-7">
          <h1 className="text-base font-black tracking-wide text-white sm:text-lg">이세계 소환사 : ANIME WORLD</h1>
          <p className="text-xs font-semibold tracking-[0.28em] text-violet-100/90 sm:text-sm">
            좋아하는 애니메이션 세계에서
          </p>
          <p className="mt-2 text-sm font-medium text-white/85 sm:text-base">
            선택으로 만들어 가는 나만의 이야기
          </p>
        </div>
        <button
          type="button"
          onClick={openWorldSelect}
          className="group mt-6 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#6C4DFF] px-9 py-4 text-base font-extrabold tracking-wide text-white shadow-[0_10px_40px_rgba(108,77,255,.48)] ring-1 ring-white/30 transition duration-300 hover:-translate-y-1 hover:bg-[#795eff] hover:shadow-[0_14px_52px_rgba(108,77,255,.58)] active:translate-y-0 sm:px-12 sm:text-lg"
        >
          <Wand2 className="h-5 w-5 transition-transform group-hover:rotate-12" />
          <span>소환되기</span>
          <Sparkles className="h-5 w-5 text-violet-100 transition-transform group-hover:scale-110" />
        </button>
        <p className="mt-3 text-xs text-white/75 drop-shadow sm:text-sm">20개의 애니메이션 세계 중 이야기를 골라 보세요</p>
      </section>
    </main>
  );
}
