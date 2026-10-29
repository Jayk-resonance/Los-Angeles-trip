export type DayWeather={date:string;area:string;high:number;low:number;condition:string;kind:'sun'|'cloud'|'rain';tip:string};
// Snapshot from web weather retrieval on 2026-10-29; temperatures in degrees C.
// No fabricated precipitation probability, historical averages or auto-refresh claims.
export const WEATHER_AS_OF='2026-10-29';
export const WEATHER:DayWeather[]=[
 {date:'2026-10-29',area:'LA 시내',high:24,low:17,condition:'높은 구름 사이 햇살',kind:'cloud',tip:'도착일 산책과 장보기에는 가벼운 겉옷을 챙겨요.'},
 {date:'2026-10-30',area:'LA 시내 · 시타델 참고',high:23,low:15,condition:'구름과 햇살 · 곳에 따라 소나기',kind:'rain',tip:'아울렛은 야외 이동이 있어 작은 우산, 저녁 공연에는 겉옷을 준비해요.'},
 {date:'2026-10-31',area:'조슈아트리 타운',high:21,low:13,condition:'오전 햇살 · 오후 흐림',kind:'cloud',tip:'공원 고지대와 별 관측 장소는 타운보다 추울 수 있어요.'},
 {date:'2026-11-01',area:'조슈아트리 타운',high:17,low:9,condition:'서늘하고 비',kind:'rain',tip:'야외 산책은 짧게 조정하고 귀가 운전에 여유를 둬요. LA에도 비 예보가 있어요.'},
 {date:'2026-11-02',area:'LA 시내 · 해변 참고',high:27,low:16,condition:'맑음',kind:'sun',tip:'해변은 바람과 체감온도가 다를 수 있어 얇은 겉옷을 챙겨요.'},
 {date:'2026-11-03',area:'LA 시내',high:28,low:17,condition:'대체로 맑음',kind:'sun',tip:'낮에는 가볍게, 그리피스 야경에는 겉옷을 준비해요.'},
 {date:'2026-11-04',area:'LA 시내 · 유니버셜 참고',high:26,low:17,condition:'대체로 흐림',kind:'cloud',tip:'오래 걷는 날이라 편한 신발과 물을 준비해요.'},
 {date:'2026-11-05',area:'LA 시내',high:25,low:16,condition:'대체로 흐림',kind:'cloud',tip:'게티센터 야외 공간과 저녁 산책에는 가벼운 겉옷이 좋아요.'},
 {date:'2026-11-06',area:'LA 시내 · LAX 참고',high:25,low:16,condition:'맑음',kind:'sun',tip:'이른 공항 이동에는 겉옷을 챙겨요. 최저기온은 출발 시각 기온과 다릅니다.'},
];
export function weatherForDay(date:string){return WEATHER.find(w=>w.date===date)}
