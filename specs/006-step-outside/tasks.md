# Tasks: Step Outside Mode

**Input**: `specs/006-step-outside/` | **Tests**: Vitest for pure helpers

## Phase 1: Foundational

- [x] T001 Replace `getNextBreak` with `getFocusBreak` and add `formatClock` in `src/services/scheduleService.js`; update tests in `src/services/scheduleService.test.js`

## Phase 2: User Story 1 - Big clock (P1) MVP

- [x] T002 [US1] `src/components/StepOutside.jsx`: full-screen overlay, timestamp countdown, early exit, completion screen, `onComplete(minutes)` callback
- [x] T003 [US1] Dashboard state + "Step outside" button in `src/components/NextBreak.jsx` / `Dashboard.jsx`

## Phase 3: User Story 2 - Open-now state (P2)

- [x] T004 [US2] `NextBreak` uses `getFocusBreak`; shows "Time to step outside" when active

## Phase 4: Polish

- [x] T005 Run `npm test`, `npm run build`, check in browser
