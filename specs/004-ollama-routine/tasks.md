# Tasks: Ollama Routine Generator

**Input**: `specs/004-ollama-routine/` | **Tests**: Vitest with stubbed `fetch`

## Phase 1: User Story 2 - Fallback safety (P1)

- [x] T001 [US2] `src/services/ollamaService.js`: `parsePlan` validation (3 items, HH:MM within waking hours, text checks)
- [x] T002 [US2] `generateSchedule` with 20 s timeout and abort; throws on any failure
- [x] T003 [P] [US2] `src/services/ollamaService.test.js`: bad JSON, wrong count, out-of-hours, network error, timeout

## Phase 2: User Story 1 - AI plan (P1) MVP

- [x] T004 [US1] `buildPrompt` (times only, no coordinates) + valid-reply test
- [x] T005 [US1] Update `src/hooks/useSchedule.js`: fallback first, async upgrade, daily cache, cancel on unmount
- [x] T006 [US1] Update `src/components/ScheduleList.jsx` and `src/App.jsx`: source label + generating note

## Phase 3: Polish

- [x] T007 README note about `OLLAMA_ORIGINS` and model
- [x] T008 Run `npm test` and `npm run build`; try quickstart with Ollama stopped
