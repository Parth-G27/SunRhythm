import { getItem } from '../lib/storage'

const KEY = 'sunrhythm:profile'
const HHMM = /^([01]\d|2[0-3]):[0-5]\d$/

export const DEFAULT_PROFILE = { wakeTime: '07:00', sleepTime: '23:00' }

export function loadProfile() {
  const saved = getItem(KEY)
  if (saved && HHMM.test(saved.wakeTime) && HHMM.test(saved.sleepTime)) {
    return { wakeTime: saved.wakeTime, sleepTime: saved.sleepTime }
  }
  return DEFAULT_PROFILE
}
