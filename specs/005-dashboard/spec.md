# Feature Specification: Dashboard and Solar Card

**Feature Branch**: `claude/sunrhythm-design-principles-2231f1`
**Created**: 2026-10-12
**Status**: Draft
**Input**: User description: "A single minimal dashboard showing the sun's position through the day, today's break timeline, and a next-break widget."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See what's next at a glance (Priority: P1)

The user opens the app and immediately sees the next upcoming break, its title, its start time and how long until it starts.

**Why this priority**: The main reason to open the app mid-day.

**Independent Test**: With a known schedule and time, the widget names the first break that has not started yet and shows the correct countdown.

**Acceptance Scenarios**:

1. **Given** a break is still ahead today, **When** the dashboard is shown, **Then** the next break's title, time and "in Xh Ym" countdown appear.
2. **Given** time passes, **When** a minute elapses, **Then** the countdown updates without reloading.
3. **Given** all of today's breaks are over, **When** the dashboard is shown, **Then** it says today's breaks are done.

---

### User Story 2 - Sun position (Priority: P2)

A card shows a bar from sunrise through solar noon to sunset with a marker for where the sun is now, plus the three times.

**Why this priority**: Gives context for the schedule.

**Independent Test**: At solar noon the marker sits mid-bar; at night it shows an at-rest state with a note.

**Acceptance Scenarios**:

1. **Given** daytime, **When** the card is shown, **Then** the marker position reflects the share of daylight elapsed.
2. **Given** night, **When** the card is shown, **Then** the marker rests at the start or end and the card says it is night.
3. **Given** no sunrise/sunset today, **When** the card is shown, **Then** it shows a short explanatory message instead of a bar.

---

### User Story 3 - Day timeline (Priority: P3)

The three breaks are listed in order, with past breaks visibly dimmed and the source ("AI plan" / "Static schedule") shown.

**Why this priority**: Orientation; the other two stories already deliver the key value.

**Independent Test**: With the current time after the morning break, the morning entry appears dimmed and the others normal.

**Acceptance Scenarios**:

1. **Given** some breaks are in the past, **When** the timeline renders, **Then** those are dimmed.

---

### Edge Cases

- Location still loading: dashboard shows the default location's data with the banner indicating status.
- Device left open overnight: the next day's data refreshes on reload (live refresh across midnight is out of scope).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Dashboard MUST show a next-break widget with title, start time and live countdown (updating at least every minute).
- **FR-002**: Dashboard MUST show a sun-position card with sunrise, solar noon and sunset times and a current-position marker.
- **FR-003**: Dashboard MUST list all three breaks in order, dimming those already past.
- **FR-004**: Dashboard MUST show the location status banner and plan source label.
- **FR-005**: Dashboard MUST be a single-screen, mobile-friendly layout with no required input.
- **FR-006**: Dashboard MUST handle no-sunrise/sunset and all-breaks-done states gracefully.

### Key Entities

- Uses existing Location, SolarTimes and Break; no new stored data.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can tell what the next break is and when within 3 seconds of opening the app.
- **SC-002**: The whole dashboard fits one scroll-free phone screen portion above the timeline.
- **SC-003**: Countdown is never more than one minute out of date.

## Assumptions

- "Step Outside" mode and reminders are separate features; this dashboard only prepares for them.
- Editing settings and the coach chat are out of scope.
