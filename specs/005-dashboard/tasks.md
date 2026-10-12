# Tasks: Dashboard and Solar Card

**Input**: `specs/005-dashboard/` | **Tests**: Vitest for pure helpers

## Phase 1: Foundational

- [x] T001 `src/hooks/useNow.js` (30 s ticker)
- [x] T002 [P] `getNextBreak` + `formatCountdown` in `src/services/scheduleService.js` with tests in `src/services/scheduleService.test.js`

## Phase 2: User Story 1 - Next break (P1) MVP

- [x] T003 [US1] `src/components/NextBreak.jsx` (countdown, done state)

## Phase 3: User Story 2 - Sun position (P2)

- [x] T004 [US2] `src/components/SolarCard.jsx` (bar, marker, night/polar states); remove `SolarTimesList.jsx`

## Phase 4: User Story 3 - Timeline (P3)

- [x] T005 [US3] Update `src/components/ScheduleList.jsx` to dim past breaks
- [x] T006 [US3] `src/components/Dashboard.jsx` composing all parts; slim `src/App.jsx`

## Phase 5: Polish

- [x] T007 Run `npm test`, `npm run build`; visual check at desktop and 375 px width
