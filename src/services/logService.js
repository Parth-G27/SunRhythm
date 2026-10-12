import { getItem, setItem } from '../lib/storage'

const KEY = 'sunrhythm:log'

export const todayKey = (d = new Date()) => d.toLocaleDateString('en-CA')

const empty = (date) => ({ date, completed: {}, totalOutdoorMinutes: 0 })

// Today's log; anything saved for another day (or corrupt) is discarded.
export function loadLog(now = new Date()) {
  const saved = getItem(KEY)
  const ok =
    saved &&
    saved.date === todayKey(now) &&
    saved.completed &&
    typeof saved.completed === 'object' &&
    Number.isFinite(saved.totalOutdoorMinutes)
  return ok ? saved : empty(todayKey(now))
}

export function saveLog(log) {
  setItem(KEY, log)
}

// Pure: returns the updated log. Sessions under 1 minute do not count.
export function recordBreak(log, id, minutes) {
  if (!(minutes >= 1)) return log
  return {
    ...log,
    completed: { ...log.completed, [id]: true },
    totalOutdoorMinutes: log.totalOutdoorMinutes + minutes,
  }
}
