import {useEffect,useState} from "react";
import "./styles.css";
import {EndingShareAndReward} from "../../components/EndingShareAndReward";
import {missions,endings,outcome,type Outcome} from "./game/attack-data";
import {Scene,useTypewriter,beep} from "./Scene";
import {homeBackground,missionBackgrounds,portraits} from "./game/attack-images";
type Phase="home"|"story"|"choice"|"reaction"|"end";
type Save={phase:Phase;index:number;survival:number;trust:number;answers:number[]};
const initial:Save={phase:"home",index:0,survival:50,trust:50,answers:[]};
const key="game:attack-on-titan:v2",galleryKey="game:attack-on-titan:gallery";
const clamp=(n:number)=>Math.max(0,Math.min(100,n));
function Gauge({name,value,color}:{name:string;value:number;color:string}){return <div className="border border-[#707b6c] bg-[#273029]/90 p-2"><div className="mb-1 flex justify-between text-xs"><span>{name}</span><b>{value}/100</b></div><div className="h-2 bg-[#111713]"><div className="h-full transition-all duration-700" style={{width:value+"%",background:color}}/></div></div>}
const reviews=(s:Save)=>[
{name:"리바이",text:s.survival>=80?"살아남는 것도 실력이다. 그 판단을 유지해라.":"운에만 기대서는 오래 살아남지 못한다."},
{name:"엘빈",text:s.answers[8]===1?"위험을 계산하며 임무를 수행했다. 좋은 판단이었다.":"결정에는 반드시 대가가 따른다. 그것을 잊지 말게."},
{name:"미카사",text:s.trust>=80?"동료를 지키려 했다는 걸 알아. 고마워.":"다음에는 주변 사람들의 위치도 살펴줘."},
{name:"아르민",text:s.answers[7]===1?"지형을 활용한 선택이 모두에게 도움이 됐어.":"다른 방법도 있었을 거야. 다음엔 함께 생각해 보자."}
];
export function AttackGame(){
 const [s,setS]=useState<Save>(initial),[savedGame,setSavedGame]=useState<Save|null>(null),[loaded,setLoaded]=useState(false),[gallery,setGallery]=useState<Outcome[]>([]),[showGallery,setShowGallery]=useState(false),[showReviews,setShowReviews]=useState(false),[muted,setMuted]=useState(false);
 useEffect(()=>{try{const raw=localStorage.getItem(key);if(raw){const saved=JSON.parse(raw) as Save;if(saved&&Array.isArray(saved.answers)&&saved.index>=0&&saved.index<=missions.length&&saved.phase!=="home"&&saved.phase!=="end")setSavedGame(saved)}const g=JSON.parse(localStorage.getItem(galleryKey)||"[]");if(Array.isArray(g))setGallery(g.filter((v):v is Outcome=>typeof v==="string"&&v in endings));setMuted(localStorage.getItem("aot:muted")==="1")}catch{}setLoaded(true)},[]);
 useEffect(()=>{if(loaded&&s.phase!=="home"&&s.phase!=="end")try{localStorage.setItem(key,JSON.stringify(s));setSavedGame(s)}catch{}},[loaded,s]);
 useEffect(()=>{if(loaded)try{localStorage.setItem("aot:muted",muted?"1":"0")}catch{}},[muted,loaded]);
 const result=outcome(s.survival,s.trust,s.answers[9]??-1);
 useEffect(()=>{if(!loaded||s.phase!=="end")return;setSavedGame(null);try{localStorage.removeItem(key)}catch{}setGallery(prev=>{if(prev.includes(result))return prev;const next=[...prev,result];try{localStorage.setItem(galleryKey,JSON.stringify(next))}catch{}return next})},[loaded,s.phase,result]);
 const q=missions[Math.min(s.index,missions.length-1)]!,last=s.answers[s.answers.length-1]??0;
 const dialogue=s.phase==="story"?q.story:s.phase==="reaction"?q.choices[last]?.reaction??"":s.phase==="end"?endings[result].description:"";
 const typed=useTypewriter(dialogue);
 const sound=(kind:"click"|"good"|"bad"="click")=>beep(kind,muted);
 const start=()=>{sound();setS({...initial,phase:"story"});setSavedGame(null);setShowGallery(false);setShowReviews(false)};
 const resume=()=>{if(!savedGame)return;sound();setS(savedGame);setShowGallery(false)};
 const goHome=()=>{sound();setS(p=>({...p,phase:"home"}));setShowGallery(false);setShowReviews(false)};
 const pick=(i:number)=>{if(s.phase!=="choice")return;const c=q.choices[i]!;sound(c.survival+c.trust>=0?"good":"bad");setS(p=>({...p,phase:"reaction",answers:[...p.answers,i],survival:clamp(p.survival+c.survival),trust:clamp(p.trust+c.trust)}))};
 const next=()=>{sound();if(!typed.done){typed.finish();return}if(s.phase==="story"){setS(p=>({...p,phase:"choice"}));return}if(s.phase==="reaction"){setS(p=>({...p,index:p.index+1,phase:p.index===missions.length-1?"end":"story"}))}};
 const endingArt:Record<Outcome,string>={hero:missionBackgrounds[9],survivor:missionBackgrounds[6],sacrifice:missionBackgrounds[8],fallen:missionBackgrounds[3]};
 const Gallery=()=> <div className="aot-gallery-grid">{(Object.keys(endings) as Outcome[]).map((k,i)=>{const unlocked=gallery.includes(k);return <article key={k} className={"aot-ending-card "+(unlocked?"aot-ending-card--unlocked":"aot-ending-card--locked")}>
 <div className="aot-ending-art"><img src={endingArt[k]} alt={unlocked?endings[k].title+" 엔딩 배경":""} loading="lazy"/><span className="aot-ending-number">RECORD {String(i+1).padStart(2,"0")}</span>{!unlocked&&<span className="aot-ending-lock" aria-label="미해금">🔒</span>}</div>
 <div className="aot-ending-info"><b>{unlocked?endings[k].title:"??? 잠긴 엔딩"}</b><p>{unlocked?endings[k].subtitle:"다른 선택으로 해금"}</p>{unlocked&&<p className="aot-ending-description">{endings[k].description}</p>}</div></article>})}</div>;
 if(!loaded)return <main className="min-h-screen bg-[#151a17]"/>;
 return <main className="aot-app bg-[#151a17] font-sans text-[#e9e3d4]"><div className="aot-shell mx-auto max-w-6xl">
 <header className="mb-3 flex items-center justify-between gap-2 border-b border-[#89937b]/40 pb-3"><button onClick={goHome} className="text-left text-sm font-bold tracking-widest text-[#c5b99d]" aria-label="메인 메뉴로 이동">⚔ 조사병단 생존 시뮬레이션</button><button onClick={()=>setMuted(m=>!m)} className="border border-[#778475] px-3 py-1 text-xs">{muted?"🔇 음소거":"🔊 소리 켜짐"}</button></header>
 {showGallery?<section className="aot-gallery-screen" aria-label="엔딩 컬렉션"><div className="aot-gallery-header"><div><p className="text-xs tracking-[.3em] text-[#b9a982]">EXPEDITION ARCHIVE</p><h2 className="mt-2 font-display text-3xl md:text-5xl">엔딩 컬렉션</h2><p className="mt-2 text-[#c0bba8]">해금한 엔딩 {gallery.length} / {Object.keys(endings).length}</p></div><button onClick={()=>setShowGallery(false)} className="aot-outline">← 돌아가기</button></div><Gallery/></section>:
 s.phase==="home"?<section className="aot-menu" aria-label="진격의 거인 메인 메뉴" style={{backgroundImage:`linear-gradient(90deg,rgba(10,18,15,.96) 0%,rgba(10,18,15,.86) 43%,rgba(10,18,15,.28) 100%),url(${homeBackground})`}}>
 <div className="aot-menu-top"><span>WALL MARIA · SURVEY CORPS</span><span>EXPEDITION / 001</span></div>
 <div className="aot-menu-content"><p className="aot-menu-eyebrow">인류의 자유를 위한 열 번의 선택</p><h1 className="aot-menu-title">진격의<br/><span>거인</span></h1><div className="aot-menu-rule"/><h2 className="aot-menu-subtitle">조사병단 생존 시뮬레이션</h2><p className="aot-menu-description">벽 밖으로 향하는 순간, 모든 판단에는 대가가 따른다.<br/>당신은 동료를 지키고 살아 돌아올 수 있을까?</p>
 <nav className="aot-menu-actions" aria-label="게임 메뉴"><button onClick={start} className="aot-menu-start"><span>01</span> 새 원정 시작 <span aria-hidden="true">↗</span></button>{savedGame&&<button onClick={resume} className="aot-menu-option"><span>02</span> 이어하기 <small>MISSION {String(savedGame.index+1).padStart(2,"0")}</small></button>}<button onClick={()=>setShowGallery(true)} className="aot-menu-option"><span>{savedGame?"03":"02"}</span> 엔딩 컬렉션 <small>{gallery.length} / {Object.keys(endings).length} 해금</small></button></nav>
 </div><div className="aot-menu-bottom"><span>SHINZOU WO SASAGEYO</span><span>선택이 운명을 결정한다</span></div>
 </section>:
 s.phase==="end"?<section className="aot-end-screen mx-auto max-w-3xl text-center"><p className="text-sm tracking-[.35em] text-[#b9a982]">EXPEDITION COMPLETE</p><h2 className="mt-5 font-display text-4xl md:text-5xl">{endings[result].title}</h2><p className="my-4 text-xl text-[#d4c6a4]">{endings[result].subtitle}</p><Scene index={9} speaker="리바이" mode="ending"><div className="aot-speaker">작전 결과</div><p className="aot-line">{typed.shown}</p><button onClick={()=>typed.finish()} className="aot-next">{typed.done?"작전 종료":"대사 전체 보기"} ▸</button></Scene><div className="mt-5 grid grid-cols-2 gap-3"><Gauge name="생존 가능성" value={s.survival} color="#b66b57"/><Gauge name="동료 신뢰도" value={s.trust} color="#9cad8a"/></div><div className="mt-7 flex flex-wrap justify-center gap-3"><button onClick={()=>setShowReviews(v=>!v)} className="aot-primary">캐릭터 평가 {showReviews?"닫기":"보기"}</button><button onClick={()=>setShowGallery(v=>!v)} className="aot-outline">엔딩 컬렉션</button><button onClick={start} className="aot-outline">다시 도전</button></div>{showReviews&&<div className="aot-review-grid" aria-label="캐릭터 평가">{reviews(s).map(r=><article key={r.name} className="aot-review-card"><div className="aot-review-portrait"><img src={portraits[r.name]} alt={r.name} loading="lazy"/></div><div className="aot-review-copy"><b>{r.name}</b><p>{r.text}</p></div></article>)}</div>}<EndingShareAndReward gameId="aot" animeTitle="진격의 거인" endingTitle={endings[result].title}/></section>:
 <section><div className="mb-3 flex items-center justify-between gap-3 text-xs tracking-widest text-[#d4c6a4]"><span>MISSION {String(s.index+1).padStart(2,"0")} / 10</span><span>{q.place}</span></div><div className="mb-3 grid grid-cols-2 gap-3"><Gauge name="생존 가능성" value={s.survival} color="#b66b57"/><Gauge name="동료 신뢰도" value={s.trust} color="#9cad8a"/></div>
 <Scene index={s.index} speaker={s.phase==="reaction"?(q.choices[last]?.reaction.split(":")[0]||q.speaker):q.speaker} mood={s.phase==="reaction"?(q.choices[last]?.survival??0)<0?"bad":"good":"neutral"} mode={s.phase}>
 <div className="aot-speaker">{s.phase==="reaction"?"선택의 결과":q.speaker} <span> / {q.title}</span></div>
 {s.phase==="story"?<button onClick={next} className="aot-dialogue-button"><p className="aot-line">{typed.shown}<span className="aot-caret">▍</span></p><span className="aot-next">{typed.done?"선택지 보기":"계속"} ▸</span></button>:
 s.phase==="choice"?<div><p className="mb-3 text-sm text-[#d8c9a6]">당신은 어떻게 행동할 것인가?</p><div className="grid gap-2">{q.choices.map((c,i)=><button key={i} onClick={()=>pick(i)} className="aot-choice"><b>{"ABC"[i]}</b>{c.label}</button>)}</div></div>:
 <button onClick={next} className="aot-dialogue-button"><p className="aot-line">{typed.shown}<span className="aot-caret">▍</span></p><span className="aot-next">{typed.done?(s.index===9?"최종 결과 보기":"다음 임무"):"계속"} ▸</span></button>}
 </Scene></section>}
 </div></main>
}
