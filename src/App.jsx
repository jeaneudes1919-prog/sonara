import {useEffect,useState} from "react";import {Link,NavLink,Route,Routes,useLocation} from "react-router-dom";import {AnimatePresence,motion} from "framer-motion";
import {Home as HomeIcon,Library as LibIcon,Search as SearchIcon} from "lucide-react";
import {Home,Library,NotFound,PlaylistPage,Search} from "./pages.jsx";import {NowPlaying,PlayerBar,QueueDrawer} from "./player.jsx";import {useApp} from "./store.jsx";
const NAV=[["/","Accueil",HomeIcon],["/recherche","Rechercher",SearchIcon],["/bibliotheque","Bibliothèque",LibIcon]];
export default function App(){const loc=useLocation();const A=useApp();const {cur,s,pls,toast}=A;const [np,setNp]=useState(false);const [q,setQ]=useState(false);
useEffect(()=>{const h=e=>{if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;const k=e.key;
if(k===" "){e.preventDefault();A.toggle()}else if(k==="ArrowRight")A.seek(A.time+5);else if(k==="ArrowLeft")A.seek(Math.max(0,A.time-5));
else if(k==="ArrowUp"){e.preventDefault();A.setVol(s.volume+.05)}else if(k==="ArrowDown"){e.preventDefault();A.setVol(s.volume-.05)}
else if(k==="n"||k==="N")A.next();else if(k==="p"||k==="P")A.prev();else if(k==="m"||k==="M")A.toggleMute();else if(k==="Escape"){setNp(false);setQ(false)}};
window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h)});
useEffect(()=>{document.title=cur&&s.playing?cur.titre+" | Sonara":"Sonara | Streaming musical"},[cur?.id,s.playing]);
return <div className="relative h-screen overflow-hidden">
<AnimatePresence><motion.div key={cur?.id||"none"} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1.2}} className="pointer-events-none fixed inset-0" style={{background:cur?`radial-gradient(800px 500px at 70% -10%,${cur.c[0]}40,transparent 70%),radial-gradient(600px 400px at 0% 100%,${cur.c[1]}30,transparent 70%)`:"radial-gradient(800px 500px at 70% -10%,#E11D8F30,transparent 70%)"}}/></AnimatePresence>
<aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col gap-6 border-r border-white/5 bg-ink/70 p-5 backdrop-blur-xl md:flex">
<Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold"><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-pink to-orange"><i className="flex items-end gap-[2px]"><b className="h-2 w-[3px] rounded bg-white"/><b className="h-4 w-[3px] rounded bg-white"/><b className="h-3 w-[3px] rounded bg-white"/></i></span>Sonara</Link>
<nav className="space-y-1">{NAV.map(([to,l,I])=><NavLink key={to} to={to} end={to==="/"} className={({isActive})=>"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition "+(isActive?"bg-white/10 text-white":"text-white/60 hover:bg-white/5 hover:text-white")}><I size={19}/>{l}</NavLink>)}</nav>
<div className="min-h-0 flex-1 overflow-y-auto"><p className="mb-2 px-3 text-xs uppercase tracking-widest text-white/40">Mes playlists</p>{pls.map(p=><NavLink key={p.id} to={"/playlist/"+p.id} className={({isActive})=>"block truncate rounded-lg px-3 py-2 text-sm "+(isActive?"text-pink":"text-white/60 hover:text-white")}>{p.nom}</NavLink>)}</div></aside>
<main className="relative h-full overflow-y-auto px-4 pb-48 pt-6 md:ml-64 md:px-8 md:pb-32"><AnimatePresence mode="wait"><motion.div key={loc.pathname} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.25}}>
<Routes location={loc}><Route path="/" element={<Home/>}/><Route path="/recherche" element={<Search/>}/><Route path="/bibliotheque" element={<Library/>}/><Route path="/playlist/:id" element={<PlaylistPage/>}/><Route path="*" element={<NotFound/>}/></Routes></motion.div></AnimatePresence></main>
<PlayerBar openNP={()=>setNp(true)} openQ={()=>setQ(true)}/>
<nav className="fixed inset-x-0 bottom-0 z-30 flex h-14 border-t border-white/10 bg-ink/95 backdrop-blur-xl md:hidden">{NAV.map(([to,l,I])=><NavLink key={to} to={to} end={to==="/"} className={({isActive})=>"flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] "+(isActive?"text-pink":"text-white/60")}><I size={20}/>{l}</NavLink>)}</nav>
<AnimatePresence>{np&&<NowPlaying onClose={()=>setNp(false)} openQ={()=>setQ(true)}/>}</AnimatePresence>
<AnimatePresence>{q&&<QueueDrawer onClose={()=>setQ(false)}/>}</AnimatePresence>
<AnimatePresence>{toast&&<motion.div initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} exit={{opacity:0}} className="fixed bottom-36 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink shadow-xl md:bottom-28">{toast}</motion.div>}</AnimatePresence></div>}
