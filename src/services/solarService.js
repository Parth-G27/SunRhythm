import { getTimes } from 'suncalc'

const isValid = (d) => d instanceof Date && !Number.isNaN(d.getTime())

// Pure local math (Principle I). `polar` is true when the sun never rises or sets that day.
export function getSolarTimes(lat, lon, date = new Date()) {
  const t = getTimes(date, lat, lon)
  const polar = !isValid(t.sunrise) || !isValid(t.sunset)
  return {
    dawn: t.dawn,
    sunrise: t.sunrise,
    solarNoon: t.solarNoon,
    sunset: t.sunset,
    dusk: t.dusk,
    polar,
  }
}

// Fraction of the daylight period elapsed at `now`, clamped to 0..1.
export function getSunProgress(solar, now = new Date()) {
  if (solar.polar) return { progress: 0.5, isNight: false }
  const start = solar.sunrise.getTime()
  const end = solar.sunset.getTime()
  const t = now.getTime()
  if (t <= start) return { progress: 0, isNight: true }
  if (t >= end) return { progress: 1, isNight: true }
  return { progress: (t - start) / (end - start), isNight: false }
}

export function formatTime(date) {
  if (!isValid(date)) return '—'
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
