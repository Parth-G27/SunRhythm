# Feature Specification: Fallback Schedule

**Feature Branch**: `claude/sunrhythm-design-principles-2231f1`
**Created**: 2026-10-12
**Status**: Draft
**Input**: User description: "A static daily schedule of three daylight micro-breaks derived from today's sun times, so the app is useful without any AI."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Three daylight breaks for today (Priority: P1)

The user sees three short outdoor breaks for today: a morning light anchor, a midday break, and a sunset wind-down. Each has a time, a title, a length and a one-sentence instruction.

**Why this priority**: This is the core value of the product and the safety net when AI is unavailable.

**Independent Test**: With a known location and date, the schedule has exactly three breaks in chronological order, each inside daylight hours.

**Acceptance Scenarios**:

1. **Given** today's sun times and default wake/sleep times, **When** the schedule is built, **Then** it contains morning, midday and evening breaks in that order.
2. **Given** a different wake time, **When** the schedule is rebuilt, **Then** the morning break moves to about 30 minutes after waking (but never before sunrise).

---

### User Story 2 - Sensible defaults with no setup (Priority: P2)

The schedule works on first launch with default wake (07:00) and sleep (23:00) times, with nothing for the user to fill in.

**Why this priority**: Honors the no-manual-entry goal.

**Independent Test**: With no saved profile, the schedule is still produced using defaults.

**Acceptance Scenarios**:

1. **Given** no saved profile, **When** the app loads, **Then** defaults are used.
2. **Given** a saved but invalid profile, **When** the app loads, **Then** defaults are used.

---

### Edge Cases

- Polar day/night (no sunrise or sunset): fixed times of 08:00, 13:30 and 18:00 are used.
- A break whose time has already passed today is still listed (marked as past by the dashboard later).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST produce exactly three breaks: morning anchor, midday break, sunset wind-down.
- **FR-002**: Morning break MUST start 30 minutes after wake time, not earlier than sunrise; midday MUST start 90 minutes after solar noon; evening MUST start 30 minutes before sunset.
- **FR-003**: Each break MUST include start time, duration, title and a short instruction.
- **FR-004**: System MUST use default wake/sleep times when none are saved or saved values are invalid.
- **FR-005**: System MUST build the schedule without any network access.
- **FR-006**: System MUST handle days without sunrise/sunset using fixed times.

### Key Entities

- **Profile**: wake time and sleep time (HH:MM).
- **Break**: id, start time, duration in minutes, title, instruction.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The schedule appears instantly on first launch with zero user input.
- **SC-002**: 100% of generated schedules have three breaks in chronological order.
- **SC-003**: Every break reads clearly in one sentence of instruction.

## Assumptions

- Break lengths: 10 min (morning), 5 min (midday), 10 min (evening).
- Editing wake/sleep times is a later feature; defaults are stored in the local profile only.
