'use client';
import {useEffect,useRef} from 'react';
import {ArrowUpRight,MapPin,ArrowDown} from 'lucide-react';
import {DAYS} from '@/lib/trip';
import {CHAPTERS,DAY_SCENES} from '@/lib/scenes';
import {TravelPhoto} from './travel-photo';
export function HomeStory({onOpen}:{onOpen:(index:number)=>void}){
 const panels=useRef<(HTMLElement|null)[]>([]);
 useEffect(()=>{
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('is-visible',e.isIntersecting)),{threshold:.12});
  panels.current.forEach(p=>{if(p)observer.observe(p)});return()=>observer.disconnect();
 },[]);
 return <section className="la-story" aria-label="사진으로 이어지는 아홉 날의 LA 여행">{DAYS.map((date,i)=>{const c=CHAPTERS[i];return <article key={date} ref={el=>{panels.current[i]=el}} className="la-chapter"><div className="la-chapter-media"><TravelPhoto scene={DAY_SCENES[i]} eager={i===0}/></div><div className="la-chapter-shade"/><div className="la-chapter-meta"><span><MapPin size={13}/>{i===2||i===3?'JOSHUA TREE':'LOS ANGELES'}, CALIFORNIA</span><span>DAY {String(i+1).padStart(2,'0')} · {date.slice(5).replace('-','.')}</span></div><div className="la-chapter-copy"><p className="la-kicker">{c.kicker}</p><h1>{c.title.split('\n').map(line=><span key={line}>{line}</span>)}</h1><div className="la-chapter-tags">{c.highlights.map(h=><span key={h}>{h}</span>)}</div><button onClick={()=>onOpen(i)}>이날 일정 보기 <ArrowUpRight size={18}/></button><small>{DAY_SCENES[i].caption} · 장소 참고 사진</small></div><span className="la-chapter-number" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>{i===0&&<a href="#chapter-2" className="la-scroll-cue">아래로 여행하기 <ArrowDown size={16}/></a>}<span id={'chapter-'+(i+1)} className="la-chapter-anchor"/></article>})}</section>;
}
