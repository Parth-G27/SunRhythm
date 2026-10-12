const MIN = 60000

// Local date + "HH:MM" -> Date
function at(date, hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  const d = new Date(date)
  d.setHours(h, m, 0, 0)
  return d
}

const TEXT = {
  morning: {
    title: 'Morning Light Anchor',
    instruction: 'Step outside for 10 minutes soon after waking to set your body clock.',
  },
  midday: {
    title: 'Midday Light Break',
    instruction: 'Take a 5-minute walk outside to beat the afternoon lull with bright daylight.',
  },
  evening: {
    title: 'Sunset Wind-down',
    instruction: 'Watch the fading light for 10 minutes to cue your body for sleep.',
  },
}

const make = (id, start, durationMin) => ({
  id,
  start: start.toISOString(),
  durationMin,
  ...TEXT[id],
})

// Pure, local, no network (Principles I and III). Always returns 3 breaks in order.
export function buildFallbackSchedule(solar, profile, date = new Date()) {
  if (solar.polar) {
    return [
      make('morning', at(date, '08:00'), 10),
      make('midday', at(date, '13:30'), 5),
      make('evening', at(date, '18:00'), 10),
    ]
  }
  const wakePlus = new Date(at(date, profile.wakeTime).getTime() + 30 * MIN)
  const morning = wakePlus < solar.sunrise ? solar.sunrise : wakePlus
  const midday = new Date(solar.solarNoon.getTime() + 90 * MIN)
  const evening = new Date(solar.sunset.getTime() - 30 * MIN)
  return [make('morning', morning, 10), make('midday', midday, 5), make('evening', evening, 10)]
}

// A break is "open" from its start until this many minutes later.
export const OPEN_WINDOW_MIN = 30

// The break open right now, else the next upcoming one, else null. Skips finished breaks.
export function getFocusBreak(windows, now = new Date(), skipIds = []) {
  const t = now.getTime()
  const item = windows.find(
    (w) => !skipIds.includes(w.id) && t < new Date(w.start).getTime() + OPEN_WINDOW_MIN * MIN,
  )
  if (!item) return null
  return { item, active: new Date(item.start).getTime() <= t }
}

export function formatCountdown(ms) {
  const totalMin = Math.floor(ms / MIN)
  if (totalMin < 1) return 'now'
  const h = Math.floor(totalMin / 60)
  const m = totalMin % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

// mm:ss for the big clock.
export function formatClock(ms) {
  const total = Math.max(0, Math.ceil(ms / 1000))
  const m = String(Math.floor(total / 60)).padStart(2, '0')
  const s = String(total % 60).padStart(2, '0')
  return `${m}:${s}`
}
