
import { useEffect, useMemo, useState } from "react";
import { Heart, Crown, Sparkles, Volume2, VolumeX, RotateCcw, BookOpen, ArrowRight, ChevronRight, Home } from "lucide-react";
import "./styles.css";
import classroom from "../sugarsugarune_assets/backgrounds/classroom.svg";
import garden from "../sugarsugarune_assets/backgrounds/school_garden.svg";
import witchHouse from "../sugarsugarune_assets/backgrounds/witch_house.svg";
import street from "../sugarsugarune_assets/backgrounds/town_street.svg";
import darkMagic from "../sugarsugarune_assets/backgrounds/dark_magic.svg";
import palace from "../sugarsugarune_assets/backgrounds/magic_palace.svg";
import titleBackdrop from "../sugarsugarune_assets/main/title_backdrop.svg";
import pinkHeart from "../sugarsugarune_assets/items/pink_heart.svg";
import blackHeart from "../sugarsugarune_assets/items/black_heart.svg";
import goldHeart from "../sugarsugarune_assets/items/gold_heart.svg";

type Character = "쇼콜라"|"바닐라"|"피에르"|"로빈"|"나"|"내레이션";
type Line = {who:Character; text:string};
type Choice = {text:string;heart:number;virtue:number;reaction:Line[]};
type Stage = {title:string;location:string;background:string;cast:Character[];lines:Line[];prompt:string;choices:[Choice,Choice,Choice]};
type Phase="title"|"guide"|"opening"|"story"|"choice"|"reaction"|"ending"|"collection";
type Save={phase:Phase;index:number;line:number;heart:number;virtue:number;answers:number[];unlocked:string[];muted:boolean};
const L=(who:Character,text:string):Line=>({who,text});
const C=(text:string,heart:number,virtue:number,who:Character,reaction:string):Choice=>({text,heart,virtue,reaction:[L(who,reaction)]});
const stages:Stage[]=[
{title:"인간계 첫 등교",location:"인간계 학교",background:classroom,cast:["쇼콜라","바닐라"],lines:[L("내레이션","인간계의 첫 아침. 여왕 후보인 당신은 쇼콜라와 바닐라와 같은 교실에 들어선다."),L("쇼콜라","흥, 인간계라고 겁먹을 필요 없어! 우리 마녀들의 매력을 보여주자!"),L("바닐라","하지만 모두가 우릴 낯설어하면 어떡하지?"),L("내레이션","학생들의 시선이 당신에게 쏠린다.")],prompt:"첫인사를 어떻게 건넬까?",choices:[C("화려한 마법으로 모두의 관심을 끈다.",15,-10,"쇼콜라","우와! 눈길은 제대로 끌었네. 근데 너무 티 난 거 아냐?"),C("솔직하고 밝게 자신을 소개한다.",10,10,"바닐라","자연스럽게 웃어 주니까 나도 용기가 나."),C("일단 조용히 관찰하며 기회를 기다린다.",-5,5,"로빈","신중함도 필요하지. 다만 기회는 기다려 주지 않는단다.")]},
{title:"첫 번째 하트",location:"학교 정원",background:garden,cast:["쇼콜라","바닐라"],lines:[L("내레이션","방과 후 정원에서 한 학생이 당신에게 호감을 표현한다."),L("쇼콜라","지금이야! 하트를 모을 기회라고!"),L("바닐라","그 애가 정말 어떤 마음인지 먼저 알아봐도 좋을 것 같아.")],prompt:"처음으로 하트를 얻을 기회다. 어떻게 할까?",choices:[C("매력 마법으로 마음을 더 크게 만든다.",15,-10,"쇼콜라","하트는 얻었지만... 그건 진짜 네 매력일까?"),C("함께 이야기하며 자연스럽게 가까워진다.",10,10,"바닐라","서로 알아가는 시간도 소중한 것 같아."),C("상대의 마음을 존중하고 수집을 미룬다.",-5,15,"로빈","하트를 놓쳐도 지킬 수 있는 것이 있지.")]},
{title:"쇼콜라의 승부",location:"학교 운동장",background:garden,cast:["쇼콜라","바닐라"],lines:[L("쇼콜라","오늘 누가 더 많은 하트를 모으는지 승부야!"),L("내레이션","하지만 쇼콜라가 준비한 마법 도구가 고장 나 당황한다."),L("쇼콜라","괜찮아! 나 혼자 해결할 수 있다고!")],prompt:"경쟁 상대가 곤란해졌다.",choices:[C("기회를 놓치지 않고 혼자 하트를 모은다.",15,-10,"쇼콜라","쳇! 오늘은 네가 앞서가네. 하지만 다음엔 안 져!"),C("쇼콜라의 도구를 함께 고친다.",5,15,"쇼콜라","도와달라고 한 적 없거든... 그래도 고마워."),C("바닐라에게 맡기고 경쟁을 계속한다.",5,-5,"바닐라","내가 도울게. 하지만 네가 함께했으면 더 좋았을 텐데.")]},
{title:"바닐라의 고민",location:"마녀들의 집",background:witchHouse,cast:["바닐라","쇼콜라"],lines:[L("내레이션","저녁이 되자 바닐라가 하트 수집 기록을 보며 한숨을 쉰다."),L("바닐라","나도 열심히 하는데... 자꾸 자신이 없어져."),L("쇼콜라","바닐라, 무슨 일이야?"),L("바닐라","아무것도 아니야. 정말이야.")],prompt:"바닐라의 표정이 어둡다.",choices:[C("점수를 비교하며 더 노력하라고 말한다.",10,-10,"바닐라","응... 더 노력해 볼게. 하지만 조금 슬프네."),C("조용히 이야기를 들어주고 곁에 있어 준다.",5,15,"바닐라","내 얘기를 들어줘서 고마워. 마음이 한결 가벼워졌어."),C("쇼콜라에게 바로 모든 고민을 전한다.",0,-5,"바닐라","걱정해 준 건 알지만... 나한테 먼저 물어봐 줬으면 좋았어.")]},
{title:"인기를 만드는 마법",location:"인간계 거리",background:street,cast:["쇼콜라","로빈"],lines:[L("내레이션","거리에 하트를 끌어당기는 신비한 향수가 등장한다."),L("쇼콜라","이거 하나면 하트가 잔뜩 모일 거야!"),L("로빈","마법은 도구일 뿐. 쓰는 사람의 마음이 더 중요하지.")],prompt:"강력한 매력 향수를 발견했다.",choices:[C("향수를 마음껏 사용해 인기를 얻는다.",20,-15,"로빈","쉽게 얻은 인기에는 대가가 따를 수도 있단다."),C("마법 없이 사람들과 진심으로 교류한다.",10,15,"쇼콜라","정말 답답하다니까! ...그래도 네 방식도 멋있네."),C("향수를 조금만 시험해 보고 멈춘다.",5,0,"로빈","절제하려는 노력은 보이는군. 결과도 잘 살펴보렴.")]},
{title:"피에르의 초대",location:"어두운 마법의 방",background:darkMagic,cast:["피에르","쇼콜라"],lines:[L("내레이션","밤이 깊어지자 피에르가 당신을 비밀스러운 장소로 초대한다."),L("피에르","여왕이 되고 싶지? 네가 원하는 힘을 줄 수도 있어."),L("쇼콜라","저 녀석의 말은 쉽게 믿지 마!")],prompt:"피에르가 강력한 마법을 제안한다.",choices:[C("제안을 받아들이고 힘을 얻는다.",20,-20,"피에르","후후, 현명한 선택일까? 그 답은 나중에 알겠지."),C("조건과 위험을 먼저 확인한다.",5,10,"피에르","의외로 신중하군. 그래서 더 흥미로워."),C("제안을 거절하고 친구들에게 돌아간다.",-5,15,"쇼콜라","잘했어! 역시 수상한 제안이었어.")]},
{title:"사라진 하트",location:"마녀들의 집",background:witchHouse,cast:["바닐라","로빈"],lines:[L("내레이션","모아 둔 하트 몇 개가 갑자기 사라졌다."),L("바닐라","어떡해... 누가 가져간 걸까?"),L("로빈","눈에 보이는 것이 언제나 진실은 아니란다.")],prompt:"하트가 사라진 원인을 찾아야 한다.",choices:[C("가장 수상한 사람을 공개적으로 추궁한다.",5,-15,"바닐라","혹시 아무 잘못 없는 사람이라면 어떡하지?"),C("마법 흔적을 조사하고 증거를 찾는다.",10,15,"로빈","침착하게 진실을 찾았구나. 훌륭한 판단이다."),C("하트를 포기하고 다시 모으기 시작한다.",-10,0,"쇼콜라","포기하기엔 너무 아깝잖아!")]},
{title:"검은 하트의 유혹",location:"그림자의 마법 공간",background:darkMagic,cast:["피에르","바닐라"],lines:[L("내레이션","어둠 속에서 검은 하트가 강한 빛을 뿜는다."),L("피에르","두려움과 질투도 힘이 될 수 있지."),L("바닐라","이상해... 저 하트를 보면 마음이 아파."),L("내레이션","검은 하트의 힘이 당신에게 손을 뻗는다.")],prompt:"위험한 힘을 앞에 두고 무엇을 할까?",choices:[C("힘을 흡수해 경쟁에서 앞서간다.",20,-25,"피에르","강해졌군. 하지만 무엇을 잃었는지는 생각해 봤어?"),C("친구를 먼저 보호하고 하트를 봉인한다.",0,20,"바닐라","고마워... 네가 있어서 무섭지 않았어."),C("피에르에게 처리를 맡기고 물러난다.",-5,-5,"피에르","결정을 남에게 맡기는 것도 하나의 선택이지.")]},
{title:"여왕 후보의 시험",location:"마계 궁전",background:palace,cast:["로빈","쇼콜라","바닐라"],lines:[L("내레이션","마계 궁전에서 여왕 후보들을 위한 마지막 시험이 시작된다."),L("로빈","이번 시험은 모은 하트의 수만으로 결정되지 않는다."),L("쇼콜라","드디어 결승이네!"),L("바닐라","우리 모두 후회 없는 선택을 했으면 좋겠어.")],prompt:"시험 도중 동료가 위험에 빠졌다.",choices:[C("시험 점수를 위해 목표 지점으로 달린다.",20,-15,"로빈","빠른 성과를 거뒀지만, 주변을 볼 여유가 부족했구나."),C("동료를 구하고 함께 시험을 완수한다.",10,20,"쇼콜라","역시! 너라면 그렇게 할 줄 알았어!"),C("도움을 요청한 뒤 혼자 시험을 이어간다.",10,5,"바닐라","도움을 부른 건 다행이야. 나도 끝까지 노력할게.")]},
{title:"마지막 하트",location:"마계의 왕좌",background:palace,cast:["쇼콜라","바닐라","로빈"],lines:[L("내레이션","여왕 선발의 마지막 순간. 빛나는 하트 하나가 왕좌 위에 떠오른다."),L("로빈","마지막 하트를 얻을 기회다. 하지만 그 선택은 네가 어떤 마녀인지 보여 줄 거야."),L("쇼콜라","어떤 결정을 하든 네 마음대로 해!"),L("바닐라","우리가 함께한 시간은 사라지지 않을 거야.")],prompt:"마지막 하트의 주인이 될 것인가?",choices:[C("망설이지 않고 마지막 하트를 차지한다.",20,-10,"로빈","승리를 향한 의지는 대단하구나. 그 힘을 어떻게 쓸지 잊지 마라."),C("모두의 마음을 확인하고 공정하게 결정한다.",10,20,"쇼콜라","좋아! 네가 정말 여왕다운 선택을 했어!"),C("하트를 양보하고 친구들의 미래를 응원한다.",-10,20,"바닐라","네가 보여 준 마음은 어떤 보석보다 아름다워.")]}
];
const opening:Line[]=[L("내레이션","마계의 여왕을 선발하는 날이 다가왔다."),L("로빈","여왕 후보들이여, 인간계로 떠나 하트를 모으도록!"),L("쇼콜라","흥! 여왕은 당연히 내가 될 거야!"),L("바닐라","우리... 서로 힘내자."),L("로빈","하지만 기억하렴. 여왕에게 필요한 것은 하트의 숫자만이 아니란다."),L("내레이션","당신의 손에 작은 하트 보석이 반짝인다. 이제 여왕 후보의 이야기가 시작된다.")];
const endings=[
{id:"queen",title:"진정한 마녀 여왕",subtitle:"하트와 진심을 모두 품은 왕관",description:"사람들의 마음을 얻는 능력과 그 마음을 지키는 용기를 모두 증명했다. 마계의 왕관이 당신을 선택한다.",icon:"👑"},
{id:"collector",title:"하트 수집의 천재",subtitle:"빛나는 하트, 남겨진 숙제",description:"누구보다 많은 하트를 모았다. 하지만 여왕이 되기 위해서는 타인의 마음을 더 깊이 이해해야 한다.",icon:"💗"},
{id:"guardian",title:"마음을 지키는 마녀",subtitle:"왕관보다 빛나는 우정",description:"여왕 선발에서는 아쉬운 결과를 얻었지만 쇼콜라와 바닐라에게 가장 소중한 친구가 되었다.",icon:"✨"},
{id:"unfinished",title:"미완성의 마녀",subtitle:"다시 시작할 수 있는 이야기",description:"이번 시험에서는 충분한 성과를 얻지 못했다. 하지만 다음 도전을 위한 마법은 이미 시작되었다.",icon:"🌙"}
] as const;
const getEnding=(h:number,v:number)=>h>=80&&v>=80?endings[0]:h>=80?endings[1]:v>=80?endings[2]:endings[3];
type Judge="쇼콜라"|"바닐라"|"피에르"|"로빈";
const judges:Judge[]=["쇼콜라","바닐라","피에르","로빈"];
// Every choice has an independent effect on each character's assessment.
// Order: Chocolat, Vanilla, Pierre, Robin. Neutral actions are scored near zero.
const judgeEffects:number[][][]=[
 [[5,-5,1,-5],[3,6,1,5],[-2,1,3,2]],
 [[4,-5,4,-5],[3,6,0,5],[0,5,-2,4]],
 [[-5,-4,4,-5],[8,4,-2,7],[-3,-2,1,-3]],
 [[-3,-7,2,-4],[3,9,-1,7],[0,-5,1,-3]],
 [[4,-5,5,-7],[5,6,-2,8],[1,0,3,2]],
 [[-6,-6,8,-8],[1,2,4,5],[8,5,-5,7]],
 [[-4,-7,2,-8],[5,6,1,9],[-2,-1,0,-3]],
 [[-7,-9,9,-10],[8,10,-5,10],[-3,-4,3,-5]],
 [[-5,-5,3,-7],[9,9,-1,10],[2,3,1,3]],
 [[-3,-4,5,-5],[8,9,-2,10],[5,10,-3,8]]
];
const judgeProfiles:Record<Judge,{focus:string;high:string;mid:string;low:string}>={
 "쇼콜라":{focus:"용기 · 우정 · 경쟁",high:"흥! 실력도 있고 친구도 챙기다니, 인정할 수밖에 없잖아! 다음엔 나랑 또 승부해!",mid:"제법인데? 하지만 진짜 강한 마녀라면 친구를 외면하지도 않아.",low:"이기려고만 하거나 너무 물러섰어. 네 방식으로 당당하게 부딪쳐 봐!"},
 "바닐라":{focus:"공감 · 배려 · 신뢰",high:"내 마음을 알아주고 다른 사람도 지켜 줬어. 네 곁이라면 나도 용기를 낼 수 있어.",mid:"좋은 마음이 느껴졌어. 조금만 더 상대의 이야기를 들어주면 좋겠어.",low:"하트보다 소중한 마음도 있어. 다른 사람의 입장에서 한 번 더 생각해 줘."},
 "피에르":{focus:"유혹 · 판단 · 독립성",high:"힘의 유혹을 알아보면서도 스스로 결정했군. 흥미로워. 쉽게 흔들리지 않는 마녀야.",mid:"가능성은 있어. 하지만 힘을 얻는 대가가 무엇인지 끝까지 생각해 봐.",low:"힘에 휘둘리거나 결정을 남에게 맡겼군. 네 선택의 대가를 감당할 수 있을까?"},
 "로빈":{focus:"책임감 · 공정함 · 여왕의 자질",high:"결과만이 아니라 과정과 책임까지 살폈구나. 여왕 후보로서 훌륭한 판단이다.",mid:"성장할 자질이 보이는군. 다만 결정이 주변에 미칠 영향도 생각해야 한다.",low:"하트를 모으는 능력만으로 여왕이 될 수는 없단다. 책임을 배워야 해."}
};
function characterAssessments(answers:number[]){
 const totals=judges.map((name,j)=>{
  const delta=answers.reduce((sum,answer,i)=>sum+(judgeEffects[i]?.[answer]?.[j]??0),0);
  const score=clamp(50+delta);
  const grade=score>=75?"S":score>=60?"A":score>=45?"B":score>=30?"C":"D";
  const profile=judgeProfiles[name];
  return {name,score,grade,focus:profile.focus,comment:score>=70?profile.high:score>=45?profile.mid:profile.low};
 });
 return totals;
}
const initial:Save={phase:"title",index:0,line:0,heart:50,virtue:50,answers:[],unlocked:[],muted:false};
const key="isekai:sugarsugarune:v1";
const clamp=(v:number)=>Math.max(0,Math.min(100,v));
const backgrounds=[classroom,garden,witchHouse,street,darkMagic,palace];
// Original anime stills (external image hosts). Existing SVGs remain as offline fallbacks.
// Each chapter has its own still. The fallback SVG remains local if a host blocks the image.
// Source scenes include the 2005 TV series and 2025 anniversary short; do not mistake the latter for TV stills.
const chapterBackdrops=[
"https://2img.net/h/i146.photobucket.com/albums/r261/NarutoTeen/Sugar%20Sugar%20Rune/28.jpg", // 01 school / heart trial
"https://image2.b-ch.com/ttl2/1142/1142020a.jpg?hh=540&impolicy=fitin&ww=960", // 02 park
"https://i.pinimg.com/originals/51/13/e3/5113e399e21134b74acd1a796b2a7879.jpg", // 03 school event
"https://im.akimg.tv.rakuten.co.jp/content/94/42/84924/main.jpg?height=540&impolicy=variable&width=960", // 04 witch home
"https://is1-ssl.mzstatic.com/image/thumb/bSTmf6lR70fSIZCjVk5Xhg/1200x675.jpg", // 05 street
"https://i1.sndcdn.com/artworks-000197285012-2iqijv-t500x500.jpg", // 06 Pierre at night
"https://2img.net/h/i146.photobucket.com/albums/r261/NarutoTeen/Sugar%20Sugar%20Rune/58.jpg", // 07 magic interior
"https://cgworld.jp/article/03_B3.jpg", // 08 dark magic / anniversary short
"https://cgworld.jp/article/04_H.jpg", // 09 castle / anniversary short
"https://is1-ssl.mzstatic.com/image/thumb/bjxuneXd3h9-4l6uf6VLhA/1200x675.jpg", // 10 final trial
] as const;
const openingBackdrop="https://2img.net/h/i146.photobucket.com/albums/r261/NarutoTeen/Sugar%20Sugar%20Rune/28.jpg";
const portraits:Partial<Record<Character,string>>={쇼콜라:`${import.meta.env.BASE_URL}sugarsugarune/characters/chocolat.png?v=5692b8ac`,바닐라:`${import.meta.env.BASE_URL}sugarsugarune/characters/vanilla.png?v=167927f4`,피에르:`${import.meta.env.BASE_URL}sugarsugarune/characters/pierre.png?v=eb8ba196`,로빈:`${import.meta.env.BASE_URL}sugarsugarune/characters/robin.png?v=ac86edb4`};
function sound(type:"click"|"good"|"bad",muted:boolean){if(muted)return;try{const Ctx=window.AudioContext;const ctx=new Ctx();const osc=ctx.createOscillator();const gain=ctx.createGain();osc.type="sine";osc.frequency.value=type==="good"?880:type==="bad"?260:600;gain.gain.setValueAtTime(.025,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.14);osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.14);osc.onended=()=>void ctx.close()}catch{/* Audio is optional */}}
function CharacterCard({name,active}:{name:Character;active:boolean}){const img=portraits[name];return <div className={`ssr-character ${active?"active":""}`}><div className="ssr-avatar">{img?<img src={img} alt={name}/>:<span>{name==="쇼콜라"?"🍫":name==="바닐라"?"🍦":name==="피에르"?"🌙":"🎩"}</span>}</div><span className="ssr-character-name">{name}</span></div>}
export default function SugarSugarRuneGame(){
const [s,setS]=useState<Save>(()=>{try{const saved=localStorage.getItem(key);if(saved){const p=JSON.parse(saved) as Save;if(p&&p.index>=0&&p.index<=10&&Array.isArray(p.answers)&&Array.isArray(p.unlocked))return p}}catch{}return initial});
const [showText,setShowText]=useState(0);
const [flash,setFlash]=useState<"good"|"bad"|null>(null);
useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(s))}catch{}},[s]);
const stage=stages[Math.min(s.index,9)];
const chosen=s.answers[s.index];
const lines=s.phase==="opening"?opening:s.phase==="story"?stage.lines:s.phase==="reaction"?(stage.choices[chosen]?.reaction??[]):[];
const current=lines[Math.min(s.line,Math.max(0,lines.length-1))];
useEffect(()=>{setShowText(0);if(!current)return;const timer=window.setInterval(()=>setShowText(v=>Math.min(current.text.length,v+2)),22);return()=>clearInterval(timer)},[current?.text,s.phase,s.index,s.line]);
const ending=useMemo(()=>getEnding(s.heart,s.virtue),[s.heart,s.virtue]);
const next=()=>{sound("click",s.muted);if(current&&showText<current.text.length){setShowText(current.text.length);return}setS(p=>{if(p.line+1<lines.length)return {...p,line:p.line+1};if(p.phase==="opening")return {...p,phase:"story",line:0};if(p.phase==="story")return {...p,phase:"choice",line:0};if(p.phase==="reaction"){if(p.index===9){const e=getEnding(p.heart,p.virtue);return {...p,phase:"ending",line:0,unlocked:Array.from(new Set([...p.unlocked,e.id]))}}return {...p,index:p.index+1,phase:"story",line:0}}return p})};
const choose=(i:number)=>{if(s.phase!=="choice"||s.answers[s.index]!==undefined)return;const c=stage.choices[i];const type=c.heart+c.virtue>=0?"good":"bad";sound(type,s.muted);setFlash(type);window.setTimeout(()=>setFlash(null),650);setS(p=>({...p,heart:clamp(p.heart+c.heart),virtue:clamp(p.virtue+c.virtue),answers:[...p.answers,i],phase:"reaction",line:0}))};
const restart=(phase:Phase="opening")=>{sound("click",s.muted);setS(p=>({...initial,phase,unlocked:p.unlocked,muted:p.muted}))};
const backdrop=s.phase==="title"||s.phase==="guide"||s.phase==="collection"?titleBackdrop:s.phase==="opening"?witchHouse:s.phase==="ending"?palace:stage.background;
const localChapterBackdrops=[1,2,3,4,5].map(n=>`${import.meta.env.BASE_URL}sugarsugarune/backgrounds/chapter ${n}.jpg`);
const sceneImage=s.phase==="title"||s.phase==="guide"||s.phase==="collection"?null:s.phase==="opening"?openingBackdrop:s.phase==="ending"?chapterBackdrops[9]:s.index<5?localChapterBackdrops[s.index]:chapterBackdrops[Math.min(s.index,9)];
return <div className="ssr-game" style={{backgroundImage:`linear-gradient(90deg,rgba(17,6,31,.68),rgba(17,6,31,.30)),url("${backdrop}")`}}><div className="ssr-backdrop-blur" aria-hidden="true" style={{backgroundImage:`url("${sceneImage??backdrop}"),url("${backdrop}")`}}/><div className="ssr-backdrop-scene" aria-hidden="true" style={{backgroundImage:`url("${sceneImage??backdrop}"),url("${backdrop}")`}}/>
<div className="ssr-vignette"/><div className="ssr-stars" aria-hidden="true">✧ · ✦ · ✧ · ✦ · ✧</div>
{flash&&<div className={`ssr-flash ${flash}`} aria-hidden="true">{flash==="good"?"✦ ♥ ✦":"✧"}</div>}
<header className="ssr-header"><div className="ssr-brand"><span>✧ SUGAR SUGAR RUNE ✧</span><small>QUEEN'S HEART TRIAL</small></div><div className="ssr-header-actions"><button aria-label={s.muted?"소리 켜기":"소리 끄기"} onClick={()=>setS(p=>({...p,muted:!p.muted}))}>{s.muted?<VolumeX size={18}/>:<Volume2 size={18}/>}</button><button onClick={()=>setS(p=>({...p,phase:"title",line:0}))} aria-label="타이틀로"><Home size={18}/></button></div></header>
{["opening","story","choice","reaction","ending"].includes(s.phase)&&<div className="ssr-hud"><div className="ssr-stat"><span><Heart size={16} fill="#ff74b3"/> 하트 포인트 <b>{s.heart}</b></span><div className="ssr-meter"><i style={{width:`${s.heart}%`,background:"linear-gradient(90deg,#e64190,#ffb2d6)"}}/></div></div><div className="ssr-stat"><span><Sparkles size={16}/> 마녀의 자질 <b>{s.virtue}</b></span><div className="ssr-meter"><i style={{width:`${s.virtue}%`,background:"linear-gradient(90deg,#8653d7,#d7a6ff)"}}/></div></div></div>}
{(s.phase==="title"||s.phase==="guide"||s.phase==="collection")&&<main className="ssr-center">
{s.phase==="title"&&<div className="ssr-title-screen"><div className="ssr-big-heart"><img src={pinkHeart} alt="마법의 하트"/></div><p className="ssr-kicker">✦ 마계 여왕 선발 시험 ✦</p><h1>슈가슈가룬</h1><h2>당신은 마녀 여왕이 될 수 있을까?</h2><p className="ssr-lead">하트를 모으고, 진심을 지켜라.<br/>당신의 선택이 마계의 미래를 바꾼다.</p><div className="ssr-buttons"><button className="primary" onClick={()=>restart()}><Crown size={20}/> 여왕 시험 시작</button><button onClick={()=>setS(p=>({...p,phase:"guide"}))}><BookOpen size={18}/> 게임 방법</button><button onClick={()=>setS(p=>({...p,phase:"collection"}))}><Heart size={18}/> 엔딩 컬렉션</button></div>{s.answers.length>0&&<p className="ssr-save-note">새 게임을 시작하면 이전 진행 기록이 초기화됩니다. 엔딩 컬렉션은 유지됩니다.</p>}</div>}
{s.phase==="guide"&&<section className="ssr-paper"><h2>✧ 마녀 여왕의 시험 안내 ✧</h2><p>당신은 쇼콜라와 바닐라와 함께 인간계로 파견된 새로운 여왕 후보입니다.</p><p><img src={pinkHeart} alt=""/> <b>하트 포인트</b> — 사람들의 마음을 얻는 능력. 시작 점수 50점.</p><p><img src={goldHeart} alt=""/> <b>마녀의 자질</b> — 공감과 용기, 올바른 판단. 시작 점수 50점.</p><p>10개의 상황마다 세 가지 선택지 중 하나를 선택하세요. 두 능력치는 0~100 사이에서 변합니다.</p><p>하트와 자질 모두 80점 이상이면 진정한 마녀 여왕 엔딩! 최종 결과에서 쇼콜라·바닐라·피에르·로빈의 개별 평가도 확인할 수 있어요. 다른 결과에도 각자의 이야기가 기다립니다.</p><p>대화창을 클릭하면 다음 대사로 진행됩니다. 자동 저장을 지원합니다.</p><button className="primary" onClick={()=>restart()}>시험 시작 <ArrowRight size={18}/></button><button onClick={()=>setS(p=>({...p,phase:"title"}))}>돌아가기</button></section>}
{s.phase==="collection"&&<section className="ssr-paper"><h2>✧ 엔딩 컬렉션 ✧</h2><p>해금한 엔딩 {s.unlocked.length} / 4</p><div className="ssr-end-grid">{endings.map(e=><div className="ssr-end-tile" key={e.id}><span>{s.unlocked.includes(e.id)?e.icon:"🔒"}</span><strong>{s.unlocked.includes(e.id)?e.title:"??? 잠긴 엔딩"}</strong><small>{s.unlocked.includes(e.id)?e.subtitle:"여왕 시험에 도전해 해금하세요."}</small></div>)}</div><button onClick={()=>setS(p=>({...p,phase:"title"}))}>돌아가기</button></section>}
</main>}
{["opening","story","choice","reaction"].includes(s.phase)&&<main className="ssr-play"><div className="ssr-stage-heading"><span>{s.phase==="opening"?"PROLOGUE":`CHAPTER ${String(s.index+1).padStart(2,"0")} / 10`}</span><strong>{s.phase==="opening"?"여왕 후보의 소환":stage.title}</strong><small>{s.phase==="opening"?"마계":stage.location}</small></div><div className="ssr-cast">{(s.phase==="opening"?["쇼콜라","바닐라","로빈"] as Character[]:stage.cast).filter(c=>c!=="나"&&c!=="내레이션").map(c=><CharacterCard key={c} name={c} active={current?.who===c}/>)}</div><div className="ssr-bottom">
{(s.phase==="opening"||s.phase==="story"||s.phase==="reaction")&&<button className="ssr-dialog" onClick={next}><span className="ssr-speaker">{current?.who==="내레이션"?"✦ STORY":current?.who}</span><p>{current?.text.slice(0,showText)}{showText<(current?.text.length??0)&&<span className="ssr-cursor">▍</span>}</p><small>CLICK TO CONTINUE <ChevronRight size={14}/></small></button>}
{s.phase==="choice"&&<div className="ssr-choice-area"><h3>✦ {stage.prompt}</h3><div className="ssr-choices">{stage.choices.map((c,i)=><button key={i} onClick={()=>choose(i)}><span className="ssr-choice-letter">{String.fromCharCode(65+i)}</span><span>{c.text}</span><ChevronRight size={18}/></button>)}</div></div>}
{s.phase==="reaction"&&<div className="ssr-delta">선택 결과 <span>{stage.choices[chosen].heart>=0?"+":""}{stage.choices[chosen].heart} <img src={pinkHeart} alt="하트"/></span><span>{stage.choices[chosen].virtue>=0?"+":""}{stage.choices[chosen].virtue} <img src={goldHeart} alt="자질"/></span></div>}
</div></main>}
{s.phase==="ending"&&<main className="ssr-center"><section className="ssr-ending"><div className="ssr-crown">{ending.icon}</div><p className="ssr-kicker">✦ QUEEN'S TRIAL COMPLETE ✦</p><h1>{ending.title}</h1><h2>{ending.subtitle}</h2><p>{ending.description}</p><div className="ssr-final-stats"><span><img src={pinkHeart} alt=""/> 하트 {s.heart}</span><span><img src={goldHeart} alt=""/> 자질 {s.virtue}</span></div><section className="ssr-judge-results" aria-label="캐릭터별 최종 평가"><h3>✧ 캐릭터별 최종 평가 ✧</h3><p className="ssr-judge-intro">당신이 10개 챕터에서 내린 선택을 각 캐릭터의 관점으로 평가했어요.</p><div className="ssr-judge-grid">{characterAssessments(s.answers).map(r=><article className="ssr-judge-card" key={r.name}><div className="ssr-judge-portrait">{portraits[r.name]&&<img src={portraits[r.name]} alt={r.name}/>}</div><div className="ssr-judge-body"><div className="ssr-judge-head"><strong>{r.name}</strong><span className="ssr-judge-grade">{r.grade} 등급</span></div><small>{r.focus}</small><div className="ssr-judge-meter" role="progressbar" aria-label={r.name+" 평가 점수"} aria-valuemin={0} aria-valuemax={100} aria-valuenow={r.score}><i style={{width:`${r.score}%`}}/></div><b>{r.score} / 100</b><p>“{r.comment}”</p></div></article>)}</div></section><p className="ssr-result-note">엔딩 컬렉션에 기록되었습니다.</p><div className="ssr-buttons"><button className="primary" onClick={()=>restart()}><RotateCcw size={18}/> 다시 도전</button><button onClick={()=>setS(p=>({...p,phase:"collection"}))}>엔딩 컬렉션</button><button onClick={()=>setS(p=>({...p,phase:"title"}))}>타이틀로</button></div></section></main>}
<footer className="ssr-footer"><img src={blackHeart} alt=""/> SUGAR SUGAR RUNE · FAN-MADE INTERACTIVE STORY <img src={blackHeart} alt=""/></footer>
</div>
}
