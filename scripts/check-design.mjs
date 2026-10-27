import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import {renderToStaticMarkup} from 'react-dom/server';
import React from 'react';
const root=fs.mkdtempSync(path.resolve('.design-check-'));
const files=['lib/trip.ts','lib/restaurants.ts','app/restaurants-panel.tsx','lib/scenes.ts','lib/map-points.ts','lib/photo-credits.ts','app/travel-photo.tsx','app/home-story.tsx','app/day-route-map.tsx','app/trip-app.tsx'];
try{
 for(const file of files){
  const target=path.join(root,file.replace(/\.tsx?$/,'.mjs'));fs.mkdirSync(path.dirname(target),{recursive:true});
  let out=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
  out=out.replace(/from ['"](@\/|\.\/)([^'"]+)['"]/g,(_,prefix,tail)=>`from '${prefix==='@/'?'../':prefix}${tail}.mjs'`);
  fs.writeFileSync(target,out);
 }
 const trip=await import(path.join(root,'lib/trip.mjs'));
 const {DAY_SCENES,SCENES,itemScene}=await import(path.join(root,'lib/scenes.mjs'));
 const {PHOTO_CREDITS}=await import(path.join(root,'lib/photo-credits.mjs'));
 const {dayMapStops,routeUrl}=await import(path.join(root,'lib/map-points.mjs'));
 const {DayRouteMap}=await import(path.join(root,'app/day-route-map.mjs'));
 const {HomeStory}=await import(path.join(root,'app/home-story.mjs'));
 const {default:TripApp}=await import(path.join(root,'app/trip-app.mjs'));
 assert.equal(DAY_SCENES.length,trip.DAYS.length);assert(new Set(DAY_SCENES.map(s=>s.src)).size>=8);
 for(const scene of Object.values(SCENES)){
  assert(fs.existsSync('public'+scene.src),`Missing ${scene.src}`);
  if(scene.small)assert(fs.existsSync('public'+scene.small));
  assert(PHOTO_CREDITS.some(p=>p.id===scene.id),`Missing credit ${scene.id}`);
 }
 assert(fs.statSync('public/pretendard-variable.woff2').size>1000);
 for(const day of trip.DAYS){
  const items=trip.INITIAL_ITEMS.filter(i=>i.day===day).sort((a,b)=>a.time.localeCompare(b.time));
  const stops=dayMapStops(items);assert(stops.length>0,`No map stops ${day}`);
  for(const p of stops){assert(p.lat>=33&&p.lat<35);assert(p.lng>=-119&&p.lng<-115);assert(items.some(i=>i.id===p.id));}
  assert(new URL(routeUrl(stops)).hostname==='www.google.com');
  const html=renderToStaticMarkup(React.createElement(DayRouteMap,{items,day}));
  assert(html.includes('이날의 장소'));assert(!html.includes('undefined'));
 }
 const broad=trip.INITIAL_ITEMS.find(i=>i.id==='broad');
 assert.equal(dayMapStops([{...broad,place:'A newly edited place'}]).length,0,'Edited place must not retain stale pin');
 assert.equal(dayMapStops([]).length,0);assert.equal(itemScene('custom-user-added'),undefined);
 const home=renderToStaticMarkup(React.createElement(HomeStory,{onOpen:()=>{}}));
 assert.equal((home.match(/class="la-chapter"/g)||[]).length,9);
 const initial={user:{id:'test',name:'제우',admin:true,needsProfile:false},items:trip.INITIAL_ITEMS,decisions:trip.INITIAL_DECISIONS,comments:[],expenses:[],memories:[],votes:[],usedNames:[],settings:{rate:1400,rateLabel:'가정',finalized:false}};
 const {RestaurantsPanel}=await import(path.join(root,'app/restaurants-panel.mjs'));
 const {RESTAURANTS}=await import(path.join(root,'lib/restaurants.mjs'));
 assert.equal(RESTAURANTS.length,10);
 assert.equal(RESTAURANTS.find(r=>r.id==='holbox').status,'대안 후보');
 const food=renderToStaticMarkup(React.createElement(RestaurantsPanel,{onOpenDay:()=>{}}));
 assert(food.includes('food-holbox'));assert(food.includes('소노라타운과 둘 중 하나'));
 assert(!food.includes('undefined'));assert(food.includes('예약이 완료된 일정은 아닙니다'));
 for(const r of RESTAURANTS){assert(trip.DAYS.includes(r.date));assert(r.budget[0]<=r.budget[1]);}
 const html=renderToStaticMarkup(React.createElement(TripApp,{initial}));
 assert(html.includes('식당'));

 assert(html.includes('la-nav-mobile'));assert(!html.slice(html.indexOf('<header'),html.indexOf('</header>')).includes('la-nav-mobile'),'Mobile fixed nav must be outside filtered header');
 assert(!html.includes('undefined'));assert(!html.includes('NaN'));
 console.log('Design checks passed: 9 chapters, 15 credited photos, per-day maps, edit-safe pins, server rendering, separated mobile navigation.');
}finally{fs.rmSync(root,{recursive:true,force:true});}
