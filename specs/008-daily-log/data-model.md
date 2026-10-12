# Data Model: Daily Log

**DailyLog** (`sunrhythm:log`): `{ date: "YYYY-MM-DD", completed: { morning?: true, midday?: true, evening?: true }, totalOutdoorMinutes: number }`.

Rules: reset when `date` differs from today or data is invalid; `recordBreak` with minutes < 1 is a no-op; otherwise sets the break completed and adds minutes.
