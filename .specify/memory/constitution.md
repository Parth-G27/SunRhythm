<!--
Sync Impact Report
- Version change: (unfilled template) → 1.0.0
- Modified principles: none renamed; all five principle slots filled for the first time
- Added sections: Core Principles I–V, Technical Constraints, Development Workflow, Governance
- Removed sections: none
- Follow-up TODOs: none
-->
# SunRhythm Constitution

## Core Principles

### I. Local-First & Privacy-First (NON-NEGOTIABLE)
Coordinates, location, and sleep patterns MUST NOT leave the user's device. The only permitted
network call is to a locally running Ollama instance on `localhost`. No analytics, telemetry,
third-party APIs, CDNs for runtime data, or cloud services may receive user data.
Rationale: location and sleep data are highly sensitive; the product's trust depends on this
guarantee being absolute and easy to audit.

### II. localStorage-Only Persistence
All persisted state MUST live in the browser's `localStorage`. No backend, database, cookies for
data storage, or remote sync is permitted. Stored data MUST be limited to what the app needs and
MUST be clearable by the user.
Rationale: keeps the app serverless and consistent with Principle I.

### III. Graceful Degradation
When Ollama is unavailable, slow, or returns invalid output, the app MUST fall back to a static
schedule and keep working without errors or blocking states. The fallback MUST be exercised by
at least one test or documented manual check.
Rationale: the AI layer is an enhancement, never a dependency.

### IV. Minimal Screen Friction
Users MUST NOT be required to enter data manually for core functionality; inputs are derived
from device capabilities (e.g., geolocation, time) or sensible defaults. Any optional override
MUST NOT block the primary flow. Screens MUST present the schedule at a glance.
Rationale: a rhythm tool that demands upkeep will be abandoned.

### V. Simplicity for a Weekend Build
Prefer the simplest solution that works (YAGNI). New dependencies, abstractions, or services MUST
be justified by a concrete need in the current spec. Scope is cut before complexity is added.
Rationale: this is a hackathon project; a working demo beats an elaborate design.

## Technical Constraints

- Stack: React + Vite + Tailwind CSS. Changes to this stack require a constitution amendment.
- Network: only `localhost` Ollama requests are allowed (see Principle I); any new `fetch` target
  MUST be reviewed against it.
- Storage: `localStorage` only (see Principle II).
- Runs entirely as a static client-side app; no server component.

## Development Workflow

- Work follows Spec Kit: specify → plan → tasks → implement.
- Specs and plans MUST include a Constitution Check against Principles I–V.
- Pull requests MUST confirm no new outbound network targets and no new storage mechanisms.
- Keep changes small and demo-able; each increment should leave the app runnable.

## Governance

This constitution supersedes other practices. Amendments require a documented change to this
file, a version bump, and a note of any affected specs or plans. Versioning follows semantic
versioning: MAJOR for removed or redefined principles, MINOR for added principles or materially
expanded guidance, PATCH for clarifications. Compliance is reviewed at spec/plan time (Constitution
Check) and in every pull request; unjustified violations block merge.

**Version**: 1.0.0 | **Ratified**: 2026-10-12 | **Last Amended**: 2026-10-12
