# Feature Specification: Ollama Routine Generator

**Feature Branch**: `claude/sunrhythm-design-principles-2231f1`
**Created**: 2026-10-12
**Status**: Draft
**Input**: User description: "Use a local AI model to personalise today's three daylight breaks, and fall back to the static schedule on any failure."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Personalised plan from the local AI (Priority: P1)

When a local AI model is running on the user's machine, the app asks it for today's three breaks using the user's wake/sleep times and today's sun times, and shows the result labelled as an AI plan.

**Why this priority**: The differentiating feature of the product.

**Independent Test**: With the local AI running, the three breaks shown differ from the static text and the label says "AI plan".

**Acceptance Scenarios**:

1. **Given** the local AI is running, **When** the app loads, **Then** the static schedule shows immediately and is replaced by the AI plan when it arrives.
2. **Given** an AI plan was generated earlier today for this location, **When** the app reloads, **Then** it reuses that plan without calling the AI again.

---

### User Story 2 - Always works when the AI is not available (Priority: P1)

If the local AI is not running, is too slow, or answers with unusable output, the user still sees a complete schedule and no error screen.

**Why this priority**: Required by the project's graceful-degradation principle.

**Independent Test**: Stop the local AI; the static schedule stays on screen, labelled "Static schedule".

**Acceptance Scenarios**:

1. **Given** the local AI is unreachable, **When** the app loads, **Then** the static schedule is shown with no error blocking the screen.
2. **Given** the AI replies with malformed or incomplete data, **When** the app validates it, **Then** the static schedule is kept.
3. **Given** the AI takes longer than the time limit, **When** the limit passes, **Then** the request is abandoned and the static schedule is kept.

---

### Edge Cases

- AI returns times outside the user's waking hours: plan rejected.
- AI returns fewer or more than three breaks: plan rejected.
- Page closed or reloaded mid-request: request is cancelled.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST request a plan only from the AI service on the user's own machine, and MUST NOT contact any other host.
- **FR-002**: Request MUST include only wake/sleep times and today's sun times — no coordinates or place names.
- **FR-003**: System MUST validate the reply: exactly three breaks, valid times within waking hours, non-empty title and instruction.
- **FR-004**: System MUST show the static schedule first and upgrade to the AI plan only after successful validation.
- **FR-005**: System MUST fall back to the static schedule on unreachable service, timeout, or invalid reply.
- **FR-006**: System MUST label the plan source ("AI plan" or "Static schedule") and show a generating indicator while waiting.
- **FR-007**: System MUST cache a valid AI plan for the day and location on the device and reuse it.
- **FR-008**: System MUST time out the request after 20 seconds.

### Key Entities

- **Plan**: three Breaks plus a source (ai or fallback).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The user always sees a full schedule within one screen load, whether or not the AI is running.
- **SC-002**: With the AI stopped, there are zero blocking errors.
- **SC-003**: Reloading the same day reuses the cached plan with no new AI request.
- **SC-004**: Network inspection shows requests only to the local AI address.

## Assumptions

- The user has a local Ollama instance and a small model pulled; the model name is a single constant.
- Ollama must allow the app's origin (README documents `OLLAMA_ORIGINS`).
- Weather is not sent (needs external service).
