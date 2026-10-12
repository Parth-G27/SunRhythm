import { getItem, setItem } from '../lib/storage'

const KEY = 'sunrhythm:profile'
const HHMM = /^([01]\d|2[0-3]):[0-5]\d$/

export const DEFAULT_PROFILE = { wakeTime: '07:00', sleepTime: '23:00', remindersOn: true }

export function loadProfile() {
  const saved = getItem(KEY)
  if (saved && HHMM.test(saved.wakeTime) && HHMM.test(saved.sleepTime)) {
    return {
      wakeTime: saved.wakeTime,
      sleepTime: saved.sleepTime,
      remindersOn: saved.remindersOn !== false,
    }
  }
  return { ...DEFAULT_PROFILE, remindersOn: saved?.remindersOn !== false }
}

export function saveProfile(patch) {
  const next = { ...loadProfile(), ...patch }
  setItem(KEY, next)
  return next
}

// Wake must be earlier than sleep (same day). Returns an error message or null.
export function validateTimes(wake, sleep) {
  if (!HHMM.test(wake) || !HHMM.test(sleep)) return 'Enter both times.'
  if (wake >= sleep) return 'Wake time must be earlier than sleep time.'
  return null
}
