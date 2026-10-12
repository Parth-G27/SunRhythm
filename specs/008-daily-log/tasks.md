# Tasks: Daily Log

**Input**: `specs/008-daily-log/` | **Tests**: Vitest for pure logic

## Phase 1: Foundational

- [x] T001 `src/services/logService.js` (`loadLog` with daily reset, `saveLog`, `recordBreak`) and `src/services/logService.test.js`
- [x] T002 [P] Add `skipIds` to `getFocusBreak` in `src/services/scheduleService.js` + test

## Phase 2: User Story 1 - Auto record (P1) MVP

- [x] T003 [US1] `src/hooks/useDailyLog.js`; call `record` from `StepOutside.onComplete` in `Dashboard.jsx`
- [x] T004 [US1] Skip completed breaks in `NextBreak` and in reminders

## Phase 3: User Story 2 - Progress view (P1)

- [x] T005 [US2] `src/components/DailyLogCard.jsx`; tick completed breaks in `ScheduleList.jsx`

## Phase 4: Polish

- [x] T006 Run `npm test`, `npm run build`, verify in browser
