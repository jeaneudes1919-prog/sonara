export const fmt=s=>{if(!isFinite(s)||s<0)s=0;const m=Math.floor(s/60);return m+":"+String(Math.floor(s%60)).padStart(2,"0")};
export const uid=()=>"u"+Math.random().toString(36).slice(2,8);
export function nextIndex({queue,index,shuffle,repeat},manual=true,rnd=Math.random){const n=queue.length;if(!n)return -1;
if(repeat==="one"&&!manual)return index;
if(shuffle&&n>1){let i;do{i=Math.floor(rnd()*n)}while(i===index);return i}
if(index+1<n)return index+1;return repeat==="all"||(manual&&repeat==="one")?0:-1}
export const prevIndex=({queue,index,repeat})=>index>0?index-1:repeat==="all"?queue.length-1:0;
