# Feature Specification: Reminders

**Feature Branch**: `feature/step-outside-reminders-log-settings`
**Created**: 2026-10-12
**Status**: Draft
**Input**: User description: "Gentle in-browser audio and vibration alerts when a window opens, prompting the user to step outside."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Nudge when a break opens (Priority: P1)

While the app is open, when a break's start time arrives the user hears a soft chime, feels a short vibration (on devices that support it), and sees a banner: "Time to step outside — [title]" with Start and Dismiss.

**Why this priority**: Without a nudge, users forget the schedule.

**Independent Test**: With a break whose start time has just passed, the banner appears once and the chime/vibration fire once.

**Acceptance Scenarios**:

1. **Given** the app is open, **When** a break opens, **Then** a chime plays, the device vibrates if supported, and a banner appears.
2. **Given** the banner is shown, **When** the user taps Start, **Then** Step Outside mode begins for that break and the banner closes.
3. **Given** the banner is shown, **When** the user taps Dismiss, **Then** the banner closes and does not return for that break.

---

### User Story 2 - Once only, and mutable (Priority: P2)

Each break reminds at most once per day, even across reloads, and the user can turn reminders off with one tap.

**Why this priority**: Prevents nagging.

**Independent Test**: Reload during an open break after being reminded: no second alert. Toggle off: no alerts.

**Acceptance Scenarios**:

1. **Given** a break was already reminded today, **When** the page reloads, **Then** no new alert occurs for it.
2. **Given** reminders are off, **When** a break opens, **Then** nothing plays or appears.
3. **Given** the user toggles reminders, **When** they reload, **Then** the choice is remembered.

---

### Edge Cases

- Browser blocks audio before any interaction: the banner and vibration still occur; the chime is skipped silently.
- App opened long after a break's start: only breaks open within the last 30 minutes can alert.
- Device without vibration support: ignored.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST alert (chime, vibration, banner) when a break opens while the app is open.
- **FR-002**: Chime MUST be generated locally with no audio files or network.
- **FR-003**: Each break MUST alert at most once per day, remembered on the device.
- **FR-004**: Users MUST be able to turn reminders on/off with one tap; the choice persists.
- **FR-005**: Banner MUST offer Start (opens Step Outside) and Dismiss.
- **FR-006**: Failures of audio or vibration MUST NOT break the app.

### Key Entities

- **ReminderLog**: date plus ids of breaks already reminded.
- **Preference**: reminders on/off (part of the profile).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An alert appears within 30 seconds of a break's start time.
- **SC-002**: No break ever alerts more than once per day.
- **SC-003**: Turning reminders off silences all alerts immediately.

## Assumptions

- Alerts only work while the app is open in a tab (no background push, which would need a server).
- Reminders default to on.
