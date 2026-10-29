# 우리의 LA 스토리

2026.10.29–11.06 LA 여행 · 제우 · 승빈 · 재혁 · [웹사이트](https://our-la-story.kjwgv1442.chatgpt.site)

## 여행 일정을 검토하는 AI는 여기부터

**저장소 전체를 읽지 말고 아래 문서부터 읽으세요.** 여행 정보와 앱 구현 파일을 분리했습니다.

1. [검토 가이드](docs/trip/review-guide.md) — 읽기 범위, 정보 우선순위, 검토용 프롬프트
2. [여행 조건](docs/trip/overview.md) — 동행·항공편·숙소·예산·확정 조건
3. [전체 일정](docs/trip/itinerary.md) — 날짜별 시간·장소·메모
4. [예약 상태](docs/trip/bookings.md) — 완료와 확인 필요 항목 구분
5. [식사 계획](docs/trip/food.md) — 외식 후보·예상 비용·집밥

관광지 영업시간·입장권·행사·날씨·가격은 방문 직전 공식 정보로 재확인하세요. 저장소에는 웹사이트에서 직접 수정한 최신 운영 데이터가 포함되지 않을 수 있습니다.

## 정보 관리

- 일정 원본: `lib/trip.ts`; 식사 원본: `lib/restaurants.ts`; 고정 예보: `lib/weather.ts`.
- 코드의 일정·식사를 바꿨다면 `node scripts/export-trip-docs.mjs`로 읽기용 문서를 갱신합니다.
- 새로 확인한 예약 상태·사용자 조건은 `docs/trip/bookings.md`와 `overview.md`를 함께 갱신합니다. 생성 문서는 예약 실적을 증명하지 않습니다.
- 2026-10-29 조회 예보는 자동 갱신되지 않습니다. 실시간 날씨로 인용하지 마세요.

## 개발·배포

앱은 `app/`, 데이터·서버 로직은 `lib/`, 사진·글꼴은 `public/`에 있습니다. `scripts/`, `build/`, `drizzle/`, `vendor/`는 실행·배포에 필요한 도구·DB·스타일 파일입니다. 여행 검토에는 읽지 않아도 됩니다.

Node.js 22.13 이상과 프로젝트 지정 pnpm을 사용합니다.

```bash
pnpm install
pnpm dev
```

```bash
node scripts/export-trip-docs.mjs
node scripts/check-itinerary.mjs
node scripts/check-design.mjs
pnpm build
```

배포는 Sites에서 관리합니다. 이 GitHub 저장소에 푸시한다고 웹사이트가 자동 배포되지는 않습니다. 비용·투표·추억·웹사이트에서 편집한 일정은 D1/R2 운영 데이터에 저장되며 Git에 포함되지 않습니다.

미사용 UI 컴포넌트 6개를 제거했습니다. 보험 PDF는 `docs/reference/axa_policy.pdf`에 보존하며 보험 검토 시에만 읽습니다. 사진·글꼴·lockfile·DB 및 빌드 파일은 유지합니다.

웹사이트 배포 기준 소스: `1a57ce50ec4e106c43efb3888cef22df5ff6ed03` (Sites 원본 저장소).
문서 구조 및 예약 상태 보완: 2026-10-29. 이번 저장소 정리는 웹사이트 재배포를 포함하지 않습니다.
