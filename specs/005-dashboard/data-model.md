# Data Model: Dashboard and Solar Card

No new stored data. Derived values:

- **NextBreak**: first Break whose `start` is after `now`, or `null` when all are past.
- **Countdown**: milliseconds until start, shown as `Xh Ym` / `Ym` / `now` when under a minute.
