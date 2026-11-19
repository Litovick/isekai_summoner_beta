import {useEffect,useState} from "react";
import {ChefHat,Heart,ArrowRight,RotateCcw,Save,Sparkles} from "lucide-react";
import {stages,clamp,dessertOf,endingOf,type Dessert} from "./story";
import cover from "../../assets/anime/17_yumeiro.webp";
import {characterArt,sceneArt,dessertArt} from "./art";
import {EndingShareAndReward} from "../../components/EndingShareAndReward";
import "./styles.css";
type SaveData={step:number;skill:number;team:number;history:number[];phase:"intro"|"choose"|"reaction"|"end";last:number};
const initial:SaveData={step:0,skill:50,team:50,history:[],phase:"intro",last:0};
const KEY="isekai-yumeiro-v1";
const desserts:Record<Dessert,{name:string;icon:string;desc:string}>={strawberry:{name:"딸기 타르트",icon:"🍓",desc:"친구들의 마음을 담은 부드러운 달콤함"},chocolate:{name:"초콜릿 케이크",icon:"🍫",desc:"섬세한 기술로 완성한 깊은 풍미"},creative:{name:"창작 디저트",icon:"🍰",desc:"자신만의 상상력을 담은 새로운 맛"}};
function load():SaveData{try{const v=JSON.parse(localStorage.getItem(KEY)||"null");if(v&&Number.isInteger(v.step)&&v.step>=0&&v.step<stages.length&&Array.isArray(v.history)&&["intro","choose","reaction","end"].includes(v.phase))return v}catch{}return initial}
export default function YumeiroGame(){
const [game,setGame]=useState<SaveData>(load);
const [started,setStarted]=useState(false);
const [visible,setVisible]=useState(0);
const scene=stages[game.step];
const speakerName=game.phase==="reaction"?scene.choices[game.last].speaker:scene.speaker;
const result=game.phase==="end"?endingOf(game.skill,game.team):null;
const dessert=dessertOf(game.history);
const grade=game.skill>=75&&game.team>=75?"완벽":game.skill<40||game.team<40?"미완성":"정성 가득";
const endCopy={happy:{title:"꿈을 담은 최고의 디저트",desc:"스위트 콘테스트 우승! 모두가 네 디저트에 감탄했어.",comment:"원가온: …제법인데. 다음엔 나와 겨뤄 보자."},normal:{title:"아직 끝나지 않은 꿈",desc:"우승은 놓쳤지만, 네 가능성을 모두가 알아봤어.",comment:"안도하: 오늘 배운 걸 잊지 않으면 다음엔 더 잘할 거야."},sad:{title:"달콤하지만 씁쓸한 도전",desc:"디저트가 뜻대로 완성되지 않았어. 하지만 꿈은 계속돼.",comment:"감딸기: 괜찮아! 우리 다시 도전하자!"}};
useEffect(()=>{localStorage.setItem(KEY,JSON.stringify(game))},[game]);
const spoken=game.phase==="reaction"?scene.choices[game.last].response:scene.dialogue;
useEffect(()=>{setVisible(0);if(!started||game.phase==="end")return;const timer=window.setInterval(()=>setVisible(v=>Math.min(spoken.length,v+2)),25);return()=>clearInterval(timer)},[game.step,game.phase,game.last,started,spoken]);
const choose=(index:number)=>{const option=scene.choices[index];setGame(g=>({...g,skill:clamp(g.skill+option.skill),team:clamp(g.team+option.team),history:[...g.history,index],last:index,phase:"reaction"}))};
const advance=()=>setGame(g=>g.step===stages.length-1?{...g,phase:"end"}:{...g,step:g.step+1,phase:"intro",last:0});
const restart=()=>{setGame(initial);setStarted(true)};
const complete=visible>=spoken.length;
return <main className="yumeiro min-h-[calc(100vh-58px)] text-[#5b3543]">
<div className="ym-glitter" aria-hidden="true">✦　·　✧　　✦　·　✧</div>
{!started?<section className="ym-title"><div className="ym-crown">✧ SAINT MARIE ACADEMY ✧</div><img className="ym-cover" src={`${import.meta.env.BASE_URL}yumeiro/cover.webp.webp`} alt="꿈빛 파티시엘 한국판 포스터" onError={e=>{e.currentTarget.src=cover}} /><h1>꿈빛 파티시엘</h1><h2>Sweet Challenge</h2><p>감딸기와 스위트 왕자들과 함께<br/>세상에서 하나뿐인 디저트를 완성해 봐!</p><button className="ym-primary" onClick={()=>{setGame(initial);setStarted(true)}}>새 게임 시작 <ArrowRight size={18}/></button>{(game.history.length>0||game.step>0)&&<button className="ym-outline" onClick={()=>setStarted(true)}><Save size={16}/> 이어하기</button>}</section>:
<section className="ym-layout">
<header className="ym-header"><div><span className="ym-small">SAINT MARIE ACADEMY</span><h1>꿈빛 파티시엘 <span>✧</span></h1></div><div className="ym-stats"><div><label><ChefHat size={16}/> 제과 실력 <b>{game.skill}</b></label><div className="ym-meter"><i style={{width:game.skill+"%",background:"#c18b47"}}/></div></div><div><label><Heart size={16}/> 팀워크 <b>{game.team}</b></label><div className="ym-meter"><i style={{width:game.team+"%",background:"#ed8fa5"}}/></div></div></div></header>
{result?<div className="ym-end"><span className="ym-small">CONTEST RESULT</span><div className="ym-dessert"><img src={dessertArt[dessert]} alt={desserts[dessert].name+" 디저트 일러스트"} onError={e=>{e.currentTarget.src=cover}} /></div><h2>{endCopy[result].title}</h2><p>{endCopy[result].desc}</p><h3>{grade} · {desserts[dessert].name}</h3><p>{desserts[dessert].desc}</p><div className="ym-end-scores">제과 실력 {game.skill} / 팀워크 {game.team}</div><blockquote>{endCopy[result].comment}</blockquote><button className="ym-primary" onClick={restart}><RotateCcw size={17}/> 다시 도전하기</button><EndingShareAndReward gameId="yumeiro" animeTitle="꿈빛 파티시엘" endingTitle={endCopy[result].title}/></div>:
<>
<div className="ym-progress"><span>EPISODE {String(game.step+1).padStart(2,"0")} / 10</span><span>{scene.location}</span></div><div className={`ym-scene ym-stage-${game.step}`}><img className="ym-stage-background" src={sceneArt[game.step]} alt="" aria-hidden="true" onError={e=>{e.currentTarget.src=cover}}/><div className="ym-stage-tint" />
<div className="ym-scene-decor"><span>✧</span><span>🍰</span><span>✦</span></div>
<div className={`ym-character-stage ${speakerName==="바닐라"?"ym-fairy":""}`}><img className="ym-character-image" key={speakerName} src={characterArt[speakerName]} alt={speakerName+" 캐릭터 이미지"} onError={e=>{e.currentTarget.style.display="none"}} /></div>
<div className="ym-scene-label">{scene.title}</div>
<div className="ym-dialogue"><div className="ym-name">{game.phase==="reaction"?scene.choices[game.last].speaker:scene.speaker}</div><p>{spoken.slice(0,visible)}{!complete&&<span className="ym-cursor">▌</span>}</p>{game.phase==="reaction"&&<div className="ym-change"><span>제과 실력 {scene.choices[game.last].skill>0?"+":""}{scene.choices[game.last].skill}</span><span>팀워크 {scene.choices[game.last].team>0?"+":""}{scene.choices[game.last].team}</span></div>}</div>
</div>
<div className="ym-actions">{game.phase==="intro"?(complete?<div className="ym-choices">{scene.choices.map((choice,i)=><button key={i} onClick={()=>choose(i)}><b>0{i+1}</b>{choice.text}<ArrowRight size={16}/></button>)}</div>:<button className="ym-primary" onClick={()=>setVisible(spoken.length)}>대사 넘기기 <ArrowRight size={16}/></button>):<button className="ym-primary" onClick={()=>complete?advance():setVisible(spoken.length)}>{complete?(game.step===9?"결과 확인":"다음 이야기"):"대사 넘기기"} <ArrowRight size={16}/></button>}</div>
</>}
<footer className="ym-footer"><Sparkles size={15}/> 당신의 선택이 디저트의 맛과 미래를 바꿉니다. <span>자동 저장 중</span></footer>
</section>}
</main>}
