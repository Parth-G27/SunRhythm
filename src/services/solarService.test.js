import { describe, expect, it } from 'vitest'
import { formatTime, getSolarTimes, getSunProgress } from './solarService'

const DELHI = [28.6139, 77.209]
const day = new Date('2026-10-12T06:00:00Z')

describe('getSolarTimes', () => {
  it('orders dawn < sunrise < noon < sunset < dusk', () => {
    const s = getSolarTimes(...DELHI, day)
    expect(s.polar).toBe(false)
    expect(s.dawn < s.sunrise).toBe(true)
    expect(s.sunrise < s.solarNoon).toBe(true)
    expect(s.solarNoon < s.sunset).toBe(true)
    expect(s.sunset < s.dusk).toBe(true)
  })
  it('gives about 11–12 hours of daylight in Delhi in October', () => {
    const s = getSolarTimes(...DELHI, day)
    const hours = (s.sunset - s.sunrise) / 3600000
    expect(hours).toBeGreaterThan(11)
    expect(hours).toBeLessThan(12.5)
  })
  it('flags polar day without throwing', () => {
    const s = getSolarTimes(80, 0, new Date('2026-06-21T12:00:00Z'))
    expect(s.polar).toBe(true)
  })
})

describe('getSunProgress', () => {
  const s = getSolarTimes(...DELHI, day)
  it('is 0 before sunrise and 1 after sunset, flagged as night', () => {
    expect(getSunProgress(s, new Date(s.sunrise - 1000))).toEqual({ progress: 0, isNight: true })
    expect(getSunProgress(s, new Date(+s.sunset + 1000))).toEqual({ progress: 1, isNight: true })
  })
  it('is 0.5 at the midpoint of daylight', () => {
    const mid = new Date((+s.sunrise + +s.sunset) / 2)
    const p = getSunProgress(s, mid)
    expect(p.progress).toBeCloseTo(0.5, 5)
    expect(p.isNight).toBe(false)
  })
})

describe('formatTime', () => {
  it('returns a dash for invalid dates', () => {
    expect(formatTime(new Date('nope'))).toBe('—')
  })
})
