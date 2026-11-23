import { Suspense, lazy, useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { GameProvider, useGame } from "./contexts/GameContext";
import TitleScreen from "./components/game/TitleScreen";
import WorldSelectScreen from "./components/game/WorldSelectScreen";
import {
  getGlobalAudioMuted,
  installMobileAudioUnlock,
  subscribeGlobalAudioMuted,
  toggleGlobalAudioMuted,
} from "./utils/mobileAudio";

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
  const [globalMuted, setGlobalMuted] = useState<boolean>(() => getGlobalAudioMuted());

  useEffect(() => {
    setGlobalMuted(getGlobalAudioMuted());
    return subscribeGlobalAudioMuted(setGlobalMuted);
  }, []);

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
        <div className="app-dvh-shell min-h-screen min-h-[100dvh] overflow-x-hidden bg-[#100b22]">
          <div className="sticky top-0 z-[100] flex items-center justify-between gap-2 border-b border-violet-400/25 bg-[#100b22]/95 px-[clamp(0.625rem,3vw,1rem)] pb-1.5 pt-[max(0.375rem,env(safe-area-inset-top,0px))] text-white md:backdrop-blur-sm sm:py-2.5">
            <button
              type="button"
              onClick={openWorldSelect}
              className="min-h-[36px] rounded-full border border-violet-400/50 bg-violet-700 px-3 py-1.5 text-[clamp(0.72rem,3vw,0.875rem)] font-bold leading-tight transition-colors duration-150 hover:bg-violet-600 sm:min-h-[40px] sm:px-4 sm:py-2"
            >
              ← 작품 선택으로 돌아가기
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleGlobalAudioMuted()}
                aria-pressed={globalMuted}
                aria-label={globalMuted ? "게임 소리 켜기" : "게임 음소거"}
                title={globalMuted ? "게임 소리 켜기" : "게임 음소거"}
                data-testid="global-sound-toggle"
                className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-full border px-3 py-1.5 text-[clamp(0.7rem,2.8vw,0.84rem)] font-bold leading-tight transition-colors duration-150 sm:min-h-[40px] sm:px-3.5 sm:py-2 ${
                  globalMuted
                    ? "border-rose-400/50 bg-rose-950/75 text-rose-200 hover:bg-rose-900/80"
                    : "border-violet-400/50 bg-violet-800/75 text-violet-100 hover:bg-violet-700/80"
                }`}
              >
                {globalMuted ? (
                  <VolumeX className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                )}
                <span>{globalMuted ? "음소거" : "소리 켜짐"}</span>
              </button>
              <span className="hidden shrink-0 text-[clamp(0.7rem,2.8vw,0.8rem)] text-violet-200 sm:inline">
                이세계 소환
              </span>
            </div>
          </div>
          <Suspense
            fallback={
              <div className="flex min-h-[50dvh] items-center justify-center px-4 py-10 text-center text-[clamp(0.85rem,3.4vw,0.95rem)] font-semibold text-violet-100">
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
        <div className="app-dvh-shell min-h-screen min-h-[100dvh] overflow-x-hidden bg-[#100b22]">
          {screen === "title" ? <TitleScreen /> : <WorldSelectScreen />}
        </div>
      )}
      {notice && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]"
          role="dialog"
          aria-modal="true"
          aria-label="게임 준비 중"
        >
          <div className="w-full max-w-sm rounded-2xl border border-violet-400/40 bg-[#201437] p-[clamp(1.25rem,5vw,2rem)] text-center text-white shadow-2xl">
            <h2 className="text-[clamp(1.25rem,5vw,1.5rem)] font-bold">아직 준비 중이에요</h2>
            <p className="mt-3 text-[clamp(0.875rem,3.6vw,1rem)] text-violet-200">
              새로운 이세계 게임이 곧 추가됩니다.
            </p>
            <button
              type="button"
              onClick={closeNotice}
              className="mt-6 min-h-[48px] w-full rounded-full bg-[#6C4DFF] px-8 py-3 text-[clamp(0.9rem,3.6vw,1rem)] font-bold transition-colors duration-150 hover:bg-[#795eff] sm:w-auto"
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
  useEffect(() => installMobileAudioUnlock(), []);

  return (
    <GameProvider>
      <Screens />
    </GameProvider>
  );
}

