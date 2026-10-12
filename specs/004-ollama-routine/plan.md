# Implementation Plan: Ollama Routine Generator

**Branch**: `004-ollama-routine` | **Date**: 2026-10-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/004-ollama-routine/spec.md`

## Summary

`ollamaService.generateSchedule` POSTs to `http://localhost:11434/api/generate` (`stream:false`,
`format:'json'`), validates the reply, and returns Breaks or throws. `useSchedule` shows the
fallback immediately, then upgrades to the AI plan, caching it per day + location.

## Technical Context

**Language/Version**: JavaScript (ES2022), React 18
**Primary Dependencies**: none new (native `fetch`, `AbortController`)
**Storage**: `localStorage` key `sunrhythm:plan` (one entry: key + windows)
**Testing**: Vitest with a stubbed `fetch`
**Target Platform**: Browser + local Ollama
**Project Type**: Single web project (existing)
**Performance Goals**: UI never blocked; 20 s request limit
**Constraints**: Only `localhost:11434`; no coordinates in the prompt
**Scale/Scope**: One service, hook update, small status line

## Constitution Check

| Principle | Status |
|-----------|--------|
| I. Local-first & privacy | PASS — only localhost; prompt has times only |
| II. localStorage-only | PASS — plan cache in localStorage |
| III. Graceful degradation | PASS — every failure keeps fallback |
| IV. Minimal friction | PASS — automatic |
| V. Simplicity | PASS — one fetch, one validator |

## Project Structure

```text
specs/004-ollama-routine/{spec,plan,research,data-model,quickstart,tasks}.md
src/
├── services/
│   ├── ollamaService.js        # buildPrompt, parsePlan, generateSchedule
│   └── ollamaService.test.js
├── hooks/useSchedule.js        # updated: fallback first, AI upgrade, cache
└── components/ScheduleList.jsx # updated: source label + generating note
README.md                       # OLLAMA_ORIGINS note
```

## Complexity Tracking

No violations.
