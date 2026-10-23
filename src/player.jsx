import {AnimatePresence,motion} from "framer-motion";import {ChevronDown,Heart,ListMusic,Maximize2,Pause,Play,Repeat,Repeat1,Shuffle,SkipBack,SkipForward,Volume2,VolumeX,X,ArrowUp,ArrowDown} from "lucide-react";
import {useApp,artistOf,trackById} from "./store.jsx";import {fmt} from "./lib.js";import {Cover,Eq} from "./ui.jsx";
function Controls({big}){const {s,cur,toggle,next,prev,toggleShuffle,cycleRepeat}=useApp();const R=s.repeat==="one"?Repeat1:Repeat;const sz=big?30:20;
const b="grid place-items-center rounded-full transition hover:scale-110 active:scale-90 ";
return <div className={"flex items-center "+(big?"gap-6":"gap-3 md:gap-4")}>
<button aria-label="Aléatoire" onClick={toggleShuffle} className={b+(s.shuffle?"text-pink":"opacity-60")+" hidden md:grid"}><Shuffle size={sz-4}/></button>
<button aria-label="Précédent" onClick={prev} disabled={!cur} className={b}><SkipBack size={sz} fill="currentColor"/></button>
<button aria-label={s.playing?"Pause":"Lecture"} onClick={toggle} disabled={!cur} className={b+"bg-white text-ink "+(big?"h-16 w-16":"h-10 w-10")}>{s.playing?<Pause size={big?28:18} fill="currentColor"/>:<Play size={big?28:18} fill="currentColor" className="ml-0.5"/>}</button>
<button aria-label="Suivant" onClick={next} disabled={!cur} className={b}><SkipForward size={sz} fill="currentColor"/></button>
<button aria-label="Répéter" onClick={cycleRepeat} className={b+(s.repeat!=="off"?"text-pink":"opacity-60")+" hidden md:grid"}><R size={sz-4}/></button></div>}
function Seek(){const {time,dur,seek,cur}=useApp();return <div className="flex w-full items-center gap-3 text-xs tabular-nums opacity-80"><span className="w-9 text-right">{fmt(time)}</span>
<input type="range" aria-label="Progression" min={0} max={dur||1} step={0.1} value={Math.min(time,dur||1)} onChange={e=>seek(+e.target.value)} disabled={!cur} className="seek h-1 flex-1"/><span className="w-9">{fmt(dur)}</span></div>}
export function PlayerBar({openNP,openQ}){const {s,cur,toggle,next,setVol,toggleMute,likes,toggleLike,time,dur}=useApp();
return <div className="fixed inset-x-0 bottom-14 z-30 border-t border-white/10 bg-ink/85 backdrop-blur-xl md:bottom-0 md:left-64">
{cur&&<div className="h-0.5 bg-white/10 md:hidden"><div className="h-full bg-gradient-to-r from-pink to-orange" style={{width:(dur?time/dur*100:0)+"%"}}/></div>}
<div className="grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-2.5 md:grid-cols-[1fr_1.4fr_1fr]">
<button onClick={()=>cur&&openNP()} className="flex min-w-0 items-center gap-3 text-left" aria-label="Ouvrir le lecteur">{cur?<><Cover t={cur} className="h-12 w-12 rounded-lg"/><div className="min-w-0"><p className="truncate text-sm font-medium">{cur.titre}</p><p className="truncate text-xs opacity-60">{artistOf(cur).nom}</p></div></>:<p className="text-sm opacity-50">Choisissez un morceau pour commencer</p>}</button>
<div className="hidden flex-col items-center gap-1 md:flex"><Controls/><Seek/></div>
<div className="flex items-center justify-end gap-2 md:hidden"><button aria-label={s.playing?"Pause":"Lecture"} onClick={toggle} disabled={!cur} className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink">{s.playing?<Pause size={18} fill="currentColor"/>:<Play size={18} fill="currentColor" className="ml-0.5"/>}</button><button aria-label="Suivant" onClick={next} disabled={!cur}><SkipForward size={22} fill="currentColor"/></button></div>
<div className="hidden items-center justify-end gap-3 md:flex">{cur&&<button aria-label="J'aime" onClick={()=>toggleLike(cur.id)}><Heart size={18} className={likes.includes(cur.id)?"fill-pink text-pink":"opacity-60"}/></button>}
<button aria-label="File d'attente" onClick={openQ} className="opacity-70 hover:opacity-100"><ListMusic size={18}/></button>
<button aria-label="Volume" onClick={toggleMute}>{s.muted||s.volume===0?<VolumeX size={18}/>:<Volume2 size={18}/>}</button>
<input type="range" aria-label="Volume" min={0} max={1} step={0.02} value={s.muted?0:s.volume} onChange={e=>setVol(+e.target.value)} className="seek h-1 w-24"/>
<button aria-label="Plein écran" onClick={()=>cur&&openNP()} className="opacity-70 hover:opacity-100"><Maximize2 size={17}/></button></div></div></div>}
export function NowPlaying({onClose,openQ}){const {s,cur,likes,toggleLike}=useApp();if(!cur)return null;const [c1,c2]=cur.c;
return <motion.div initial={{y:"100%"}} animate={{y:0}} exit={{y:"100%"}} transition={{type:"spring",damping:32,stiffness:260}} drag="y" dragConstraints={{top:0,bottom:0}} dragElastic={{top:0,bottom:.6}} onDragEnd={(_,i)=>i.offset.y>140&&onClose()}
className="fixed inset-0 z-50 flex flex-col items-center overflow-hidden px-6 pb-8 pt-5" style={{background:`radial-gradient(900px 600px at 50% 20%,${c1}55,transparent 70%),radial-gradient(700px 500px at 80% 90%,${c2}44,transparent 70%),#09090F`}}>
<div className="flex w-full max-w-md items-center justify-between"><button aria-label="Réduire" onClick={onClose}><ChevronDown size={28}/></button><p className="text-xs uppercase tracking-[.3em] opacity-60">En cours de lecture</p><button aria-label="File d'attente" onClick={openQ}><ListMusic size={22}/></button></div>
<div className="flex flex-1 items-center justify-center"><div className="relative"><div className="absolute -inset-6 rounded-full opacity-50 blur-3xl" style={{background:`linear-gradient(135deg,${c1},${c2})`}}/>
<div className="vinyl relative grid h-[min(72vw,360px)] w-[min(72vw,360px)] place-items-center rounded-full bg-black shadow-2xl ring-8 ring-white/5" style={{animationPlayState:s.playing?"running":"paused"}}>
<Cover t={cur} round className="h-[68%] w-[68%]"/><div className="absolute h-6 w-6 rounded-full bg-ink ring-4 ring-black"/></div></div></div>
<div className="w-full max-w-md space-y-5"><div className="flex items-center justify-between gap-3"><div className="min-w-0"><h2 className="truncate font-display text-3xl font-bold">{cur.titre}</h2><p className="truncate opacity-70">{artistOf(cur).nom} · {cur.album}</p></div>
<div className="flex items-center gap-3"><Eq on={s.playing}/><button aria-label="J'aime" onClick={()=>toggleLike(cur.id)}><Heart size={26} className={likes.includes(cur.id)?"fill-pink text-pink":""}/></button></div></div>
<Seek/><div className="flex justify-center"><Controls big/></div></div></motion.div>}
export function QueueDrawer({onClose}){const {s,clearQueue,removeFromQueue,move,cur,playList}=useApp();
return <><motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="fixed inset-0 z-[60] bg-black/50"/>
<motion.aside initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring",damping:30,stiffness:260}} className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-sm flex-col border-l border-white/10 bg-surf p-5">
<div className="mb-4 flex items-center justify-between"><h2 className="font-display text-xl font-bold">File d'attente</h2><div className="flex items-center gap-3">{s.queue.length>1&&<button onClick={clearQueue} className="text-xs text-orange">Vider</button>}<button aria-label="Fermer" onClick={onClose}><X/></button></div></div>
{s.queue.length?<ul className="flex-1 space-y-1 overflow-y-auto">{s.queue.map((id,i)=>{const t=trackById(id);const on=i===s.index;return <li key={i+"-"+id} className={"flex items-center gap-3 rounded-xl p-2 "+(on?"bg-white/10":"hover:bg-white/5")}>
<button onClick={()=>playList(s.queue,id)} className="flex min-w-0 flex-1 items-center gap-3 text-left"><Cover t={t} className="h-10 w-10 rounded-lg"/><div className="min-w-0"><p className={"truncate text-sm "+(on?"text-pink":"")}>{t.titre}</p><p className="truncate text-xs opacity-60">{artistOf(t).nom}</p></div></button>
<button aria-label="Monter" onClick={()=>move(i,-1)} className="opacity-50 hover:opacity-100"><ArrowUp size={15}/></button><button aria-label="Descendre" onClick={()=>move(i,1)} className="opacity-50 hover:opacity-100"><ArrowDown size={15}/></button>
<button aria-label="Retirer" onClick={()=>removeFromQueue(i)} className="opacity-50 hover:text-rose-400 hover:opacity-100"><X size={15}/></button></li>})}</ul>
:<p className="mt-20 text-center text-sm opacity-50">La file d'attente est vide.</p>}</motion.aside></>}
