import {Sun,CloudSun,CloudRain,ExternalLink} from 'lucide-react';
import {weatherForDay,WEATHER_AS_OF} from '@/lib/weather';
export function DayWeather({day}:{day:string}){
 const w=weatherForDay(day);if(!w)return null;
 const Icon=w.kind==='rain'?CloudRain:w.kind==='sun'?Sun:CloudSun;
 const j=w.area.includes('조슈아');
 return <section className={`la-weather ${w.kind}`} aria-label={`${day} 날씨 예보`}><div className="la-weather-icon"><Icon size={29}/></div><div className="la-weather-main"><small>{w.area} · {day.slice(5).replace('-','/')} 예보</small><h3>{w.condition}</h3><p>{w.tip}</p></div><div className="la-weather-temp"><strong>{w.high}°<span> / {w.low}°</span></strong><small>최고 / 최저 · °C</small></div><details className="la-weather-detail"><summary>{WEATHER_AS_OF.replaceAll('-','.')} 조회 · 예보 안내</summary><p>조회 시점의 일별 예보를 저장한 참고 정보이며 자동 갱신되지 않습니다. 먼 날짜일수록 바뀔 수 있어요. LA 시내 예보는 해변·유니버셜·공항의 실제 날씨와 다를 수 있고, 조슈아트리는 타운 예보로 공원 내부 고도 차이를 반영하지 않습니다.</p><a href={`https://forecast.weather.gov/MapClick.php?lat=${j?'34.1347':'34.0522'}&lon=${j?'-116.3131':'-118.2437'}`} target="_blank" rel="noreferrer">최신 현지 예보 확인 · NWS <ExternalLink size={12}/></a></details></section>;
}
