# Tasks: Fallback Schedule

**Input**: `specs/003-fallback-schedule/` | **Tests**: Vitest on pure functions

## Phase 1: User Story 2 - Defaults (P2, needed first)

- [x] T001 [US2] `src/services/profileService.js`: `DEFAULT_PROFILE`, `loadProfile` with validation

## Phase 2: User Story 1 - Three breaks (P1) MVP

- [x] T002 [US1] `src/services/scheduleService.js`: `buildFallbackSchedule` (incl. polar fallback)
- [x] T003 [P] [US1] `src/services/scheduleService.test.js` (count/order, wake shift, sunrise clamp, polar, defaults)
- [x] T004 [US1] `src/hooks/useSchedule.js` and `src/components/ScheduleList.jsx`; render in `src/App.jsx`

## Phase 3: Polish

- [x] T005 Run `npm test` and `npm run build`
