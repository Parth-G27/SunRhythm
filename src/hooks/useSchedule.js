import { useEffect, useState } from 'react'
import { getItem, setItem } from '../lib/storage'
import { generateSchedule } from '../services/ollamaService'
import { buildFallbackSchedule } from '../services/scheduleService'

const CACHE_KEY = 'sunrhythm:plan'

const cacheKey = (date, loc, p) =>
  `${date.toLocaleDateString('en-CA')}|${loc.lat.toFixed(2)}|${loc.lon.toFixed(2)}|${p.wakeTime}|${p.sleepTime}`

// Static schedule first; upgrade to the local-AI plan when it arrives. Never throws.
export function useSchedule(solar, location, profile) {
  const [state, setState] = useState({ windows: [], source: 'fallback', generating: false })

  useEffect(() => {
    const now = new Date()
    const fallback = buildFallbackSchedule(solar, profile, now)
    const key = cacheKey(now, location, profile)

    const cached = getItem(CACHE_KEY)
    if (cached?.key === key && Array.isArray(cached.windows) && cached.windows.length === 3) {
      setState({ windows: cached.windows, source: 'ai', generating: false })
      return
    }

    setState({ windows: fallback, source: 'fallback', generating: true })
    const controller = new AbortController()
    generateSchedule(solar, profile, { signal: controller.signal, date: now })
      .then((windows) => {
        setItem(CACHE_KEY, { key, windows })
        setState({ windows, source: 'ai', generating: false })
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ windows: fallback, source: 'fallback', generating: false })
      })
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solar, location.lat, location.lon, profile.wakeTime, profile.sleepTime])

  return state
}
