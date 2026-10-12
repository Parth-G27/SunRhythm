# Data Model: Settings

- **Profile**: unchanged shape `{ wakeTime, sleepTime, remindersOn }`.
- **Location**: `{ lat, lon, source: "detected" | "manual" | "default", label? }`; manual is persisted.
- **Plan cache key**: `date|lat|lon|wake|sleep`.

Validation: `validateTimes(wake, sleep)` → error text or `null`; `parseCoords(lat, lon, label)` → Location or `null`.
