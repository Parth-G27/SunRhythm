import { getItem, setItem } from '../lib/storage'

const KEY = 'sunrhythm:location'

export const DEFAULT_LOCATION = {
  lat: 28.6139,
  lon: 77.209,
  source: 'default',
  label: 'New Delhi',
}

export function isValidLocation(loc) {
  return (
    !!loc &&
    Number.isFinite(loc.lat) && loc.lat >= -90 && loc.lat <= 90 &&
    Number.isFinite(loc.lon) && loc.lon >= -180 && loc.lon <= 180
  )
}

export function loadSavedLocation() {
  const saved = getItem(KEY)
  return isValidLocation(saved) ? saved : null
}

export function saveLocation(loc) {
  setItem(KEY, loc)
}

// Resolves with a detected Location or rejects (denied, timeout, unsupported, invalid).
export function detectLocation() {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) return reject(new Error('unsupported'))
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const loc = { lat: coords.latitude, lon: coords.longitude, source: 'detected' }
        isValidLocation(loc) ? resolve(loc) : reject(new Error('invalid'))
      },
      reject,
      { timeout: 10000, maximumAge: 3600000 },
    )
  })
}
