# Data Model: Fallback Schedule

**Profile** (`sunrhythm:profile`): `{ wakeTime: "HH:MM", sleepTime: "HH:MM" }`, defaults `07:00` / `23:00`.

**Break**: `{ id: "morning"|"midday"|"evening", start: ISO string, durationMin: number, title: string, instruction: string }`.
A schedule is an array of exactly three Breaks in chronological order.
