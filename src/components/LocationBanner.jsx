import { MapPin } from 'lucide-react'

export default function LocationBanner({ location, status, onRetry }) {
  const coords = `${location.lat.toFixed(2)}, ${location.lon.toFixed(2)}`

  if (status === 'loading') {
    return <p className="text-sm text-slate-500">Finding your location…</p>
  }

  if (status === 'default') {
    return (
      <div className="flex flex-wrap items-center gap-2 text-sm text-amber-700">
        <MapPin size={16} />
        <span>Location unavailable — showing {location.label} ({coords}).</span>
        <button onClick={onRetry} className="underline font-medium">
          Use my location
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <MapPin size={16} />
      <span>
        {location.label ? `${location.label} · ` : ''}
        {coords}
      </span>
    </div>
  )
}
