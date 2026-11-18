# 이세계 소환사 — 게임 허브

React 19, TypeScript, Vite 기반의 애니메이션 선택형 게임 허브입니다.

## 실행

```bash
npm install
npm run check
npm run build
npm run dev
```

## 플레이 가능한 작품

- 슬램덩크 (`src/games/slamdunk`)
- 진격의 거인 (`src/games/attack`)
- 꿈빛 파티시엘 (`src/games/yumeiro`)

작품 목록은 `src/data/animeWorlds.ts`에서 관리합니다. 작품 카드의 `status`가 `available`인 경우 `src/contexts/GameContext.tsx`의 라우팅을 통해 게임을 시작합니다.

## 꿈빛 파티시엘

10개 에피소드, 에피소드별 3개 선택지, 제과 실력/팀워크 점수, 디저트 성향, 3종 엔딩을 제공합니다. 브라우저의 localStorage에 플레이 진행 상태가 저장됩니다.

**아트 상태:** 게임 타이틀에 기존 저장소의 작품 표지를 사용합니다. 개별 캐릭터 표정, 장면 배경, 9종 디저트 완성 이미지는 확보되지 않아 현재 임시 그래픽으로 표시됩니다. 권리 확인된 원작 에셋이 확보되면 교체해야 합니다. 기존 작품 표지를 포함한 모든 애니메이션 이미지는 공개 배포 전에 사용 권한을 확인해야 합니다.

## Vercel

Vite 프로젝트로, 빌드 명령은 `npm run build`, 출력 폴더는 `dist`입니다. Vercel에서 저장소의 `main` 브랜치를 연결하면 변경 사항이 배포됩니다. 배포 전에 `npm run check && npm run build`를 실행해 주세요.
