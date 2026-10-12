# SunRhythm

Local-first circadian helper: schedules short daylight breaks from today's sun times.
Everything runs in your browser; the only network call is to a local Ollama instance.

## Run

```bash
npm install
npm run dev
npm test
```

## Optional: local AI plan

```bash
ollama pull gemma3:4b
OLLAMA_ORIGINS="http://localhost:5173" ollama serve
```

Without Ollama the app shows a static schedule. Location, profile and the day's plan are kept
in `localStorage` only; nothing is sent anywhere except `http://localhost:11434`.
