# Data Model: Ollama Routine Generator

**AI reply (expected)**: `{ "breaks": [ { "time": "HH:MM", "title": string, "instruction": string } x3 ] }`.

**Validation**: exactly 3 items; `time` matches HH:MM and lies within wake..sleep; title/instruction non-empty strings (trimmed, capped at 80 / 200 chars).

**Cached plan** (`sunrhythm:plan`): `{ key: "YYYY-MM-DD|lat|lon", windows: Break[] }`.

**Hook state**: `{ windows: Break[], source: "ai"|"fallback", generating: boolean }`.
