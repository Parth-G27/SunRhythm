# Research: Daily Log

- **Decision**: Store only today's log; if the saved date differs, start empty. **Rationale**: matches "resetting each day"; history is out of scope.
- **Decision**: Recording is a pure function `recordBreak(log, id, minutes)`; the hook persists the result. **Rationale**: easy to test.
- **Decision**: Skip ids are passed into `getFocusBreak` and merged with reminder-notified ids at the call site (`getDueReminder` already accepts ids).
