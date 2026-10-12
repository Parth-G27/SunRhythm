# SunRhythm

Local-first circadian helper: schedules short daylight breaks from today's sun times.
Everything runs in your browser; the only network call is to a local Ollama instance.

## Features

Location detection, local sun times, a three-break daylight schedule (optionally written by a local
Ollama model), a dashboard, a full-screen Step Outside timer, in-app reminders (chime, vibration,
banner), a daily log, and Settings (wake/sleep times, manual location).

## Run

```bash
npm install
npm run dev
npm test
```

## Optional: local AI plan

Start Ollama with any small chat model installed (the app uses `gemma3:4b`, `gemma3:1b` or `phi3`
if present, otherwise the first installed model):

```bash
ollama pull gemma3:1b
ollama serve
```

If the browser is blocked by CORS, start Ollama with `OLLAMA_ORIGINS="http://localhost:5173"`.

Without Ollama the app shows a static schedule. Location, profile and the day's plan are kept
in `localStorage` only; nothing is sent anywhere except `http://localhost:11434`.
