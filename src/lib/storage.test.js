import { beforeEach, describe, expect, it } from 'vitest'
import { getItem, setItem } from './storage'

beforeEach(() => {
  const data = {}
  globalThis.localStorage = {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => { data[k] = v },
  }
})

describe('storage', () => {
  it('round-trips JSON', () => {
    setItem('k', { a: 1 })
    expect(getItem('k')).toEqual({ a: 1 })
  })
  it('returns null for missing or corrupt values', () => {
    expect(getItem('missing')).toBeNull()
    localStorage.setItem('bad', '{oops')
    expect(getItem('bad')).toBeNull()
  })
})
