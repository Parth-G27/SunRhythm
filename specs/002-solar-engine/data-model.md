# Data Model: Solar Engine

**SolarTimes** (in memory only): `dawn`, `sunrise`, `solarNoon`, `sunset`, `dusk` as `Date`;
`polar: boolean` (true when sunrise or sunset is not a valid date; then only `solarNoon` is reliable).

**SunProgress**: `{ progress: 0..1, isNight: boolean }`.
