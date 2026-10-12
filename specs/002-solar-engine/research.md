# Research: Solar Engine

- **Decision**: Use `suncalc` (PRD-named, tiny, MIT). **Alternatives**: hand-rolled NOAA formulas (more code and risk).
- **Decision**: Treat an invalid `Date` for sunrise or sunset as "no sunrise/sunset" (`polar: true`).
- **Decision**: Return `Date` objects; format with `toLocaleTimeString`, which uses the browser's time zone.
