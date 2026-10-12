# Implementation Plan: Reminders

**Branch**: `feature/step-outside-reminders-log-settings` | **Date**: 2026-10-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/007-reminders/spec.md`

## Summary

`reminderService` (pure `getDueReminder`, WebAudio `playChime`, `vibrate`), a `useReminder` hook
that fires once per break using a per-day record in localStorage, a `ReminderBanner`, and a bell
toggle. The profile gains `remindersOn`; a small `useProfile` hook makes the profile reactive
(also needed by Settings later).

## Technical Context

**Language/Version**: JavaScript (ES2022), React 18
**Primary Dependencies**: none new (Web Audio, Vibration API, lucide-react icons)
**Storage**: `sunrhythm:notified` (`{date, ids}`), `sunrhythm:profile` gains `remindersOn`
**Testing**: Vitest for `getDueReminder` and profile defaults
**Target Platform**: Browser with the tab open
**Project Type**: Single web project (existing)
**Performance Goals**: Checked on the existing 30 s tick
**Constraints**: No audio files, no network, no OS notifications
**Scale/Scope**: One service, one hook, one banner

## Constitution Check

| Principle | Status |
|-----------|--------|
| I. Local-first & privacy | PASS — synthesized sound, no network |
| II. localStorage-only | PASS — two small localStorage entries |
| III. Graceful degradation | PASS — audio/vibration failures ignored |
| IV. Minimal friction | PASS — automatic, one-tap mute |
| V. Simplicity | PASS — no Notification API or service worker |

## Project Structure

```text
specs/007-reminders/{spec,plan,research,data-model,quickstart,tasks}.md
src/
├── services/
│   ├── profileService.js      # + remindersOn, saveProfile
│   ├── reminderService.js     # getDueReminder, playChime, vibrate
│   └── reminderService.test.js
├── hooks/
│   ├── useProfile.js          # reactive profile
│   └── useReminder.js
└── components/
    ├── ReminderBanner.jsx
    ├── Dashboard.jsx          # wires everything + bell toggle
    └── (useSchedule takes profile as an argument)
```

## Complexity Tracking

No violations.
