# Implementation Plan: Daily Log

**Branch**: `feature/step-outside-reminders-log-settings` | **Date**: 2026-10-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/008-daily-log/spec.md`

## Summary

Pure `logService` (load-with-reset, `recordBreak`), a `useDailyLog` hook, and a `DailyLogCard`.
`StepOutside.onComplete` calls `record`. `getFocusBreak` and `getDueReminder` take the completed
ids so finished breaks are skipped.

## Technical Context

**Language/Version**: JavaScript (ES2022), React 18
**Primary Dependencies**: none new
**Storage**: `localStorage` key `sunrhythm:log`
**Testing**: Vitest for `logService`, `getFocusBreak` skip
**Target Platform**: Browser
**Project Type**: Single web project (existing)
**Performance Goals**: Instant
**Constraints**: No network, no manual entry
**Scale/Scope**: One service, one hook, one card

## Constitution Check

| Principle | Status |
|-----------|--------|
| I. Local-first & privacy | PASS — device only |
| II. localStorage-only | PASS — one key |
| III. Graceful degradation | PASS — corrupt data resets to empty |
| IV. Minimal friction | PASS — recorded automatically |
| V. Simplicity | PASS — single-day log, no history |

## Project Structure

```text
specs/008-daily-log/{spec,plan,research,data-model,quickstart,tasks}.md
src/
├── services/
│   ├── logService.js          # loadLog, saveLog, recordBreak
│   ├── logService.test.js
│   ├── scheduleService.js     # getFocusBreak(windows, now, skipIds)
│   └── reminderService.js     # getDueReminder already takes ids
├── hooks/useDailyLog.js
└── components/
    ├── DailyLogCard.jsx
    ├── ScheduleList.jsx       # tick completed
    ├── NextBreak.jsx / Dashboard.jsx  # wiring
```

## Complexity Tracking

No violations.
