# Tasks: Location Resolution

**Input**: `specs/001-location-resolution/` (plan.md, spec.md, data-model.md)
**Tests**: Light Vitest tests for pure logic only.

## Phase 1: Setup

- [x] T001 Scaffold Vite + React project files (`package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`)
- [x] T002 Add Tailwind v4 (`@tailwindcss/vite`) and `src/index.css`; add lucide-react and Vitest; `.gitignore`

## Phase 2: Foundational

- [x] T003 [P] `src/lib/storage.js` safe JSON get/set + `src/lib/storage.test.js`

## Phase 3: User Story 1 - Automatic location (P1) MVP

- [x] T004 [US1] `src/services/locationService.js`: `isValidLocation`, `loadSavedLocation`, `saveLocation`, `detectLocation`
- [x] T005 [US1] `src/hooks/useLocation.js` and render coordinates in `src/App.jsx`

## Phase 4: User Story 2 - Denied/unavailable (P2)

- [x] T006 [US2] Add `DEFAULT_LOCATION` fallback + `retry` in hook
- [x] T007 [US2] `src/components/LocationBanner.jsx` with default notice and "Use my location" button
- [x] T008 [P] [US1/US2] `src/services/locationService.test.js` (validation, corrupt saved data)

## Phase 5: Polish

- [x] T009 Run `npm test` and `npm run build`; follow `quickstart.md`

## Dependencies

T001 → T002 → T003 → T004 → T005 → T006 → T007; T008 after T004.
