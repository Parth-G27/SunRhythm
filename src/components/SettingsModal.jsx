import { useState } from 'react'
import { parseCoords } from '../services/locationService'
import { validateTimes } from '../services/profileService'

const input = 'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2'

export default function SettingsModal({ profile, location, onSave, onDetect, onClose }) {
  const [wake, setWake] = useState(profile.wakeTime)
  const [sleep, setSleep] = useState(profile.sleepTime)
  const [lat, setLat] = useState(String(location.lat))
  const [lon, setLon] = useState(String(location.lon))
  const [label, setLabel] = useState(location.label ?? '')
  const [error, setError] = useState(null)

  const locationChanged =
    Number(lat) !== location.lat || Number(lon) !== location.lon || label !== (location.label ?? '')

  const save = (e) => {
    e.preventDefault()
    const timeError = validateTimes(wake, sleep)
    if (timeError) return setError(timeError)
    let manual = null
    if (locationChanged) {
      manual = parseCoords(lat, lon, label)
      if (!manual) return setError('Latitude must be -90..90 and longitude -180..180.')
    }
    onSave({ wakeTime: wake, sleepTime: sleep }, manual)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <form onSubmit={save} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-5 shadow-xl">
        <h2 className="text-lg font-semibold">Settings</h2>

        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">
            Wake time
            <input type="time" required value={wake} onChange={(e) => setWake(e.target.value)} className={input} />
          </label>
          <label className="text-sm">
            Sleep time
            <input type="time" required value={sleep} onChange={(e) => setSleep(e.target.value)} className={input} />
          </label>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium">Location override</legend>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm">
              Latitude
              <input type="number" step="any" value={lat} onChange={(e) => setLat(e.target.value)} className={input} />
            </label>
            <label className="text-sm">
              Longitude
              <input type="number" step="any" value={lon} onChange={(e) => setLon(e.target.value)} className={input} />
            </label>
          </div>
          <label className="block text-sm">
            Label (optional)
            <input value={label} maxLength={40} onChange={(e) => setLabel(e.target.value)} className={input} />
          </label>
          <button
            type="button"
            onClick={() => {
              onDetect()
              onClose()
            }}
            className="text-sm underline"
          >
            Use my location
          </button>
        </fieldset>

        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-full px-4 py-2 text-sm">
            Cancel
          </button>
          <button type="submit" className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-amber-50">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
