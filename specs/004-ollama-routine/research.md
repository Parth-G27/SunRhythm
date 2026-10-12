# Research: Ollama Routine Generator

- **Decision**: Ask for `{ "breaks": [...] }` (Ollama's `format: 'json'` returns an object); the parser also accepts a bare array.
  **Rationale**: Small models obey one fixed shape better.
- **Decision**: Model name constant `gemma3:4b` (the PRD's `gemma:3b` is not a published Ollama tag). **Alternative**: `phi3`.
- **Decision**: Browser calls Ollama directly; this needs `OLLAMA_ORIGINS` set to the app origin. Failure is handled as fallback.
- **Decision**: Cache only AI plans, keyed by local date + lat/lon rounded to 2 decimals; fallback is never cached so AI is retried next load.
- **Decision**: Assign ids and durations by position (morning/midday/evening) after sorting by time.
