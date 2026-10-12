# Implementation Plan: Location Resolution

**Branch**: `001-location-resolution` | **Date**: 2026-10-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-location-resolution/spec.md`

## Summary

Bootstrap the React + Vite + Tailwind app and add a small location service: read `localStorage`,
else call `navigator.geolocation` once, else use a labelled default (New Delhi). A `useLocation`
hook exposes `{ location, status, retry }` to the UI.

## Technical Context

**Language/Version**: JavaScript (ES2022), React 18, Node 20+ for tooling
**Primary Dependencies**: React, Vite, Tailwind CSS v4 (`@tailwindcss/vite`), lucide-react
**Storage**: `localStorage` key `sunrhythm:location`
**Testing**: Vitest (pure-function tests only)
**Target Platform**: Modern desktop/mobile browser, static client-side app
**Project Type**: Single web project
**Performance Goals**: Location resolved (or fallback shown) within 10 s
**Constraints**: No network calls; no manual data entry
**Scale/Scope**: One screen, one service, one hook

## Constitution Check

| Principle | Status |
|-----------|--------|
| I. Local-first & privacy | PASS — browser geolocation only, nothing transmitted |
| II. localStorage-only | PASS — single `localStorage` key |
| III. Graceful degradation | PASS — default location on any failure |
| IV. Minimal friction | PASS — zero typed input |
| V. Simplicity | PASS — no state library, one hook |

Post-design re-check: PASS.

## Project Structure

### Documentation

```text
specs/001-location-resolution/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── tasks.md
```

### Source Code (repository root)

```text
index.html
package.json
vite.config.js
src/
├── main.jsx
├── index.css
├── App.jsx
├── lib/
│   ├── storage.js            # safe get/set JSON in localStorage
│   └── storage.test.js
├── services/
│   ├── locationService.js    # validate, load, save, detect, default
│   └── locationService.test.js
├── hooks/
│   └── useLocation.js
└── components/
    └── LocationBanner.jsx    # status + retry
```

**Structure Decision**: Flat single project under `src/`; tests sit next to the code they cover.

## Complexity Tracking

No violations.
