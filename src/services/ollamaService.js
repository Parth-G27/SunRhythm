import { formatTime } from './solarService'

// Principle I: the ONLY network target in the whole app.
const OLLAMA_URL = 'http://localhost:11434/api/generate'
const TAGS_URL = 'http://localhost:11434/api/tags'
const PREFERRED_MODELS = ['gemma3:4b', 'gemma3:1b', 'phi3']
const TIMEOUT_MS = 20000
// Accepts "07:30" and, since small models like ranges, "07:30-08:00" (start time is used).
const HHMM = /^([01]?\d|2[0-3]):([0-5]\d)(?:\s*[-–]\s*\S+)?$/

const IDS = ['morning', 'midday', 'evening']
const DURATIONS = [10, 5, 10]

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

// Sends times only — never coordinates or place names (Principle I).
export function buildPrompt(solar, profile) {
  const sun = solar.polar
    ? 'There is no normal sunrise or sunset today.'
    : `Sunrise today: ${formatTime(solar.sunrise)}. Sunset today: ${formatTime(solar.sunset)}.`
  return `You are a circadian health coach. The user wakes at ${profile.wakeTime} and sleeps at ${profile.sleepTime}. ${sun}
Plan exactly 3 short outdoor daylight breaks: a morning light anchor, an afternoon reset, and an evening wind-down.
Reply with JSON only, in this shape: {"breaks":[{"time":"HH:MM","title":"...","instruction":"..."}]}
Use 24-hour times between wake and sleep. Keep each instruction to one sentence.`
}

// Returns three Breaks, or throws if the reply is unusable.
export function parsePlan(responseText, profile, date = new Date()) {
  const data = JSON.parse(responseText)
  const raw = Array.isArray(data) ? data : data?.breaks
  // Small models sometimes nest arrays; flatten them.
  const items = Array.isArray(raw) ? raw.flat(Infinity) : null
  if (!items || items.length !== 3) throw new Error('expected 3 breaks')

  const wake = toMinutes(profile.wakeTime)
  const sleep = toMinutes(profile.sleepTime)
  const parsed = items.map((item) => {
    const match = HHMM.exec(String(item?.time ?? '').trim())
    const title = typeof item?.title === 'string' ? item.title.trim() : ''
    const instruction = typeof item?.instruction === 'string' ? item.instruction.trim() : ''
    if (!match || !title || !instruction) throw new Error('invalid break')
    const minutes = Number(match[1]) * 60 + Number(match[2])
    if (minutes < wake || minutes > sleep) throw new Error('outside waking hours')
    return { minutes, title: title.slice(0, 80), instruction: instruction.slice(0, 200) }
  })

  parsed.sort((a, b) => a.minutes - b.minutes)
  return parsed.map((p, i) => {
    const start = new Date(date)
    start.setHours(Math.floor(p.minutes / 60), p.minutes % 60, 0, 0)
    return {
      id: IDS[i],
      start: start.toISOString(),
      durationMin: DURATIONS[i],
      title: p.title,
      instruction: p.instruction,
    }
  })
}

// Picks an installed model: a preferred one if present, else the first non-embedding model.
export function chooseModel(installed) {
  const names = installed.filter((n) => typeof n === 'string' && !/embed/i.test(n))
  return PREFERRED_MODELS.find((m) => names.includes(m)) ?? names[0] ?? null
}

async function pickModel(signal) {
  const res = await fetch(TAGS_URL, { signal })
  if (!res.ok) throw new Error(`ollama ${res.status}`)
  const data = await res.json()
  const model = chooseModel((data.models ?? []).map((m) => m.name))
  if (!model) throw new Error('no models installed')
  return model
}

// Throws on any failure; callers keep the static schedule (Principle III).
export async function generateSchedule(solar, profile, { signal, date = new Date() } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  signal?.addEventListener('abort', () => controller.abort())
  try {
    const model = await pickModel(controller.signal)
    // Small local models are flaky; one retry (within the same time limit) helps a lot.
    let lastError
    for (let attempt = 0; attempt < 2 && !controller.signal.aborted; attempt++) {
      try {
        const res = await fetch(OLLAMA_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model,
            prompt: buildPrompt(solar, profile),
            stream: false,
            format: 'json',
          }),
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`ollama ${res.status}`)
        const data = await res.json()
        return parsePlan(data.response, profile, date)
      } catch (err) {
        lastError = err
      }
    }
    throw lastError ?? new Error('aborted')
  } finally {
    clearTimeout(timer)
  }
}
