# Research: Step Outside Mode

- **Decision**: Countdown derives from `endAt = startedAt + duration`, re-read every 500 ms. **Rationale**: background throttling cannot make it drift.
- **Decision**: Replace `getNextBreak` with `getFocusBreak` (open-or-next, 30 min grace). **Rationale**: one rule feeds both the card and, later, reminders.
- **Decision**: No wake-lock or fullscreen API. **Rationale**: simplicity; an overlay covering the viewport is enough.
