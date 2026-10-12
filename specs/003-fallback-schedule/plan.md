# Implementation Plan: Fallback Schedule

**Branch**: `003-fallback-schedule` | **Date**: 2026-10-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/003-fallback-schedule/spec.md`

## Summary

Add a `profileService` (defaults + validation, stored under `sunrhythm:profile`) and a pure
`scheduleService.buildFallbackSchedule(solar, profile, date)`. A `useSchedule` hook returns the
windows; a simple `ScheduleList` renders them (the dashboard in feature 5 will replace the layout).

## Technical Context

**Language/Version**: JavaScript (ES2022), React 18
**Primary Dependencies**: none new
**Storage**: `localStorage` key `sunrhythm:profile` (read-only for now)
**Testing**: Vitest on pure functions
**Target Platform**: Browser
**Project Type**: Single web project (existing)
**Performance Goals**: Instant
**Constraints**: No network
**Scale/Scope**: Two services, one hook, one component

## Constitution Check

| Principle | Status |
|-----------|--------|
| I. Local-first & privacy | PASS — no network |
| II. localStorage-only | PASS — profile in localStorage |
| III. Graceful degradation | PASS — this *is* the fallback |
| IV. Minimal friction | PASS — defaults, no input |
| V. Simplicity | PASS — plain functions |

## Project Structure

```text
specs/003-fallback-schedule/{spec,plan,research,data-model,quickstart,tasks}.md
src/
├── services/
│   ├── profileService.js      # DEFAULT_PROFILE, loadProfile
│   ├── scheduleService.js     # buildFallbackSchedule
│   └── scheduleService.test.js
├── hooks/useSchedule.js
└── components/ScheduleList.jsx
```

## Complexity Tracking

No violations.
