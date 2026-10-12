# Data Model: Reminders

- **Profile** (`sunrhythm:profile`): `{ wakeTime, sleepTime, remindersOn: boolean }`, default `remindersOn: true`.
- **ReminderLog** (`sunrhythm:notified`): `{ date: "YYYY-MM-DD", ids: ("morning"|"midday"|"evening")[] }`; reset when the date changes.
- **Hook state**: `due: Break | null` (the banner's break).
