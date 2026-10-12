# Quickstart: Ollama Routine Generator

```bash
ollama pull gemma3:4b
OLLAMA_ORIGINS="http://localhost:5173" ollama serve
npm run dev
npm test
```

1. Ollama running → static schedule, then "AI plan" label.
2. Reload same day → "AI plan" immediately (cache), no request in the Network tab.
3. Stop Ollama, clear `sunrhythm:plan` → "Static schedule" label, no errors.
4. Network tab shows only `localhost:11434` calls besides app assets.
