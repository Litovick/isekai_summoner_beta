import { Suspense, lazy } from "react";
import { GameProvider, useGame } from "./contexts/GameContext";
import TitleScreen from "./components/game/TitleScreen";
import WorldSelectScreen from "./components/game/WorldSelectScreen";

const AttackGame = lazy(() => import("./games/attack/AttackGame").then(m => ({ default: m.AttackGame })));
const SugarSugarRuneGame = lazy(() => import("./games/sugarsugarune/SugarSugarRuneGame"));
const YumeiroGame = lazy(() => import("./games/yumeiro/YumeiroGame"));
const SlamDunkGame = lazy(() => import("./games/slamdunk/SlamDunkLazyEntry"));
const DemonSlayerGame = lazy(() => import("./games/demonslayer/Game").then(m => ({ default: m.DemonSlayerGame })));
const NarutoGame = lazy(() => import("./games/naruto/Game").then(m => ({ default: m.NarutoGame })));
const BleachGame = lazy(() => import("./games/bleach/Game").then(m => ({ default: m.BleachGame })));
const OnePieceGame = lazy(() => import("./games/onepiece/Game").then(m => ({ default: m.OnePieceGame })));

function Screens() {
  const { screen, notice, closeNotice, openWorldSelect } = useGame();
  const inGame =
    screen === "aot" ||
    screen === "slamdunk" ||
    screen === "yumeiro" ||
    screen === "sugarsugarrune" ||
    screen === "demonslayer" ||
    screen === "naruto" ||
    screen === "bleach" ||
    screen === "onepiece";

  return (
    <>
      {inGame ? (
        <div className="app-dvh-shell overflow-x-hidden bg-[#100b22]">
          <div className="sticky top-0 z-[100] flex items-center justify-between gap-3 border-b border-violet-400/25 bg-[#100b22]/95 px-3 py-2.5 text-white md:backdrop-blur-sm sm:px-4 sm:py-3">
            <button
              type="button"
              onClick={openWorldSelect}
              className="min-h-[40px] rounded-full border border-violet-400/50 bg-violet-700 px-3.5 py-2 text-xs font-bold transition-colors duration-150 hover:bg-violet-600 sm:px-4 sm:text-sm"
            >
              ← 작품 선택으로 돌아가기
            </button>
            <span className="text-xs text-violet-200">이세계 소환</span>
          </div>
          <Suspense
            fallback={
              <div className="flex min-h-[50dvh] items-center justify-center p-10 text-center text-sm font-semibold text-violet-100">
                게임을 불러오는 중...
              </div>
            }
          >
            {screen === "aot" ? (
              <div className="aot-game">
                <AttackGame />
              </div>
            ) : screen === "slamdunk" ? (
              <SlamDunkGame />
            ) : screen === "sugarsugarrune" ? (
              <SugarSugarRuneGame />
            ) : screen === "demonslayer" ? (
              <DemonSlayerGame onReturnWorldSelect={openWorldSelect} />
            ) : screen === "naruto" ? (
              <NarutoGame onReturnWorldSelect={openWorldSelect} />
            ) : screen === "bleach" ? (
              <BleachGame onReturnWorldSelect={openWorldSelect} />
            ) : screen === "onepiece" ? (
              <OnePieceGame onReturnWorldSelect={openWorldSelect} />
            ) : (
              <YumeiroGame />
            )}
          </Suspense>
        </div>
      ) : (
        <div className="app-dvh-shell overflow-x-hidden bg-[#100b22]">
          {screen === "title" ? <TitleScreen /> : <WorldSelectScreen />}
        </div>
      )}
      {notice && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 p-5"
          role="dialog"
          aria-modal="true"
          aria-label="게임 준비 중"
        >
          <div className="max-w-sm rounded-2xl border border-violet-400/40 bg-[#201437] p-8 text-center text-white shadow-2xl">
            <h2 className="text-2xl font-bold">아직 준비 중이에요</h2>
            <p className="mt-3 text-violet-200">새로운 이세계 게임이 곧 추가됩니다.</p>
            <button
              type="button"
              onClick={closeNotice}
              className="mt-6 min-h-[48px] rounded-full bg-[#6C4DFF] px-8 py-3 font-bold transition-colors duration-150 hover:bg-[#795eff]"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <GameProvider>
      <Screens />
    </GameProvider>
  );
}

