# Research: Location Resolution

- **Decision**: Use `navigator.geolocation.getCurrentPosition` with a 10 s timeout and `maximumAge` of 1 hour.
  **Rationale**: Built in, no network, no dependency. **Alternatives**: IP geolocation (cloud call — violates Principle I).
- **Decision**: Default location is New Delhi (28.6139, 77.2090), matching the PRD sample.
  **Rationale**: Gives a working app with zero input. **Alternatives**: blocking form (violates Principle IV).
- **Decision**: Tailwind v4 via the Vite plugin. **Rationale**: No config file or PostCSS needed.
- **Decision**: No state library yet; a hook per concern. **Rationale**: Principle V.
