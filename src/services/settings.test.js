import { describe, expect, it } from 'vitest'
import { parseCoords } from './locationService'
import { validateTimes } from './profileService'

describe('validateTimes', () => {
  it('accepts wake before sleep', () => {
    expect(validateTimes('07:00', '23:00')).toBeNull()
  })
  it('rejects equal, reversed or missing times', () => {
    expect(validateTimes('23:00', '07:00')).toMatch(/earlier/)
    expect(validateTimes('07:00', '07:00')).toMatch(/earlier/)
    expect(validateTimes('', '23:00')).toMatch(/both/)
  })
})

describe('parseCoords', () => {
  it('parses valid coordinates with an optional label', () => {
    expect(parseCoords('51.5074', '-0.1278', ' London ')).toEqual({
      lat: 51.5074, lon: -0.1278, source: 'manual', label: 'London',
    })
    expect(parseCoords('1', '2')).toEqual({ lat: 1, lon: 2, source: 'manual' })
  })
  it('rejects empty, non-numeric and out-of-range input', () => {
    expect(parseCoords('', '2')).toBeNull()
    expect(parseCoords('abc', '2')).toBeNull()
    expect(parseCoords('91', '0')).toBeNull()
    expect(parseCoords('0', '181')).toBeNull()
  })
})
