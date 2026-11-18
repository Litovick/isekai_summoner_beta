import {createContext,useContext,useState,type ReactNode} from "react";
type Screen="title"|"worlds"|"aot"|"slamdunk"|"yumeiro"|"sugarsugarrune"|"demonslayer"|"naruto";
type Ctx={screen:Screen;openWorldSelect:()=>void;openTitle:()=>void;startAnime:(id:string)=>void;showLockedNotice:()=>void;notice:boolean;closeNotice:()=>void};
const Context=createContext<Ctx|null>(null);
export function GameProvider({children}:{children:ReactNode}){const [screen,setScreen]=useState<Screen>("title");const [notice,setNotice]=useState(false);return <Context.Provider value={{screen,openWorldSelect:()=>{setNotice(false);setScreen("worlds")},openTitle:()=>setScreen("title"),startAnime:(id)=>{if(id==="aot"||id==="slamdunk"||id==="yumeiro"||id==="sugarsugarrune"||id==="demonslayer"||id==="naruto"){setNotice(false);setScreen(id)}else setNotice(true)},showLockedNotice:()=>setNotice(true),notice,closeNotice:()=>setNotice(false)}}>{children}</Context.Provider>}
export function useGame(){const ctx=useContext(Context);if(!ctx)throw new Error("GameProvider missing");return ctx}
