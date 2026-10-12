# Implementation Plan: Settings

**Branch**: `feature/step-outside-reminders-log-settings` | **Date**: 2026-10-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/009-settings/spec.md`

## Summary

`SettingsModal` with time inputs and lat/lon fields. Pure validators (`validateTimes`,
`parseCoords`). `useLocation` gains `setManual`; the AI-plan cache key includes wake/sleep so
edited times regenerate the plan.

## Technical Context

**Language/Version**: JavaScript (ES2022), React 18
**Primary Dependencies**: none new (lucide-react `Settings` icon)
**Storage**: existing `sunrhythm:profile` and `sunrhythm:location`
**Testing**: Vitest for validators
**Target Platform**: Browser
**Project Type**: Single web project (existing)
**Performance Goals**: Instant
**Constraints**: No network (no geocoding)
**Scale/Scope**: One modal, two validators

## Constitution Check

| Principle | Status |
|-----------|--------|
| I. Local-first & privacy | PASS — no place lookup, device-only |
| II. localStorage-only | PASS — existing keys |
| III. Graceful degradation | PASS — invalid input rejected, defaults remain |
| IV. Minimal friction | PASS — optional; defaults need no input |
| V. Simplicity | PASS — one modal, native inputs |

## Project Structure

```text
specs/009-settings/{spec,plan,research,data-model,quickstart,tasks}.md
src/
├── services/
│   ├── profileService.js      # + validateTimes
│   ├── locationService.js     # + parseCoords
│   └── settings.test.js
├── hooks/
│   ├── useLocation.js         # + setManual, 'manual' status
│   └── useSchedule.js         # cache key includes wake/sleep
└── components/
    ├── SettingsModal.jsx
    ├── LocationBanner.jsx     # manual label
    └── Dashboard.jsx          # gear button
```

## Complexity Tracking

No violations.
