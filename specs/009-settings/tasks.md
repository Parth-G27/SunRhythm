# Tasks: Settings

**Input**: `specs/009-settings/` | **Tests**: Vitest for validators

## Phase 1: Foundational

- [x] T001 `validateTimes` in `src/services/profileService.js`, `parseCoords` in `src/services/locationService.js`, tests in `src/services/settings.test.js`
- [x] T002 [P] Plan cache key includes wake/sleep in `src/hooks/useSchedule.js`

## Phase 2: User Story 1 - Wake/sleep (P1) MVP

- [x] T003 [US1] `src/components/SettingsModal.jsx` (times, validation, save) and gear button in `Dashboard.jsx`

## Phase 3: User Story 2 - Location override (P2)

- [x] T004 [US2] `setManual` and `manual` status in `src/hooks/useLocation.js`; lat/lon fields and "Use my location" in the modal; label in `LocationBanner.jsx`

## Phase 4: Polish

- [x] T005 Update README; run `npm test`, `npm run build`, verify in browser
