# Data Model: Location Resolution

**Location** (stored as JSON under `sunrhythm:location`)

| Field | Type | Rules |
|-------|------|-------|
| lat | number | -90..90 |
| lon | number | -180..180 |
| source | `"detected"` \| `"default"` | default is never persisted |
| label | string (optional) | display only |

**Status** (hook state): `loading` → `detected` | `default`.
Only `detected` locations are saved. Invalid saved data is discarded.
