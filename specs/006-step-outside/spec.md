# Feature Specification: Step Outside Mode

**Feature Branch**: `feature/step-outside-reminders-log-settings`
**Created**: 2026-10-12
**Status**: Draft
**Input**: User description: "A full-screen countdown clock that simplifies the UI for the break itself."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Run a break with one big clock (Priority: P1)

From the next-break card the user taps "Step outside". The screen switches to a single large countdown for the break length, with the break's instruction and one "I'm back" button. Nothing else competes for attention.

**Why this priority**: This is the visual-to-physical switch that gets the user away from the screen.

**Independent Test**: Tap "Step outside"; a full-screen countdown of the break length appears and counts down to zero.

**Acceptance Scenarios**:

1. **Given** a break is upcoming or open, **When** the user taps "Step outside", **Then** a full-screen countdown of that break's length starts.
2. **Given** the countdown reaches zero, **When** it ends, **Then** a "Nice work" screen shows the minutes of daylight achieved with a Close button.
3. **Given** the countdown is running, **When** the user taps "I'm back", **Then** it ends early and shows the minutes actually spent outside.

---

### User Story 2 - Right break at the right time (Priority: P2)

The card targets the break that is open now (from its start until 30 minutes after) or, if none, the next one, and says "Time to step outside" when it is open.

**Why this priority**: Makes the button useful at the moment the break matters.

**Independent Test**: At a time inside a break's open period, the card shows that break as "now"; before it, a countdown.

**Acceptance Scenarios**:

1. **Given** the time is within 30 minutes after a break's start, **When** the card renders, **Then** it shows that break with "Time to step outside".
2. **Given** no break is open, **When** the card renders, **Then** it shows the next one with a countdown.

---

### Edge Cases

- Browser tab throttled in the background: the clock is based on real elapsed time, so it stays correct.
- Starting a break early (before its time) is allowed.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Users MUST be able to start a break from the next-break card with one tap.
- **FR-002**: Step Outside screen MUST be full-screen, show only the clock (mm:ss), break title/instruction and one exit button.
- **FR-003**: Countdown MUST be based on real elapsed time, not on counting ticks.
- **FR-004**: System MUST report minutes outside (full length if it ran out, rounded elapsed if ended early) to its caller.
- **FR-005**: System MUST show a completion screen at the end.
- **FR-006**: A break is "open" from its start until 30 minutes after.

### Key Entities

- Uses the existing Break; no new stored data.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: From the dashboard, a break starts in one tap.
- **SC-002**: The clock is readable from arm's length (very large type).
- **SC-003**: Clock error stays under 1 second over a full break even if the tab is throttled.

## Assumptions

- Saving the result and reminders come in later features; this feature only exposes minutes outside to its caller.
