# Feature Specification: Settings

**Feature Branch**: `feature/step-outside-reminders-log-settings`
**Created**: 2026-10-12
**Status**: Draft
**Input**: User description: "Wake and sleep times with sensible defaults, plus a location override."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Set my wake and sleep times (Priority: P1)

The user opens Settings from a gear button, changes wake and/or sleep time, saves, and the schedule updates right away.

**Why this priority**: Personalises the schedule; defaults already work, so this is optional polish with high impact.

**Independent Test**: Change wake time from 07:00 to 09:00 and save; the morning break moves later and the change survives reload.

**Acceptance Scenarios**:

1. **Given** Settings is open, **When** the user saves new valid times, **Then** the schedule updates and the values persist.
2. **Given** wake time is not earlier than sleep time, **When** the user tries to save, **Then** a clear message appears and nothing is saved.
3. **Given** the user never opens Settings, **When** the app runs, **Then** defaults (07:00 / 23:00) apply.

---

### User Story 2 - Override location (Priority: P2)

A user whose device location is unavailable or wrong can enter latitude and longitude (and an optional label) manually, or switch back to automatic detection.

**Why this priority**: Rescues users who denied permission or want another place.

**Independent Test**: Enter 51.5074, -0.1278 labelled "London" and save; sun times change and persist.

**Acceptance Scenarios**:

1. **Given** valid coordinates, **When** saved, **Then** the app uses them, labels them, and keeps them across reloads.
2. **Given** invalid coordinates, **When** saved, **Then** an error shows and the location is unchanged.
3. **Given** a manual location, **When** the user taps "Use my location", **Then** automatic detection replaces it.

---

### Edge Cases

- Empty fields: treated as invalid, with an inline message.
- Closing Settings without saving discards edits.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Users MUST be able to open and close Settings from the dashboard.
- **FR-002**: Settings MUST edit wake and sleep times, validated as wake earlier than sleep.
- **FR-003**: Saving times MUST update the schedule immediately and persist on the device.
- **FR-004**: Settings MUST allow entering latitude, longitude and an optional label, validated by coordinate ranges.
- **FR-005**: Settings MUST allow returning to automatic location detection.
- **FR-006**: Changing wake/sleep MUST NOT reuse an AI plan generated for different times.
- **FR-007**: All settings stay on the device; no network is used to resolve places.

### Key Entities

- **Profile**: wake time, sleep time, reminders preference (existing).
- **Location**: now may have source "manual" (existing entity).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can change wake time and see the new schedule in under 15 seconds.
- **SC-002**: Invalid input never reaches storage.
- **SC-003**: Settings are optional — the app is fully usable without opening them.

## Assumptions

- Place-name search is excluded (needs a network lookup).
- Reminders toggle stays on the dashboard header from the earlier feature.
