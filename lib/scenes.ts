export type Scene={id:string;src:string;small?:string;alt:string;caption:string;position?:string};
const photo=(id:string,alt:string,caption=alt):Scene=>({id,src:`/photos/${id}-1600.webp`,small:`/photos/${id}-640.webp`,alt,caption});
export const SCENES:Record<string,Scene>={
 skyline:{id:'skyline',src:'/la-skyline.jpg',alt:'호수 너머 펼쳐진 로스앤젤레스 도심',caption:'에코파크에서 바라본 LA'},
 sunset:{id:'sunset',src:'/joshua-tree.jpg',alt:'해 질 무렵 조슈아트리 국립공원의 바위와 나무',caption:'조슈아트리 국립공원의 일몰'},
 santa:{id:'santa',src:'/santa-monica.jpg',alt:'노을이 물든 산타모니카 피어와 해변',caption:'산타모니카 피어'},
 hollywood:photo('boulevard','할리우드 대로의 거리 풍경','할리우드 · 거리 산책'),
 griffith:photo('griffith','석양과 LA 도심을 내려다보는 그리피스 천문대','그리피스 천문대 · LA의 저녁'),
 universal:photo('universal','유니버설 스튜디오 할리우드 입구의 지구본','유니버설 스튜디오 할리우드'),
 getty:photo('getty','게티센터의 중앙 정원과 미술관 건물','게티센터 · 정원과 미술관'),
 beverly:photo('beverly','베벌리힐스 로데오 드라이브의 건물과 거리','베벌리힐스 · 로데오 드라이브'),
 venice:photo('venice','야자수와 스케이트파크가 있는 베니스 비치','베니스 비치 · 해변 산책'),
 tokyo:photo('japanese','LA 리틀도쿄 재패니즈 빌리지 플라자의 거리','리틀도쿄 · 재패니즈 빌리지 플라자'),
 grove:photo('grove','그로브 쇼핑몰 광장의 분수','그로브 · 도착일 선택 코스'),
 desert:photo('desert','조슈아트리 국립공원의 사막과 조슈아 나무','조슈아트리 국립공원 · 낮 풍경'),
 potter:photo('potter','유니버설 스튜디오 할리우드의 호그와트 성','위저딩 월드 오브 해리 포터'),
 broad:photo('broad','LA 더 브로드 미술관의 외관','더 브로드 · 현대미술'),
 lax:photo('lax','로스앤젤레스 공항의 테마 빌딩','LAX · 다음 여행을 기약하며'),
};
export const DAY_SCENES=['skyline','hollywood','sunset','desert','santa','griffith','universal','getty','lax'].map(k=>SCENES[k]);
const ITEM_SCENES:Record<string,string>={grove:'grove',hollywood:'hollywood','los-feliz':'skyline',joshua:'desert','joshua-sunset':'sunset','joshua-stars':'sunset','joshua-morning':'desert',venice:'venice','santa-monica':'santa',broad:'broad','little-tokyo':'tokyo',griffith:'griffith',universal:'universal','universal-potter':'potter',getty:'getty',beverly:'beverly','lax-arrive':'lax','flight-back':'lax'};
export function itemScene(id:string){return SCENES[ITEM_SCENES[id]];}
export const CHAPTERS=[
 {kicker:'HELLO, LOS ANGELES',title:'낯선 도시에서,\n우리의 여행이 시작돼요',highlights:['10.29 목 · LA 도착','코리아타운 · 그로브 선택']},
 {kicker:'A LITTLE HALLOWEEN',title:'할리우드를 걷고,\n금요일 밤을 함께 즐겨요',highlights:['10.30 금 · 낮은 둘이, 저녁은 셋이','미키스 공연 · 일행과 상의할 잠정안']},
 {kicker:'INTO THE DESERT',title:'도시를 잠시 떠나,\n사막의 노을 속으로',highlights:['10.31 토 · 세 사람 함께','조슈아트리 1박 · 숙소·차량 확인']},
 {kicker:'SLOW DESERT MORNING',title:'조슈아 나무 사이로,\n느긋하게 맞는 아침',highlights:['11.01 일 · 공원 산책 후 LA 복귀','서머타임 종료 · 시계 한 시간 뒤로']},
 {kicker:'SALT AIR, SLOW PACE',title:'오늘은 바다 쪽으로,\n조금 느리게 걸어요',highlights:['11.02 월 · 베니스 비치','산타모니카 · 드라이브 다음 날 휴식']},
 {kicker:'ART TO AFTERGLOW',title:'도심의 예술에서,\n천문대의 별빛까지',highlights:['11.03 화 · 더 브로드 · 리틀도쿄','그리피스 천문대 · 일몰과 야경']},
 {kicker:'A DAY IN THE MOVIES',title:'영화 속 세상에서\n하루를 보내요',highlights:['11.04 수 · 제우와 승빈','유니버설 낮 파크 · HHN 제외']},
 {kicker:'ONE MORE LA MOMENT',title:'정원과 거리를 거닐며,\n마지막 LA를 담아요',highlights:['11.05 목 · 게티센터 · 베벌리힐스','세 사람의 저녁 · 짐 정리']},
 {kicker:'BRING THE STORY HOME',title:'함께한 장면들을 담아,\n다시 우리의 일상으로',highlights:['11.06 금 · LAX 09:50 출발','11.07 토 · 인천 16:20 도착 예정']},
];
