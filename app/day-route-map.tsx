'use client';
import {useEffect,useRef,useState} from 'react';
import {Map,ExternalLink,Maximize2} from 'lucide-react';
import {dayMapStops,routeUrl} from '@/lib/map-points';
import {mapUrl,type Item} from '@/lib/trip';
export function DayRouteMap({items,day}:{items:Item[];day:string}){
 const node=useRef<HTMLDivElement>(null),reset=useRef<()=>void>(()=>{});
 const [ready,setReady]=useState(false),[failed,setFailed]=useState(false);
 const stops=dayMapStops(items),signature=JSON.stringify(stops);
 useEffect(()=>{
  const host=node.current;if(!host||!stops.length)return;
  let disposed=false,cleanup=()=>{};setReady(false);setFailed(false);
  const observer=new IntersectionObserver(async entries=>{
   if(!entries.some(e=>e.isIntersecting))return;observer.disconnect();
   try{
    const L=await import('leaflet');if(disposed)return;
    const map=L.map(host,{scrollWheelZoom:false,attributionControl:true,tapHold:true});
    const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'}).addTo(map);
    const bounds=L.latLngBounds(stops.map(p=>[p.lat,p.lng] as [number,number]));
    reset.current=()=>map.fitBounds(bounds,{padding:[35,35],maxZoom:14});reset.current();
    stops.forEach((p,i)=>{
     const marker=L.marker([p.lat,p.lng],{icon:L.divIcon({className:'la-map-marker',html:`<span>${i+1}</span>`,iconSize:[30,30],iconAnchor:[15,15]})}).addTo(map);
     const link=document.createElement('a');link.textContent=p.label+' ↗';link.href=mapUrl(p.query);link.target='_blank';link.rel='noreferrer';marker.bindPopup(link);
    });
    let loaded=false;tiles.on('tileload',()=>{loaded=true;setReady(true)});tiles.on('tileerror',()=>{if(!loaded)setFailed(true)});
    const resize=new ResizeObserver(()=>map.invalidateSize());resize.observe(host);
    cleanup=()=>{resize.disconnect();map.remove()};
   }catch{if(!disposed)setFailed(true)}
  },{rootMargin:'200px'});observer.observe(host);
  return()=>{disposed=true;observer.disconnect();cleanup()};
 // Recreate only when actual mapped stops change, including edits and deletions.
 },[day,signature]);
 const unmapped=items.filter(x=>x.place&&!stops.some(p=>p.id===x.id));
 return <section className="la-route-card la-card" aria-label="이날의 장소 지도"><div className="la-map-heading"><div><p className="la-kicker">ON THE MAP</p><h3><Map size={19}/> 이날의 장소</h3></div><button onClick={()=>reset.current()} aria-label="모든 지도 핀 보기"><Maximize2 size={17}/></button></div>{stops.length>0&&<div className="la-map-shell"><div ref={node} className="la-map" aria-label="확대와 이동이 가능한 일정 지도"/>{!ready&&<span className="la-map-loading" role="status">{failed?'지도 연결이 어려워요. 아래 장소 링크를 이용해주세요.':'지도를 불러오는 중…'}</span>}</div>}<p className="la-map-note">번호는 아래 장소 목록과 같아요. 지역 표시는 대표 위치이며, 공원 안 세부 코스·숙소는 추후 확정해요.</p><ol className="la-map-places">{stops.map((p,i)=><li key={p.id}><span>{i+1}</span><a href={mapUrl(p.query)} target="_blank" rel="noreferrer"><b>{p.label}</b>{p.reference&&<small>대표 위치 · 상세 장소 미확정</small>}</a><ExternalLink size={13}/></li>)}</ol>{stops.length>1&&<a className="la-button outline la-route-link" href={routeUrl(stops)} target="_blank" rel="noreferrer">Google 지도에서 경로 보기 <ExternalLink size={14}/></a>}{unmapped.length>0&&<details className="la-other-places"><summary>그 밖의 일정 장소 {unmapped.length}개</summary>{unmapped.map(x=><a key={x.id} href={mapUrl(x.place)} target="_blank" rel="noreferrer">{x.title} ↗</a>)}</details>}<p className="la-map-footnote">실제 도로 경로·소요시간은 Google 지도에서 확인해요. 재혁의 집 주소는 표시하지 않아요.</p></section>;
}
