# Data Model: Step Outside Mode

No stored data.

- **FocusBreak**: `{ item: Break, active: boolean }` — `active` when `start <= now < start + 30 min`; otherwise the next future break; `null` when none remain.
- **Session** (component state): `startedAt`, `endAt`, `phase: "running" | "done"`, `minutes`.
