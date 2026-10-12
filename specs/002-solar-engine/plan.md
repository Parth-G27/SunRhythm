# Implementation Plan: Solar Engine

**Branch**: `002-solar-engine` | **Date**: 2026-10-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-solar-engine/spec.md`

## Summary

A pure `solarService` wrapping the `suncalc` library, plus a `useSolarTimes(location)` hook and a
minimal list of times in `App`. No network, no state library.

## Technical Context

**Language/Version**: JavaScript (ES2022), React 18
**Primary Dependencies**: `suncalc` (open-source solar math)
**Storage**: N/A (recomputed on each load)
**Testing**: Vitest on pure functions
**Target Platform**: Browser
**Project Type**: Single web project (existing)
**Performance Goals**: Instant (<5 ms per computation)
**Constraints**: No network
**Scale/Scope**: One service, one hook

## Constitution Check

| Principle | Status |
|-----------|--------|
| I. Local-first & privacy | PASS — pure local math |
| II. localStorage-only | PASS — nothing stored |
| III. Graceful degradation | PASS — polar days handled |
| IV. Minimal friction | PASS — derived from location |
| V. Simplicity | PASS — one small dependency |

## Project Structure

```text
specs/002-solar-engine/{spec,plan,research,data-model,quickstart,tasks}.md
src/
├── services/
│   ├── solarService.js        # getSolarTimes, getSunProgress, formatTime
│   └── solarService.test.js
├── hooks/useSolarTimes.js
└── components/SolarTimesList.jsx   # temporary simple list, replaced by SolarCard in feature 5
```

**Structure Decision**: Same flat layout as feature 001.

## Complexity Tracking

No violations.
