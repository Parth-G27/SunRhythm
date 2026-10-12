# Feature Specification: Location Resolution

**Feature Branch**: `claude/sunrhythm-design-principles-2231f1`
**Created**: 2026-10-12
**Status**: Draft
**Input**: User description: "Resolve the user's coordinates automatically from the browser, remember them locally, and fall back gracefully when permission is denied."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Automatic location on first visit (Priority: P1)

A first-time user opens SunRhythm and is asked once for permission to use their location. On approval the app knows where they are with no typing.

**Why this priority**: Every later feature (sun times, schedule) depends on a location.

**Independent Test**: Open the app with location permission granted; the app shows resolved coordinates and no form is presented.

**Acceptance Scenarios**:

1. **Given** no saved location, **When** the user grants permission, **Then** the app holds the user's coordinates and saves them on the device.
2. **Given** a saved location, **When** the user reopens the app, **Then** it starts immediately from the saved location without asking again.

---

### User Story 2 - Works when permission is denied (Priority: P2)

A user who declines or whose device cannot provide a location still gets a working app.

**Why this priority**: Prevents a dead-end first experience.

**Independent Test**: Deny permission; the app shows a clear notice and continues using a default location.

**Acceptance Scenarios**:

1. **Given** permission is denied or unavailable, **When** the app loads, **Then** it uses a default location, labels it as a default, and offers a "Use my location" retry.
2. **Given** the default location is in use, **When** the user retries and grants permission, **Then** the real location replaces it and is saved.

---

### Edge Cases

- Location request times out: treated like denied.
- Saved data is corrupt or missing fields: ignored and treated as no saved location.
- Coordinates out of valid range: rejected.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST request the device location automatically when no valid saved location exists.
- **FR-002**: System MUST NOT require the user to type any data to obtain a location.
- **FR-003**: System MUST save the resolved location on the user's device only and MUST NOT transmit it anywhere.
- **FR-004**: System MUST reuse a valid saved location on later visits without prompting.
- **FR-005**: System MUST fall back to a clearly labelled default location when permission is denied, times out, or is unsupported.
- **FR-006**: Users MUST be able to retry location detection after a failure.
- **FR-007**: System MUST validate coordinates (latitude -90..90, longitude -180..180) before using them.

### Key Entities

- **Location**: latitude, longitude, a source (detected or default), and an optional label.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user with permission granted reaches a resolved location with one tap and zero typed input.
- **SC-002**: A returning user sees their location resolved instantly with no permission prompt.
- **SC-003**: With permission denied, the app is fully usable within one screen load and explains why a default is shown.
- **SC-004**: No location data is sent over any network.

## Assumptions

- A single default location (New Delhi) is acceptable as the fallback.
- Place-name search and manual coordinate entry are out of scope (they need a network lookup or violate low-friction goals).
- The app is a single-page web app used in a modern browser.
