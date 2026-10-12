# Tasks: Solar Engine

**Input**: `specs/002-solar-engine/` | **Tests**: Vitest on pure functions

## Phase 1: Setup

- [x] T001 Add `suncalc` dependency

## Phase 2: User Story 1 - Today's sun times (P1) MVP

- [x] T002 [US1] `src/services/solarService.js`: `getSolarTimes`, `formatTime`
- [x] T003 [US1] `src/hooks/useSolarTimes.js` and `src/components/SolarTimesList.jsx`; render in `src/App.jsx`
- [x] T004 [P] [US1] `src/services/solarService.test.js` (ordering, polar day)

## Phase 3: User Story 2 - Sun position (P2)

- [x] T005 [US2] `getSunProgress` in `solarService.js` + tests for before/mid/after daylight

## Phase 4: Polish

- [x] T006 Run `npm test` and `npm run build`
