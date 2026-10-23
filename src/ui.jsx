import {useEffect,useState} from "react";import {motion} from "framer-motion";import {MoreHorizontal} from "lucide-react";import {useApp} from "./store.jsx";
export function Cover({t,c,className="",round}){const [a,b]=c||t.c;const v=t?t.v:0;
return <div className={"relative shrink-0 overflow-hidden "+(round?"rounded-full ":"")+className} style={{background:`linear-gradient(135deg,${a},${b})`}}>
<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-30">
{v===0&&[20,35,50,65].map(r=><circle key={r} cx="70" cy="30" r={r} fill="none" stroke="#fff" strokeWidth="2"/>)}
{v===1&&[0,1,2,3,4,5,6].map(i=><line key={i} x1={i*20-30} y1="0" x2={i*20+30} y2="100" stroke="#fff" strokeWidth="3"/>)}
{v===2&&Array.from({length:25},(_,i)=><circle key={i} cx={(i%5)*22+10} cy={Math.floor(i/5)*22+10} r="4" fill="#fff"/>)}</svg></div>}
export const Eq=({on})=><span className="inline-flex h-4 items-end gap-[2px]">{[0,1,2,3].map(i=><i key={i} className="eq w-[3px] rounded bg-pink" style={{animationDelay:i*.15+"s",animationPlayState:on?"running":"paused"}}/>)}</span>;
export const Reveal=({children,d=0,className=""})=><motion.div className={className} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-30px"}} transition={{duration:.6,delay:d}}>{children}</motion.div>;
export function TrackMenu({id,plId}){const {addToQueue,toggleLike,likes,pls,togglePlTrack,createPl}=useApp();const [o,setO]=useState(false);
useEffect(()=>{if(!o)return;const h=()=>setO(false);window.addEventListener("click",h);return()=>window.removeEventListener("click",h)},[o]);
const it="block w-full rounded-lg px-3 py-2 text-left hover:bg-white/10";
return <div className="relative" onClick={e=>e.stopPropagation()}><button aria-label="Plus d'options" onClick={()=>setO(!o)} className="p-2 opacity-60 transition hover:opacity-100"><MoreHorizontal size={18}/></button>
{o&&<motion.div initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} className="absolute right-0 z-30 w-60 rounded-xl border border-white/10 bg-surf2 p-1.5 text-sm shadow-2xl">
<button className={it} onClick={()=>addToQueue(id)}>Ajouter à la file d'attente</button>
<button className={it} onClick={()=>toggleLike(id)}>{likes.includes(id)?"Retirer des titres aimés":"Ajouter aux titres aimés"}</button>
{plId&&plId.startsWith("u")&&<button className={it+" text-rose-400"} onClick={()=>togglePlTrack(plId,id)}>Retirer de cette playlist</button>}
<p className="px-3 pb-1 pt-2 text-xs uppercase tracking-wider opacity-50">Playlists</p>
{pls.map(p=><button key={p.id} className={it} onClick={()=>togglePlTrack(p.id,id)}>{p.ids.includes(id)?"✓ ":""}{p.nom}</button>)}
<button className={it+" text-orange"} onClick={()=>{const n=window.prompt("Nom de la nouvelle playlist");if(n)createPl(n,id)}}>+ Nouvelle playlist</button></motion.div>}</div>}
