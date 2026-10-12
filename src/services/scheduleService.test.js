import { beforeEach, describe, expect, it } from 'vitest'
import { buildFallbackSchedule, formatClock, formatCountdown, getFocusBreak } from './scheduleService'
import { DEFAULT_PROFILE, loadProfile } from './profileService'
import { getSolarTimes } from './solarService'

const day = new Date('2026-10-12T06:00:00Z')
const solar = getSolarTimes(28.6139, 77.209, day)

describe('buildFallbackSchedule', () => {
  it('returns three breaks in chronological order', () => {
    const s = buildFallbackSchedule(solar, DEFAULT_PROFILE, day)
    expect(s.map((b) => b.id)).toEqual(['morning', 'midday', 'evening'])
    const t = s.map((b) => +new Date(b.start))
    expect(t[0] < t[1] && t[1] < t[2]).toBe(true)
    s.forEach((b) => expect(b.title && b.instruction && b.durationMin > 0).toBeTruthy())
  })
  it('never starts the morning break before sunrise', () => {
    const early = { wakeTime: '03:00', sleepTime: '20:00' }
    const s = buildFallbackSchedule(solar, early, day)
    expect(+new Date(s[0].start)).toBeGreaterThanOrEqual(+solar.sunrise)
  })
  it('anchors midday after noon and evening before sunset', () => {
    const s = buildFallbackSchedule(solar, DEFAULT_PROFILE, day)
    expect(+new Date(s[1].start)).toBe(+solar.solarNoon + 90 * 60000)
    expect(+new Date(s[2].start)).toBe(+solar.sunset - 30 * 60000)
  })
  it('uses fixed times on polar days', () => {
    const polar = getSolarTimes(80, 0, new Date('2026-06-21T12:00:00Z'))
    const s = buildFallbackSchedule(polar, DEFAULT_PROFILE, new Date('2026-06-21T12:00:00Z'))
    expect(s).toHaveLength(3)
    expect(new Date(s[0].start).getHours()).toBe(8)
  })
})

describe('loadProfile', () => {
  beforeEach(() => {
    const data = {}
    globalThis.localStorage = {
      getItem: (k) => (k in data ? data[k] : null),
      setItem: (k, v) => { data[k] = v },
    }
  })
  it('falls back to defaults when nothing or garbage is saved', () => {
    expect(loadProfile()).toEqual(DEFAULT_PROFILE)
    localStorage.setItem('sunrhythm:profile', JSON.stringify({ wakeTime: '99:99', sleepTime: 'x' }))
    expect(loadProfile()).toEqual(DEFAULT_PROFILE)
  })
  it('uses a valid saved profile', () => {
    localStorage.setItem('sunrhythm:profile', JSON.stringify({ wakeTime: '06:00', sleepTime: '22:00' }))
    expect(loadProfile()).toEqual({ wakeTime: '06:00', sleepTime: '22:00', remindersOn: true })
  })
})

describe('getFocusBreak / countdown helpers', () => {
  const s = buildFallbackSchedule(solar, DEFAULT_PROFILE, day)
  const start = (i) => +new Date(s[i].start)
  it('returns the next break before it starts', () => {
    const f = getFocusBreak(s, new Date(start(0) - 1000))
    expect(f.item.id).toBe('morning')
    expect(f.active).toBe(false)
  })
  it('keeps a break active for 30 minutes after its start', () => {
    const f = getFocusBreak(s, new Date(start(0) + 29 * 60000))
    expect(f.item.id).toBe('morning')
    expect(f.active).toBe(true)
  })
  it('moves on after the open window and returns null when all are over', () => {
    expect(getFocusBreak(s, new Date(start(0) + 31 * 60000)).item.id).toBe('midday')
    expect(getFocusBreak(s, new Date(start(2) + 31 * 60000))).toBeNull()
  })
  it('skips completed breaks', () => {
    expect(getFocusBreak(s, new Date(start(0) + 60000), ['morning']).item.id).toBe('midday')
  })
  it('formats countdowns and clocks', () => {
    expect(formatCountdown(30000)).toBe('now')
    expect(formatCountdown(5 * 60000)).toBe('5m')
    expect(formatCountdown(125 * 60000)).toBe('2h 5m')
    expect(formatClock(10 * 60000)).toBe('10:00')
    expect(formatClock(61000)).toBe('01:01')
    expect(formatClock(-5)).toBe('00:00')
  })
})
