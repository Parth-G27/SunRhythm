# Research: Fallback Schedule

- **Decision**: Anchor offsets (wake+30 min, noon+90 min, sunset−30 min) follow the PRD's static example times for a typical day.
- **Decision**: Break start stored as ISO string so the same shape serves the AI plan and any caching later.
- **Decision**: Polar fallback uses fixed 08:00 / 13:30 / 18:00 local times.
