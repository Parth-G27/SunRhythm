import { useCallback, useEffect, useState } from 'react'
import { getItem, setItem } from '../lib/storage'
import { getDueReminder, playChime, unlockAudio, vibrate } from '../services/reminderService'

const KEY = 'sunrhythm:notified'
const today = (d) => d.toLocaleDateString('en-CA')

function loadNotified(now) {
  const saved = getItem(KEY)
  return saved?.date === today(now) && Array.isArray(saved.ids) ? saved.ids : []
}

// Fires chime + vibration + banner once per break per day. `due` is the break to show.
export function useReminder(windows, now, enabled, completedIds = []) {
  const [due, setDue] = useState(null)

  useEffect(() => {
    window.addEventListener('pointerdown', unlockAudio, { once: true })
    return () => window.removeEventListener('pointerdown', unlockAudio)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const ids = loadNotified(now)
    const next = getDueReminder(windows, now, [...ids, ...completedIds])
    if (!next) return
    setItem(KEY, { date: today(now), ids: [...ids, next.id] })
    setDue(next)
    playChime()
    vibrate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windows, now, enabled])

  const dismiss = useCallback(() => setDue(null), [])
  return { due: enabled ? due : null, dismiss }
}
