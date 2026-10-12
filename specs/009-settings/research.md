# Research: Settings

- **Decision**: Native `<input type="time">` and `type="number"`. **Rationale**: no library, good mobile pickers.
- **Decision**: Require wake < sleep on the same day. **Rationale**: the AI plan validator and schedule assume one waking day.
- **Decision**: Manual coordinates are saved like detected ones, with `source: "manual"`; retry detection overwrites them.
- **Decision**: Include wake/sleep in the plan cache key. **Rationale**: stale AI plans would ignore new times.
