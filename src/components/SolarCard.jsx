import { formatTime, getSunProgress } from '../services/solarService'

export default function SolarCard({ solar, now }) {
  const { progress, isNight } = getSunProgress(solar, now)

  return (
    <section className="rounded-xl bg-white p-4 shadow-sm">
      <h2 className="mb-3 font-medium">Sun today</h2>
      {solar.polar ? (
        <p className="text-sm text-amber-700">
          No sunrise or sunset at this location today. Noon: {formatTime(solar.solarNoon)}.
        </p>
      ) : (
        <>
          <div className="relative h-2 rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-amber-300"
              style={{ width: `${progress * 100}%` }}
            />
            <div
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-amber-500 shadow"
              style={{ left: `${progress * 100}%` }}
              aria-label={`Sun position ${Math.round(progress * 100)}%`}
            />
          </div>
          <div className="mt-3 flex justify-between text-xs text-slate-600">
            <span>Sunrise<br />{formatTime(solar.sunrise)}</span>
            <span className="text-center">Solar noon<br />{formatTime(solar.solarNoon)}</span>
            <span className="text-right">Sunset<br />{formatTime(solar.sunset)}</span>
          </div>
          {isNight && <p className="mt-2 text-xs text-slate-500">The sun is down right now.</p>}
        </>
      )}
    </section>
  )
}
