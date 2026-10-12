import { afterEach, describe, expect, it, vi } from 'vitest'
import { buildPrompt, chooseModel, generateSchedule, parsePlan } from './ollamaService'
import { getSolarTimes } from './solarService'

const profile = { wakeTime: '07:00', sleepTime: '23:00' }
const day = new Date('2026-10-12T06:00:00Z')
const solar = getSolarTimes(28.6139, 77.209, day)
const good = {
  breaks: [
    { time: '07:30', title: 'Sun up', instruction: 'Walk outside.' },
    { time: '13:30', title: 'Reset', instruction: 'Take a break.' },
    { time: '18:00', title: 'Wind down', instruction: 'Watch the sunset.' },
  ],
}

afterEach(() => vi.unstubAllGlobals())

// Fake Ollama: /api/tags lists models, /api/generate returns `generate`.
const fakeOllama = (generate, models = ['gemma3:1b']) =>
  vi.fn(async (url) =>
    url.endsWith('/api/tags')
      ? { ok: true, json: async () => ({ models: models.map((name) => ({ name })) }) }
      : generate,
  )

describe('buildPrompt', () => {
  it('contains times but no coordinates', () => {
    const p = buildPrompt(solar, profile)
    expect(p).toContain('07:00')
    expect(p).not.toContain('28.6')
    expect(p).not.toContain('77.2')
  })
})

describe('chooseModel', () => {
  it('prefers a known model, else the first non-embedding one, else null', () => {
    expect(chooseModel(['llama3', 'gemma3:4b', 'gemma3:1b'])).toBe('gemma3:4b')
    expect(chooseModel(['nomic-embed-text', 'llama3'])).toBe('llama3')
    expect(chooseModel(['nomic-embed-text'])).toBeNull()
    expect(chooseModel([])).toBeNull()
  })
})

describe('parsePlan', () => {
  it('tolerates the messy output real small models give (ranges, nested array)', () => {
    const messy = '{"breaks": [{"time":"07:00-07:30","title":"A","instruction":"a."}, {"time":"17:00-17:30","title":"B","instruction":"b."}, [{"time":"20:00-21:00","title":"C","instruction":"c."}]]}'
    const out = parsePlan(messy, profile, day)
    expect(out.map((b) => b.title)).toEqual(['A', 'B', 'C'])
    expect(new Date(out[0].start).getHours()).toBe(7)
  })
  it('accepts a valid reply (object or bare array)', () => {
    expect(parsePlan(JSON.stringify(good), profile, day)).toHaveLength(3)
    expect(parsePlan(JSON.stringify(good.breaks), profile, day)[0].id).toBe('morning')
  })
  it('rejects bad JSON, wrong count, bad or out-of-hours times, empty text', () => {
    expect(() => parsePlan('not json', profile)).toThrow()
    expect(() => parsePlan(JSON.stringify({ breaks: good.breaks.slice(0, 2) }), profile)).toThrow()
    const bad = (patch) => JSON.stringify({ breaks: [{ ...good.breaks[0], ...patch }, ...good.breaks.slice(1)] })
    expect(() => parsePlan(bad({ time: '25:00' }), profile)).toThrow()
    expect(() => parsePlan(bad({ time: '03:00' }), profile)).toThrow()
    expect(() => parsePlan(bad({ title: '' }), profile)).toThrow()
  })
})

describe('generateSchedule', () => {
  it('returns breaks from a successful local call and only hits localhost', async () => {
    const fetchMock = fakeOllama({ ok: true, json: async () => ({ response: JSON.stringify(good) }) })
    vi.stubGlobal('fetch', fetchMock)
    const out = await generateSchedule(solar, profile, { date: day })
    expect(out).toHaveLength(3)
    const urls = fetchMock.mock.calls.map((c) => c[0])
    expect(urls.every((u) => u.startsWith('http://localhost:11434/'))).toBe(true)
    expect(JSON.parse(fetchMock.mock.calls[1][1].body).model).toBe('gemma3:1b')
  })
  it('throws when Ollama is unreachable or replies badly', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('down')))
    await expect(generateSchedule(solar, profile)).rejects.toThrow()
    vi.stubGlobal('fetch', fakeOllama({ ok: true, json: async () => ({ response: '{}' }) }))
    await expect(generateSchedule(solar, profile)).rejects.toThrow()
    vi.stubGlobal('fetch', fakeOllama({ ok: false, status: 500 }))
    await expect(generateSchedule(solar, profile)).rejects.toThrow()
    vi.stubGlobal('fetch', fakeOllama({ ok: true, json: async () => ({ response: '{}' }) }, []))
    await expect(generateSchedule(solar, profile)).rejects.toThrow()
  })
  it('aborts after the timeout', async () => {
    vi.useFakeTimers()
    vi.stubGlobal('fetch', vi.fn((_, { signal }) => new Promise((_, reject) => {
      signal.addEventListener('abort', () => reject(new Error('aborted')))
    })))
    const p = expect(generateSchedule(solar, profile)).rejects.toThrow('aborted')
    await vi.advanceTimersByTimeAsync(20001)
    await p
    vi.useRealTimers()
  })
})
