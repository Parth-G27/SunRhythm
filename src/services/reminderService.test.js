import { describe, expect, it } from 'vitest'
import { getDueReminder } from './reminderService'

const mk = (id, iso) => ({ id, start: iso, durationMin: 5, title: id, instruction: '' })
const windows = [
  mk('morning', '2026-10-12T02:00:00Z'),
  mk('midday', '2026-10-12T08:00:00Z'),
  mk('evening', '2026-10-12T12:00:00Z'),
]

describe('getDueReminder', () => {
  it('returns null before any break opens', () => {
    expect(getDueReminder(windows, new Date('2026-10-12T01:59:00Z'))).toBeNull()
  })
  it('returns the open break', () => {
    expect(getDueReminder(windows, new Date('2026-10-12T02:10:00Z')).id).toBe('morning')
  })
  it('skips already-notified breaks', () => {
    expect(getDueReminder(windows, new Date('2026-10-12T02:10:00Z'), ['morning'])).toBeNull()
  })
  it('does not alert once the 30 minute window is over', () => {
    expect(getDueReminder(windows, new Date('2026-10-12T02:31:00Z'))).toBeNull()
  })
})
