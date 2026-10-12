# Research: Reminders

- **Decision**: Web Audio oscillator for a two-note soft chime; no asset files. **Alternative**: bundled mp3 — extra file, same result.
- **Decision**: Unlock audio on the first pointer interaction (browsers block autoplay); if still blocked, the banner and vibration carry the alert.
- **Decision**: Skip the Notification API and service workers: they add permission prompts and complexity, and background alerts would need a push server.
- **Decision**: Reminder fires for breaks open within the last 30 minutes (same window as Step Outside), so opening the app late still nudges once.
