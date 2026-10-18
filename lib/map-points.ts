import {INITIAL_ITEMS, type Item} from './trip';
export type MapStop={id:string;label:string;lat:number;lng:number;query:string;reference?:boolean};
// Public landmarks only. Koreatown is an area marker, never the host's home.
const LOCATIONS:Record<string,[string,number,number,boolean?]>={
 'lax-arrive':['로스앤젤레스 공항',33.9425,-118.4081],
 'koreatown':['코리아타운 · 지역 중심',34.0618,-118.3009,true],
 'grove':['그로브',34.0722,-118.3571],
 'hollywood':['할리우드 명예의 거리',34.1017,-118.3408],
 'los-feliz':['로스펠리스 · 지역 중심',34.111,-118.287,true],
 'halloween-dinner':['귀사도스 · 저녁 후보',34.0838,-118.3867],
 'mickys':['미키스 · 공연 잠정',34.0855,-118.3837],
 'joshua':['조슈아트리 · 공원 위치 참고',34.012,-116.166,true],
 'joshua-morning':['조슈아트리 · 공원 위치 참고',34.012,-116.166,true],
 'return-la':['코리아타운 · 지역 중심',34.0618,-118.3009,true],
 'venice':['베니스 비치',33.985,-118.4695],
 'santa-monica':['산타모니카 피어',34.0101,-118.496],
 'broad':['더 브로드',34.0544,-118.2506],
 'little-tokyo':['리틀도쿄',34.0485,-118.2407],
 'arts-district':['아츠 디스트릭트 · 지역 중심',34.0418,-118.2335,true],
 'griffith':['그리피스 천문대',34.1184,-118.3004],
 'universal':['유니버설 스튜디오',34.1381,-118.3534],
 'citywalk':['유니버설 시티워크',34.1363,-118.351],
 'getty':['게티센터',34.078,-118.4741],
 'beverly':['베벌리힐스 · 로데오 드라이브',34.0698,-118.4039,true],
 'last-dinner':['코리아타운 · 지역 중심',34.0618,-118.3009,true],
 'airport-out':['로스앤젤레스 공항',33.9425,-118.4081],
};
export function dayMapStops(items:Item[]):MapStop[]{
 return items.flatMap(item=>{
  const point=LOCATIONS[item.id],original=INITIAL_ITEMS.find(x=>x.id===item.id);
  if(!point||!original||item.place!==original.place)return [];
  const [label,lat,lng,reference]=point;
  return [{id:item.id,label,lat,lng,query:item.place,reference}];
 });
}
export function routeUrl(stops:MapStop[]){
 if(stops.length<2)return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(stops[0]?.query||'Los Angeles');
 const p=new URLSearchParams({api:'1',origin:stops[0].query,destination:stops[stops.length-1].query,travelmode:'driving'});
 if(stops.length>2)p.set('waypoints',stops.slice(1,-1).map(x=>x.query).join('|'));
 return 'https://www.google.com/maps/dir/?'+p;
}
