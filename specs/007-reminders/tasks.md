# Tasks: Reminders

**Input**: `specs/007-reminders/` | **Tests**: Vitest for pure logic

## Phase 1: Foundational

- [x] T001 Extend `src/services/profileService.js` (`remindersOn`, `saveProfile`) and add `src/hooks/useProfile.js`; make `useSchedule` take `profile` as an argument
- [x] T002 [P] `src/services/reminderService.js`: `getDueReminder`, `playChime`, `vibrate`, `unlockAudio`, plus `src/services/reminderService.test.js`

## Phase 2: User Story 1 - Nudge (P1) MVP

- [x] T003 [US1] `src/hooks/useReminder.js` (fire chime + vibration + banner state)
- [x] T004 [US1] `src/components/ReminderBanner.jsx` with Start/Dismiss; wire into `Dashboard.jsx`

## Phase 3: User Story 2 - Once only and mute (P2)

- [x] T005 [US2] Per-day notified record in localStorage; bell toggle in header persisting `remindersOn`

## Phase 4: Polish

- [x] T006 Run `npm test`, `npm run build`, verify banner in browser
