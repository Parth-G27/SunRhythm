# Research: Dashboard and Solar Card

- **Decision**: Sun bar is a plain Tailwind div with an absolutely positioned marker (percentage from `getSunProgress`). **Alternative**: SVG arc/chart lib — more code, no extra value.
- **Decision**: `useNow` ticks every 30 s so countdowns stay within a minute.
- **Decision**: Remove `SolarTimesList`; SolarCard shows sunrise/noon/sunset (dawn/dusk are not needed for the MVP view).
