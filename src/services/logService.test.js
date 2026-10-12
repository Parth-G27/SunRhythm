import { beforeEach, describe, expect, it } from 'vitest'
import { loadLog, recordBreak, saveLog, todayKey } from './logService'

beforeEach(() => {
  const data = {}
  globalThis.localStorage = {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => { data[k] = v },
  }
})

describe('logService', () => {
  const now = new Date('2026-10-12T10:00:00')
  it('starts empty and records completion plus minutes', () => {
    let log = loadLog(now)
    expect(log).toEqual({ date: todayKey(now), completed: {}, totalOutdoorMinutes: 0 })
    log = recordBreak(log, 'morning', 10)
    log = recordBreak(log, 'midday', 5)
    expect(log.completed).toEqual({ morning: true, midday: true })
    expect(log.totalOutdoorMinutes).toBe(15)
  })
  it('ignores sessions under one minute', () => {
    const log = loadLog(now)
    expect(recordBreak(log, 'morning', 0)).toBe(log)
  })
  it('persists within a day and resets on a new day', () => {
    saveLog(recordBreak(loadLog(now), 'morning', 10))
    expect(loadLog(now).totalOutdoorMinutes).toBe(10)
    expect(loadLog(new Date('2026-10-13T10:00:00')).totalOutdoorMinutes).toBe(0)
  })
  it('discards corrupt data', () => {
    localStorage.setItem('sunrhythm:log', JSON.stringify({ date: todayKey(now), completed: 5 }))
    expect(loadLog(now).totalOutdoorMinutes).toBe(0)
  })
})
