# Feature Specification: Solar Engine

**Feature Branch**: `claude/sunrhythm-design-principles-2231f1`
**Created**: 2026-10-12
**Status**: Draft
**Input**: User description: "Compute today's sunrise, solar noon, sunset and twilight times for the user's location, locally."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See today's sun times (Priority: P1)

The user sees today's dawn, sunrise, solar noon, sunset and dusk in their local time for their location.

**Why this priority**: Every daylight window in the product is anchored to these times.

**Independent Test**: With a known location and date, the shown times fall in the expected order and match a reference almanac within a few minutes.

**Acceptance Scenarios**:

1. **Given** a location and today's date, **When** the app loads, **Then** dawn < sunrise < solar noon < sunset < dusk are shown in local time.
2. **Given** the location changes, **When** the app recalculates, **Then** the times update accordingly.

---

### User Story 2 - Know where the sun is now (Priority: P2)

The app can state how far through the daylight period the current moment is (before sunrise, daytime progress, after sunset).

**Why this priority**: Powers the sun-position display and "is it daylight now" checks.

**Independent Test**: For a moment halfway between sunrise and sunset, progress reads 50%; before sunrise 0%, after sunset 100%.

**Acceptance Scenarios**:

1. **Given** the current time is between sunrise and sunset, **When** progress is requested, **Then** a value between 0 and 1 is returned.
2. **Given** the current time is outside daylight, **When** progress is requested, **Then** it is clamped to 0 or 1 and flagged as night.

---

### Edge Cases

- Polar day or night (no sunrise/sunset on this date): the engine reports "no sunrise/sunset" instead of failing.
- Dates near midnight: times are computed for the user's local calendar day.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST compute dawn, sunrise, solar noon, sunset and dusk for a given latitude, longitude and date.
- **FR-002**: Computation MUST happen entirely on the device with no network access.
- **FR-003**: System MUST present times in the user's local time zone in a readable short format.
- **FR-004**: System MUST report when sunrise or sunset does not occur and let callers handle it.
- **FR-005**: System MUST provide daylight progress (0–1) and a night flag for a given moment.

### Key Entities

- **SolarTimes**: dawn, sunrise, solarNoon, sunset, dusk (moments), plus a flag for no-sunrise/sunset days.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Computed sunrise and sunset are within 5 minutes of a published almanac for the same place and date.
- **SC-002**: Times appear immediately after location is known, with no loading delay.
- **SC-003**: Polar-day locations never cause an error or blank screen.

## Assumptions

- Standard astronomical formulas from an open-source library are acceptable.
- Weather is out of scope (it would need an external service).
