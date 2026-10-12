import { beforeEach, describe, expect, it } from 'vitest'
import { DEFAULT_LOCATION, isValidLocation, loadSavedLocation, saveLocation } from './locationService'

beforeEach(() => {
  const data = {}
  globalThis.localStorage = {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => { data[k] = v },
  }
})

describe('isValidLocation', () => {
  it('accepts in-range coordinates', () => {
    expect(isValidLocation({ lat: 10, lon: 20 })).toBe(true)
  })
  it('rejects out-of-range or non-numeric coordinates', () => {
    expect(isValidLocation({ lat: 91, lon: 0 })).toBe(false)
    expect(isValidLocation({ lat: 0, lon: -181 })).toBe(false)
    expect(isValidLocation({ lat: '1', lon: 0 })).toBe(false)
    expect(isValidLocation(null)).toBe(false)
  })
  it('default location is valid', () => {
    expect(isValidLocation(DEFAULT_LOCATION)).toBe(true)
  })
})

describe('saved location', () => {
  it('returns null when nothing is saved or data is invalid', () => {
    expect(loadSavedLocation()).toBeNull()
    saveLocation({ lat: 500, lon: 0 })
    expect(loadSavedLocation()).toBeNull()
  })
  it('round-trips a valid location', () => {
    const loc = { lat: 1, lon: 2, source: 'detected' }
    saveLocation(loc)
    expect(loadSavedLocation()).toEqual(loc)
  })
})
