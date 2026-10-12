# Implementation Plan: Dashboard and Solar Card

**Branch**: `005-dashboard` | **Date**: 2026-10-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/005-dashboard/spec.md`

## Summary

Compose existing hooks into a `Dashboard` with three presentational parts: `NextBreak`,
`SolarCard`, and the timeline (`ScheduleList`, now dimming past breaks). A `useNow` hook ticks
every 30 s. `getNextBreak` and `formatCountdown` are pure and tested. `App` shrinks to a shell.

## Technical Context

**Language/Version**: JavaScript (ES2022), React 18
**Primary Dependencies**: Tailwind, lucide-react (icons), no new packages
**Storage**: N/A (reads existing state)
**Testing**: Vitest for `getNextBreak`/`formatCountdown`
**Target Platform**: Browser, mobile-first layout
**Project Type**: Single web project (existing)
**Performance Goals**: One timer, re-render every 30 s
**Constraints**: No network, no input
**Scale/Scope**: Three small components + one hook

## Constitution Check

| Principle | Status |
|-----------|--------|
| I. Local-first & privacy | PASS — no new data flow |
| II. localStorage-only | PASS — nothing new stored |
| III. Graceful degradation | PASS — polar, loading and done states handled |
| IV. Minimal friction | PASS — read-only glance view |
| V. Simplicity | PASS — plain Tailwind, no chart library |

## Project Structure

```text
specs/005-dashboard/{spec,plan,research,data-model,quickstart,tasks}.md
src/
├── App.jsx                    # shell: renders Dashboard
├── hooks/useNow.js
├── services/scheduleService.js   # + getNextBreak, formatCountdown
├── services/scheduleService.test.js
└── components/
    ├── Dashboard.jsx
    ├── NextBreak.jsx
    ├── SolarCard.jsx
    ├── ScheduleList.jsx       # updated: dim past
    └── SolarTimesList.jsx     # removed (replaced by SolarCard)
```

## Complexity Tracking

No violations.
