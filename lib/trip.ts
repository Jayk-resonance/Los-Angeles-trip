export const FAMILY=['제우','승빈','재혁'] as const;
export const DAYS=['2026-10-29','2026-10-30','2026-10-31','2026-11-01','2026-11-02','2026-11-03','2026-11-04','2026-11-05','2026-11-06'];
export const DAY_TITLES=['LA에 도착하는 날','핼러윈을 즐기는 금요일','사막으로 떠나는 길','조슈아트리의 아침','바다 쪽으로','도심에서 별빛까지','영화 속 하루','마지막 LA 산책','집으로 돌아가는 날'];
export const DAY_SUBS=['LAX · 코리아타운 · 그로브는 컨디션에 따라','시타델 쇼핑 · 할리우드 선택 · 세 사람의 저녁','조슈아트리 국립공원 1박 · 세 사람','공원 산책 · LA 복귀 · 세 사람','산타모니카 · 베니스 비치 · 느긋한 하루','더 브로드 · 리틀도쿄 · 그리피스 천문대','유니버설 낮 파크 · 제우와 승빈 · HHN 제외','게티센터 · 베벌리힐스 · 트레이더 조 기념품 · 짐 정리','LAX 09:50 출발 · 이른 아침 공항 이동'];
export type Item={id:string;day:string;time:string;title:string;english:string;category:string;status:string;note:string;place:string;people:string[];done:boolean};
export type Decision={id:string;title:string;day:string;description:string;options:string[];status:string;result:string};
export type RecordRow={id:string;kind:string;data:string;author:string;created:string;deleted:number};
export type Expense={id:string;date:string;title:string;amount:number;currency:'USD'|'KRW';payer:string;participants:string[];category:string;itemId:string;note:string;author:string};
export type Memory={id:string;date:string;text:string;name:string;photo:boolean;featured:boolean;author:string;created:string};
export const ITEM_LINKS:Record<string,{label:string;url:string}[]>={
  "universal": [
    {
      "label": "공식 티켓 구매",
      "url": "https://store.universalstudioshollywood.com/"
    },
    {
      "label": "운영시간·휴무 확인",
      "url": "https://www.universalstudioshollywood.com/web/en/us/calendar-and-hours"
    }
  ],
  "mickys": [
    {
      "label": "10/30 공연·티켓",
      "url": "https://mickys.com/events/friday-night-show-10-30-2026/"
    },
    {
      "label": "공연 테마 안내",
      "url": "https://mickys.com/drag-show/rocky-horror/"
    }
  ],
  "halloween-dinner": [
    {
      "label": "Guisados 메뉴",
      "url": "https://www.guisados.la/menu"
    }
  ],
  "joshua": [
    {
      "label": "국립공원 방문 안내",
      "url": "https://www.nps.gov/jotr/planyourvisit/index.htm"
    },
    {
      "label": "입장·숙박 예약 조건",
      "url": "https://www.nps.gov/jotr/planyourvisit/permitsandreservations.htm"
    }
  ],
  "joshua-lodging": [
    {
      "label": "방문·캠핑 안내",
      "url": "https://www.nps.gov/jotr/planyourvisit/permitsandreservations.htm"
    }
  ],
  "getty": [
    {
      "label": "무료 시간 예약·방문 안내",
      "url": "https://www.getty.edu/visit/center/"
    }
  ],
  "broad": [
    {
      "label": "무료 입장·예약 안내",
      "url": "https://www.thebroad.org/visit"
    },
    {
      "label": "티켓 예약",
      "url": "https://www.thebroad.org/tickets"
    }
  ],
  "griffith": [
    {
      "label": "운영시간·방문 안내",
      "url": "https://griffithobservatory.org/visit/"
    },
    {
      "label": "플라네타륨 티켓",
      "url": "https://griffithobservatory.org/exhibits/samuel-oschin-planetarium/"
    }
  ]
};
export const INITIAL_EXPENSES:Omit<Expense,'author'>[]=[];
export const INITIAL_ITEMS:Item[]=[
  {
    "id": "flight-out",
    "day": "2026-10-29",
    "time": "13:20",
    "title": "인천 출발",
    "english": "Air Premia YP101",
    "category": "이동",
    "status": "예약 완료",
    "note": "발권 완료 · 에어프레미아 YP101 · 이코노미. 10/29 인천(ICN) T1 13:20 출발 → 같은 날 로스앤젤레스(LAX) TB 08:20 도착, 비행 11시간. 위탁수하물 1인당 1개(중량은 예약 상세에서 확인). 각 공항 현지시간 기준.",
    "place": "Incheon International Airport",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "lax-arrive",
    "day": "2026-10-29",
    "time": "08:20",
    "title": "LA 도착 · 코리아타운 이동",
    "english": "LAX → Koreatown",
    "category": "이동",
    "status": "계획 확정",
    "note": "발권한 YP101은 10/29 08:20 LAX TB 도착 예정이에요. 입국심사와 수하물 수령 후 코리아타운으로 이동해요. 첫날은 시차 적응을 위해 가볍게 보냅니다.",
    "place": "Los Angeles International Airport",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "koreatown",
    "day": "2026-10-29",
    "time": "12:00",
    "title": "재혁의 집에서 짐 정리",
    "english": "Koreatown",
    "category": "숙소",
    "status": "계획 확정",
    "note": "재혁의 코리아타운 집에서 머무를 계획이에요. 정확한 주소와 이동 방법은 별도 공유합니다.",
    "place": "Koreatown Los Angeles",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "grove",
    "day": "2026-10-29",
    "time": "15:00",
    "title": "그로브와 파머스마켓 · 선택",
    "english": "The Grove & Original Farmers Market",
    "category": "식사",
    "status": "후보",
    "note": "도착일 컨디션이 괜찮으면 짧게 산책한 뒤 트레이더 조에서 장을 봐요. 피곤하면 그로브는 생략하고 필요한 장보기만 합니다.",
    "place": "The Grove Los Angeles",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "hollywood",
    "day": "2026-10-30",
    "time": "14:30",
    "title": "할리우드 거리 산책",
    "english": "Hollywood Walk of Fame",
    "category": "액티비티",
    "status": "후보",
    "note": "승빈과 오전 시타델 쇼핑 후 1시간 정도 가볍게 산책해요. 쇼핑이 길어지거나 피곤하면 생략하고 숙소에서 쉽니다.",
    "place": "Hollywood Walk of Fame",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "los-feliz",
    "day": "2026-10-30",
    "time": "16:00",
    "title": "숙소 휴식 · 코스튬 준비",
    "english": "Rest & costume prep",
    "category": "휴식",
    "status": "후보",
    "note": "시타델·할리우드 관광 후 숙소에서 쉬고 저녁 공연을 준비해요. 로스펠리즈 카페는 이번 변경안에서 제외합니다.",
    "place": "Koreatown, Los Angeles",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "halloween-dinner",
    "day": "2026-10-30",
    "time": "18:30",
    "title": "세 사람의 핼러윈 저녁",
    "english": "Guisados West Hollywood · tentative",
    "category": "식사",
    "status": "후보",
    "note": "재혁 퇴근 시간에 맞춰 합류해요. Guisados 타코 식사는 후보이며 업소는 일행과 상의해 결정합니다. 간단한 코스튬을 함께 준비해요.",
    "place": "Guisados 8935 Santa Monica Blvd West Hollywood",
    "people": [
      "제우",
      "승빈",
      "재혁"
    ],
    "done": false
  },
  {
    "id": "mickys",
    "day": "2026-10-30",
    "time": "20:00",
    "title": "Micky’s Horror Drag Show · 잠정",
    "english": "Micky’s WeHo · Halloween / Rocky Horror",
    "category": "액티비티",
    "status": "후보",
    "note": "10/30 20:00~22:00 핼러윈 테마 드래그 공연. 일행과 상의할 잠정안이며 미예약입니다. 일반 $10은 스탠딩, VIP $30은 좌석과 Meet & Greet 포함(음료 등 별도, 최종 수수료 확인). 좌석 위치·세 사람 연석 보장은 미확인. 22시 전후 귀가해 다음 날 운전에 대비해요.",
    "place": "Micky’s 8857 Santa Monica Blvd West Hollywood",
    "people": [
      "제우",
      "승빈",
      "재혁"
    ],
    "done": false
  },
  {
    "id": "joshua",
    "day": "2026-10-31",
    "time": "09:00",
    "title": "세 사람, 조슈아트리로 출발",
    "english": "Joshua Tree National Park",
    "category": "이동",
    "status": "계획 확정",
    "note": "재혁의 11/2 휴가가 어려워 10/31(토)~11/1(일) 1박 2일로 변경했어요. 숙소와 렌터카는 예약 여부 확인이 필요합니다. 일반 차량 입장에 시간 예약은 필요하지 않으며 입장료는 별도예요.",
    "place": "Joshua Tree National Park",
    "people": [
      "제우",
      "승빈",
      "재혁"
    ],
    "done": false
  },
  {
    "id": "joshua-sunset",
    "day": "2026-10-31",
    "time": "16:00",
    "title": "사막 산책과 일몰",
    "english": "Joshua Tree Sunset",
    "category": "액티비티",
    "status": "후보",
    "note": "짧은 산책과 일몰 감상. 구체적인 코스는 숙소 위치와 현장 상황에 맞춰 정해요. 시간은 이동을 위한 가안이며 실제 일몰 시각을 뜻하지 않아요.",
    "place": "Joshua Tree National Park",
    "people": [
      "제우",
      "승빈",
      "재혁"
    ],
    "done": false
  },
  {
    "id": "joshua-lodging",
    "day": "2026-10-31",
    "time": "18:00",
    "title": "조슈아트리 근처에서 1박",
    "english": "Joshua Tree / Twentynine Palms",
    "category": "숙소",
    "status": "예약 필요",
    "note": "10/31 체크인 → 11/1 체크아웃, 성인 3명. 숙소는 아직 선택·예약하지 않았어요. 공원 접근성, 침대 구성, 난방, 최종 요금과 취소 조건을 확인해요.",
    "place": "Joshua Tree California",
    "people": [
      "제우",
      "승빈",
      "재혁"
    ],
    "done": false
  },
  {
    "id": "joshua-stars",
    "day": "2026-10-31",
    "time": "20:00",
    "title": "사막의 별 보기",
    "english": "Joshua Tree Stargazing",
    "category": "액티비티",
    "status": "후보",
    "note": "구름·바람·달빛에 따라 별이 보이는 정도가 달라요. 따뜻한 옷을 챙기고 접근 가능한 장소에서 짧게 감상합니다. 유료 별 투어는 기본안에 포함하지 않았어요.",
    "place": "Joshua Tree National Park",
    "people": [
      "제우",
      "승빈",
      "재혁"
    ],
    "done": false
  },
  {
    "id": "joshua-morning",
    "day": "2026-11-01",
    "time": "08:00",
    "title": "조슈아트리의 아침",
    "english": "Joshua Tree Morning",
    "category": "액티비티",
    "status": "후보",
    "note": "일출 또는 가벼운 산책 후 LA로 돌아오는 일요일 일정이에요. 11/1 서머타임 종료로 시계가 한 시간 돌아가니 휴대폰 현지시각을 기준으로 움직여요.",
    "place": "Joshua Tree National Park",
    "people": [
      "제우",
      "승빈",
      "재혁"
    ],
    "done": false
  },
  {
    "id": "return-la",
    "day": "2026-11-01",
    "time": "14:00",
    "title": "코리아타운으로 복귀",
    "english": "Return to Koreatown",
    "category": "이동",
    "status": "후보",
    "note": "운전 시간과 교통상황에 따라 유동적입니다. 월요일 재혁은 출근하므로 일요일 저녁은 휴식 위주로 보냅니다.",
    "place": "Koreatown Los Angeles",
    "people": [
      "제우",
      "승빈",
      "재혁"
    ],
    "done": false
  },
  {
    "id": "venice",
    "day": "2026-11-02",
    "time": "11:30",
    "title": "베니스 비치와 운하 산책",
    "english": "Venice Beach & Canals",
    "category": "휴식",
    "status": "후보",
    "note": "조슈아트리 다음 날은 늦게 출발해 해변에서 가볍게 쉬어요. 운하와 해변은 관심·체력에 맞춰 선택합니다.",
    "place": "Venice Beach Los Angeles",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "santa-monica",
    "day": "2026-11-02",
    "time": "15:00",
    "title": "산타모니카 해변과 피어",
    "english": "Santa Monica Pier",
    "category": "휴식",
    "status": "후보",
    "note": "베니스와 같은 서쪽 해변 권역으로 묶어요. 라구나 비치는 이번 기본안에 없으며 원하면 이날 해변 일정과 교체합니다.",
    "place": "Santa Monica Pier",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "broad",
    "day": "2026-11-03",
    "time": "11:00",
    "title": "더 브로드 미술관",
    "english": "The Broad",
    "category": "액티비티",
    "status": "예약 필요",
    "note": "일반 입장 무료, 시간 지정 사전 예약 권장(현장 입장도 가능). 쿠사마 Infinity Mirrored Room을 원하면 별도 포함 여부와 사전 예약을 확인하세요. 월요일 휴관을 피해 화요일에 방문해요.",
    "place": "The Broad Los Angeles",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "little-tokyo",
    "day": "2026-11-03",
    "time": "13:00",
    "title": "다운타운 점심과 리틀도쿄",
    "english": "Downtown LA & Little Tokyo",
    "category": "액티비티",
    "status": "후보",
    "note": "제우와 승빈이 다운타운에서 점심을 먹고 리틀도쿄를 둘러봐요. 동선과 당일 관심에 맞춰 시간을 조정합니다.",
    "place": "Little Tokyo Los Angeles",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "arts-district",
    "day": "2026-11-03",
    "time": "15:00",
    "title": "아츠 디스트릭트 · 선택",
    "english": "Arts District",
    "category": "휴식",
    "status": "후보",
    "note": "시간이 남을 때 카페와 거리를 짧게 둘러보는 선택 코스. 그리피스 일몰을 보고 싶으면 생략해요.",
    "place": "Arts District Los Angeles",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "griffith",
    "day": "2026-11-03",
    "time": "16:00",
    "title": "그리피스 천문대 · 일몰과 야경",
    "english": "Griffith Observatory",
    "category": "액티비티",
    "status": "후보",
    "note": "야외 전망과 상설 전시는 예약 없이 무료. 일몰 전에 도착하고 야경까지 여유롭게 감상해요. 재혁은 퇴근 후 야경에 합류 가능하며 일몰 동행은 보장하지 않아요. 플라네타륨 공연은 별도 당일 유료 티켓입니다. 월요일 실내 휴관.",
    "place": "Griffith Observatory",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "universal",
    "day": "2026-11-04",
    "time": "09:15",
    "title": "승빈과 유니버설 · 종일 낮 파크",
    "english": "Universal Studios Hollywood",
    "category": "액티비티",
    "status": "예약 필요",
    "note": "11/4(수) 개장부터 즐기는 일정. HHN은 이번 가안에서 제외했어요. 우선 일반 1일권을 추천하고 대기 부담에 따라 Express를 비교합니다. 아래 시간표는 10시 개장 가정이며 공식 앱 운영시간·공연·대기에 맞춰 조정해요.",
    "place": "Universal Studios Hollywood",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "universal-drift",
    "day": "2026-11-04",
    "time": "10:00",
    "title": "Hollywood Drift 먼저",
    "english": "Fast & Furious: Hollywood Drift",
    "category": "액티비티",
    "status": "후보",
    "note": "분노의 질주 테마 롤러코스터. 개장 직후 우선하되 실제 가동 시간을 확인해요. 일반 Express는 적용되지 않아요. Single Rider는 일행과 떨어져 타며 운영·대기 단축이 보장되지는 않습니다.",
    "place": "Universal Studios Hollywood",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "universal-lower",
    "day": "2026-11-04",
    "time": "11:00",
    "title": "하부 구역을 한 번에",
    "english": "Mario Kart · Revenge of the Mummy",
    "category": "액티비티",
    "status": "후보",
    "note": "Mario Kart → 미이라를 우선하고, 여유 있으면 Transformers. 하부 구역을 묶어 이동을 줄여요. Jurassic World는 11/21 재개장 예정으로 알려져 있어 이번 안에서 제외하며 방문 전 공식 안내를 재확인해요.",
    "place": "SUPER NINTENDO WORLD Universal Studios Hollywood",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "universal-tour",
    "day": "2026-11-04",
    "time": "13:30",
    "title": "스튜디오 투어",
    "english": "The World-Famous Studio Tour",
    "category": "액티비티",
    "status": "후보",
    "note": "점심 후 상부로 돌아와 실제 스튜디오 백롯 투어를 즐겨요. 출발·마지막 운행 시각은 당일 앱에서 확인하세요.",
    "place": "Studio Tour Universal Studios Hollywood",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "universal-show",
    "day": "2026-11-04",
    "time": "15:00",
    "title": "WaterWorld 스턴트 쇼",
    "english": "WaterWorld",
    "category": "액티비티",
    "status": "후보",
    "note": "워터월드 영화 테마의 낮 스턴트 공연. 15시는 이동 가안이며 실제 공연 시각이 아닙니다. 공식 앱 공연 시간에 맞춰 다른 일정과 순서를 바꿔요.",
    "place": "WaterWorld Universal Studios Hollywood",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "universal-potter",
    "day": "2026-11-04",
    "time": "16:00",
    "title": "해리 포터 구역과 Forbidden Journey",
    "english": "The Wizarding World of Harry Potter",
    "category": "액티비티",
    "status": "후보",
    "note": "호그스미드 산책과 Forbidden Journey. 대기가 길어지면 추가 놀이기구·재탑승부터 줄여요. 전체 코스 완주는 보장되지 않아요.",
    "place": "The Wizarding World of Harry Potter Hollywood",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "citywalk",
    "day": "2026-11-04",
    "time": "18:00",
    "title": "시티워크 · 선택",
    "english": "Universal CityWalk Hollywood",
    "category": "식사",
    "status": "후보",
    "note": "폐장 후 체력이 남으면 짧게 구경하거나 식사해요. 피곤하면 코리아타운으로 바로 돌아와 재혁과 저녁을 먹어요.",
    "place": "Universal CityWalk Hollywood",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "getty",
    "day": "2026-11-05",
    "time": "10:00",
    "title": "게티센터",
    "english": "Getty Center",
    "category": "액티비티",
    "status": "예약 필요",
    "note": "입장 무료지만 시간 지정 예약이 필요해요. 주차는 별도 유료. 오전 관람 뒤 베벌리힐스로 이동합니다. 예약은 제우와 승빈 2명을 기준으로 확인해요.",
    "place": "Getty Center",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "beverly",
    "day": "2026-11-05",
    "time": "14:30",
    "title": "베벌리힐스 산책",
    "english": "Beverly Hills",
    "category": "액티비티",
    "status": "후보",
    "note": "게티센터 후 로데오 드라이브 등에서 가벼운 산책. 마지막 날은 장소를 더 늘리지 않고 귀국 준비 시간을 남겨요.",
    "place": "Beverly Hills",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "last-dinner",
    "day": "2026-11-05",
    "time": "18:30",
    "title": "세 사람의 마지막 저녁 · 짐 정리",
    "english": "Last Dinner in LA",
    "category": "식사",
    "status": "후보",
    "note": "식당은 일행과 상의해 정해요. 다음 날 09:50 항공편이므로 저녁 후 짐을 정리하고 일찍 쉬어요.",
    "place": "Koreatown Los Angeles",
    "people": [
      "제우",
      "승빈",
      "재혁"
    ],
    "done": false
  },
  {
    "id": "airport-out",
    "day": "2026-11-06",
    "time": "05:30",
    "title": "LAX로 이동",
    "english": "Koreatown → LAX",
    "category": "이동",
    "status": "후보",
    "note": "국제선 출발 약 3시간 전인 06:50 터미널 도착을 목표로 여유 있게 출발하는 가안. 렌터카 반납·셔틀을 이용하면 추가 시간을 확보하고 정확한 출발 시각은 반납 장소와 항공사 안내에 맞춰 정해요.",
    "place": "Los Angeles International Airport",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "flight-back",
    "day": "2026-11-06",
    "time": "09:50",
    "title": "LA 출발 · 인천으로",
    "english": "Air Premia YP102",
    "category": "이동",
    "status": "예약 완료",
    "note": "발권 완료 · 에어프레미아 YP102 · 이코노미. 11/6 로스앤젤레스(LAX) TB 09:50 출발 → 11/7 인천(ICN) T1 16:20 도착, 비행 13시간 30분. 위탁수하물 1인당 2개(중량은 예약 상세에서 확인). 각 공항 현지시간 기준.",
    "place": "Los Angeles International Airport",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "trader-groceries",
    "day": "2026-10-29",
    "time": "16:30",
    "title": "트레이더 조 · 여행 중 먹을 장보기",
    "english": "Trader Joe’s · La Brea & 3rd",
    "category": "쇼핑",
    "status": "계획 확정",
    "note": "30–45분 정도 아침거리·집밥 재료와 맛볼 간식을 구매해요. 기념품은 11/5에 고릅니다. 도착일 컨디션에 따라 그로브를 생략하고 장보기만 짧게 해도 좋아요.",
    "place": "Trader Joe's, 263 S La Brea Ave, Los Angeles, CA 90036",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "citadel",
    "day": "2026-10-30",
    "time": "10:00",
    "title": "승빈과 시타델 아울렛",
    "english": "Citadel Outlets",
    "category": "쇼핑",
    "status": "계획 확정",
    "note": "09:15 전후 숙소 출발, 10:00–13:30 쇼핑과 간단한 점심. 코치 → 폴로 랄프 로렌 → 나이키 순으로 보고 14시 전후에는 출발해요. 할인·재고는 매장별로 다르며, 저녁 재혁 합류 전 숙소 휴식 시간을 남깁니다. 11/1은 쇼핑 없이 세 사람의 조슈아트리 일정으로 유지해요.",
    "place": "Citadel Outlets, 100 Citadel Drive, Commerce, CA",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  },
  {
    "id": "trader-gifts",
    "day": "2026-11-05",
    "time": "16:30",
    "title": "트레이더 조 · 기념품 쇼핑",
    "english": "Trader Joe’s · La Brea & 3rd",
    "category": "쇼핑",
    "status": "계획 확정",
    "note": "게티센터·베벌리힐스 산책 후 45–60분, 먹어보고 마음에 든 간식·커피·시즈닝·쇼핑백 등을 골라요. 베벌리힐스는 조금 짧게 둘러보고, 쇼핑 후 숙소에 짐을 두고 마지막 저녁을 즐깁니다.",
    "place": "Trader Joe's, 263 S La Brea Ave, Los Angeles, CA 90036",
    "people": [
      "제우",
      "승빈"
    ],
    "done": false
  }
];
export const INITIAL_DECISIONS:Decision[]=[
  {
    "id": "hhn-choice",
    "title": "유니버설은 낮 파크 중심으로",
    "day": "2026-11-04",
    "description": "10/18 변경안: 11/4 낮 파크 방문, HHN은 기본안에서 제외. 핼러윈은 10/30 미키스 공연을 잠정 검토해요.",
    "options": [
      "HHN 제외 · 11/4 낮 파크",
      "HHN 재검토"
    ],
    "status": "closed",
    "result": "HHN 제외 · 11/4 낮 파크"
  },
  {
    "id": "mickys-choice",
    "title": "10/30 미키스 공연 · 함께 결정해요",
    "day": "2026-10-30",
    "description": "핼러윈 / Rocky Horror 테마 드래그 공연 20~22시. 아직 미예약이고 참석 여부와 $10 스탠딩 / $30 좌석 VIP를 일행과 상의해요. 음식·음료 등 별도.",
    "options": [
      "$10 스탠딩으로 가기",
      "$30 좌석 VIP로 가기",
      "다른 핼러윈 행사로 바꾸기"
    ],
    "status": "open",
    "result": ""
  },
  {
    "id": "november-route",
    "title": "11/2 해변 일정 · 대안",
    "day": "2026-11-02",
    "description": "기본안은 11/2 산타모니카·베니스, 11/3 도심·그리피스, 11/4 유니버설, 11/5 게티·베벌리힐스예요. 라구나 비치는 해변 일정과 교체 가능하며 추가 방문은 기본안에 없어요.",
    "options": [
      "현재 가안 유지",
      "라구나 비치로 교체",
      "LA 도심에 더 집중"
    ],
    "status": "open",
    "result": ""
  }
];
export function mapUrl(place:string){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(place)}
export function dayLabel(date:string){const i=DAYS.indexOf(date);if(i<0)return date;const d=new Date(date+'T12:00:00Z');return `DAY ${i+1} · ${d.getUTCMonth()+1}.${d.getUTCDate()}`}
export function money(n:number,currency='KRW'){return `${currency==='USD'?'$':'₩'}${Math.round(n).toLocaleString('ko-KR')}`}
export function calculateExpenses(expenses:Expense[],rate:number){const paid:Record<string,number>=Object.fromEntries(FAMILY.map(n=>[n,0]));const owed={...paid};let total=0;for(const e of expenses){const amount=Math.round(e.amount*(e.currency==='USD'?rate:1));total+=amount;paid[e.payer]+=amount;const people=FAMILY.filter(n=>e.participants.includes(n));if(!people.length)continue;const each=Math.floor(amount/people.length);let rem=amount%people.length;for(const n of people)owed[n]+=each+(rem-->0?1:0)}const balances=FAMILY.map(name=>({name,paid:paid[name],owed:owed[name],net:paid[name]-owed[name]}));const debt=balances.filter(x=>x.net<0).map(x=>({...x,left:-x.net}));const credit=balances.filter(x=>x.net>0).map(x=>({...x,left:x.net}));const transfers:{from:string;to:string;amount:number}[]=[];let i=0,j=0;while(i<debt.length&&j<credit.length){const amount=Math.min(debt[i].left,credit[j].left);transfers.push({from:debt[i].name,to:credit[j].name,amount});debt[i].left-=amount;credit[j].left-=amount;if(!debt[i].left)i++;if(!credit[j].left)j++}return{total,balances,transfers}}

export const BOOKING_GUIDE: {date:string;title:string;requirement:string;detail:string;url:string}[]=[
  {
    "date": "10/30 금",
    "title": "Micky’s Horror Drag Show",
    "requirement": "사전 구매 권장 · 잠정안",
    "detail": "일행과 참석 여부·$10 스탠딩 / $30 좌석 VIP를 정한 뒤 예매. 아직 예약 완료가 아니에요.",
    "url": "https://mickys.com/events/friday-night-show-10-30-2026/"
  },
  {
    "date": "10/31~11/1",
    "title": "조슈아트리 숙소 · 성인 3명",
    "requirement": "우선 예약",
    "detail": "10/31 1박. 침대·위치·난방·최종 요금·취소 조건 확인. 일반 공원 입장은 시간 예약 불필요, 입장료 별도. 캠핑을 선택하면 캠핑장별 예약 조건 확인.",
    "url": "https://www.nps.gov/jotr/planyourvisit/permitsandreservations.htm"
  },
  {
    "date": "대여일 미정",
    "title": "렌터카",
    "requirement": "사전 예약 권장",
    "detail": "전 일정 공항 픽업·반납과 주말만 대여 중 선택 필요. 조슈아트리 기간은 최소 10/31~11/1이며 보험·주차·반납 시간을 함께 비교해요.",
    "url": ""
  },
  {
    "date": "11/3 화",
    "title": "더 브로드",
    "requirement": "무료 시간 예약 권장",
    "detail": "일반 전시는 현장 입장도 가능. Infinity Mirrored Room을 원하면 해당 체험 포함 티켓·사전 예약을 별도로 확인해요. 월요일 휴관.",
    "url": "https://www.thebroad.org/visit"
  },
  {
    "date": "11/4 수",
    "title": "유니버설 스튜디오",
    "requirement": "날짜 지정 입장권 사전 구매 권장",
    "detail": "제우·승빈 2명, 일반 1일권 우선 추천. Express 선택은 가격과 대기 부담을 비교한 뒤 결정. HHN 결합권은 이번 기본안에서 제외.",
    "url": "https://store.universalstudioshollywood.com/"
  },
  {
    "date": "11/5 목",
    "title": "게티센터",
    "requirement": "무료 시간 지정 예약 필수",
    "detail": "제우·승빈 2명, 10시 입장 가안. 주차 유료·월요일 휴관.",
    "url": "https://www.getty.edu/visit/center/"
  },
  {
    "date": "11/3 화 저녁",
    "title": "그리피스 천문대",
    "requirement": "일반 관람 예약 불필요",
    "detail": "전망·상설 전시는 무료. 플라네타륨을 추가하면 당일 현장 티켓 별도 구매. 월요일 실내 휴관.",
    "url": "https://griffithobservatory.org/exhibits/samuel-oschin-planetarium/"
  }
];
