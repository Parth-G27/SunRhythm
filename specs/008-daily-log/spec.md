# Feature Specification: Daily Log

**Feature Branch**: `feature/step-outside-reminders-log-settings`
**Created**: 2026-10-12
**Status**: Draft
**Input**: User description: "Record which breaks were completed and total outdoor minutes, resetting each day, all on the device."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Completed breaks are recorded automatically (Priority: P1)

When the user finishes a Step Outside session, that break is marked done and the minutes outside are added to today's total — no manual entry.

**Why this priority**: The payoff of the whole loop; proves the habit is working.

**Independent Test**: Complete a Step Outside session; today's card shows one more completed break and the added minutes.

**Acceptance Scenarios**:

1. **Given** a Step Outside session ends (full or early), **When** it completes, **Then** that break is marked completed and its minutes are added to the total.
2. **Given** a break is completed, **When** the dashboard refreshes, **Then** the next-break card and reminders move on to the next break.

---

### User Story 2 - See today's progress (Priority: P1)

A small card shows "X of 3 breaks" with a tick per break and the total minutes outside, and the timeline shows ticks on completed breaks.

**Why this priority**: Makes progress visible at a glance.

**Independent Test**: With two breaks completed for 25 minutes, the card reads "2 of 3 breaks · 25 min".

**Acceptance Scenarios**:

1. **Given** some breaks are completed, **When** the dashboard shows, **Then** the card shows counts and total minutes and the timeline marks them.
2. **Given** a new day starts, **When** the app loads, **Then** the log starts empty.

---

### Edge Cases

- Corrupt saved log: ignored, starts empty.
- Same break done twice: stays completed; minutes add up.
- Early exit with 0 minutes: break is still marked completed only if at least 1 minute was spent.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST record completion and minutes when a Step Outside session ends, with no user entry.
- **FR-002**: System MUST keep one log per calendar day and reset it when the date changes.
- **FR-003**: System MUST persist the log on the device only.
- **FR-004**: System MUST show completed count, per-break ticks and total minutes.
- **FR-005**: Completed breaks MUST NOT be offered as the next break or trigger reminders.
- **FR-006**: A session of less than 1 minute MUST NOT count as completed.

### Key Entities

- **DailyLog**: date, completed break ids, total outdoor minutes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Finishing a session updates the dashboard without any typing or extra tap.
- **SC-002**: The log survives reload and is empty the next calendar day.
- **SC-003**: Completed breaks never show up as "next" again.

## Assumptions

- All three breaks count (morning, midday, evening), not only the first two.
- History and streaks are out of scope.
