import { Suspense, lazy } from "react";
import { GameProvider, useGame } from "./contexts/GameContext";
import TitleScreen from "./components/game/TitleScreen";
import WorldSelectScreen from "./components/game/WorldSelectScreen";
const AttackGame = lazy(() => import("./games/attack/AttackGame").then(m => ({default:m.AttackGame})));
const SugarSugarRuneGame = lazy(() => import("./games/sugarsugarune/SugarSugarRuneGame"));
const YumeiroGame = lazy(() => import("./games/yumeiro/YumeiroGame"));
const SlamGame = lazy(() => import("./games/slamdunk/components/Game").then(m => ({default:m.Game})));
const DemonSlayerGame = lazy(() => import("./games/demonslayer/Game").then(m => ({default:m.DemonSlayerGame})));
const NarutoGame = lazy(() => import("./games/naruto/Game").then(m => ({default:m.NarutoGame})));
import { slamdunk } from "./games/slamdunk/game/themes/slamdunk";
import "./games/attack/styles.css";
import "./games/slamdunk/styles.css";
function Screens() {
 const {screen,notice,closeNotice,openWorldSelect} = useGame();
 const inGame = screen === "aot" || screen === "slamdunk" || screen === "yumeiro" || screen === "sugarsugarrune" || screen === "demonslayer" || screen === "naruto";
 return <>
 {inGame ? <div className="min-h-screen bg-[#100b22]"><div className="sticky top-0 z-[100] flex items-center justify-between gap-3 border-b border-violet-400/25 bg-[#100b22]/95 px-4 py-3 text-white backdrop-blur"><button type="button" onClick={openWorldSelect} className="rounded-full border border-violet-400/50 bg-violet-700 px-4 py-2 text-sm font-bold hover:bg-violet-600">← 작품 선택으로 돌아가기</button><span className="text-xs text-violet-200">이세계 소환</span></div><Suspense fallback={<div className="p-10 text-center text-white">게임을 불러오는 중...</div>}>{screen === "aot" ? <div className="aot-game"><AttackGame /></div> : screen === "slamdunk" ? <div className="slam-game"><SlamGame theme={slamdunk} /></div> : screen === "sugarsugarrune" ? <SugarSugarRuneGame /> : screen === "demonslayer" ? <DemonSlayerGame onReturnWorldSelect={openWorldSelect} /> : screen === "naruto" ? <NarutoGame onReturnWorldSelect={openWorldSelect} /> : <YumeiroGame />}</Suspense></div> : <div className="min-h-screen bg-[#100b22]">{screen === "title" ? <TitleScreen /> : <WorldSelectScreen />}</div>}
 {notice && <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 p-5" role="dialog" aria-modal="true" aria-label="게임 준비 중"><div className="max-w-sm rounded-2xl border border-violet-400/40 bg-[#201437] p-8 text-center text-white shadow-2xl"><h2 className="text-2xl font-bold">아직 준비 중이에요</h2><p className="mt-3 text-violet-200">새로운 이세계 게임이 곧 추가됩니다.</p><button onClick={closeNotice} className="mt-6 rounded-full bg-[#6C4DFF] px-8 py-3 font-bold">확인</button></div></div>}
 </>;
}
export default function App(){return <GameProvider><Screens/></GameProvider>}
