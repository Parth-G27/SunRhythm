# Implementation Plan: Step Outside Mode

**Branch**: `feature/step-outside-reminders-log-settings` | **Date**: 2026-10-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/006-step-outside/spec.md`

## Summary

A `StepOutside` full-screen overlay driven by a fixed end timestamp. Pure helper
`getFocusBreak` picks the open-or-next break; `formatClock` renders mm:ss. `NextBreak` gains the
button and "open now" state; `Dashboard` holds the active-break state.

## Technical Context

**Language/Version**: JavaScript (ES2022), React 18
**Primary Dependencies**: Tailwind, lucide-react (no new packages)
**Storage**: N/A
**Testing**: Vitest for pure helpers
**Target Platform**: Browser, mobile-first
**Project Type**: Single web project (existing)
**Performance Goals**: One 500 ms interval while the overlay is open
**Constraints**: No network
**Scale/Scope**: One component, two helpers

## Constitution Check

| Principle | Status |
|-----------|--------|
| I. Local-first & privacy | PASS — no network or data |
| II. localStorage-only | PASS — nothing stored |
| III. Graceful degradation | PASS — pure local UI |
| IV. Minimal friction | PASS — one tap, no input |
| V. Simplicity | PASS — one overlay, timestamp-based clock |

## Project Structure

```text
specs/006-step-outside/{spec,plan,research,data-model,quickstart,tasks}.md
src/
├── services/scheduleService.js   # getNextBreak -> getFocusBreak, + formatClock
├── services/scheduleService.test.js
└── components/
    ├── StepOutside.jsx           # new overlay
    ├── NextBreak.jsx             # button + open-now state
    └── Dashboard.jsx             # active-break state
```

## Complexity Tracking

No violations.
