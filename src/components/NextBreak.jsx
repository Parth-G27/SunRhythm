import { Sun } from 'lucide-react'
import { formatCountdown, getNextBreak } from '../services/scheduleService'
import { formatTime } from '../services/solarService'

export default function NextBreak({ windows, now }) {
  const next = getNextBreak(windows, now)

  return (
    <section className="rounded-xl bg-amber-400 p-5 text-slate-900 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Sun size={16} /> Next break
      </div>
      {next ? (
        <>
          <p className="mt-2 text-2xl font-semibold">{next.title}</p>
          <p className="mt-1 text-sm">
            {formatTime(new Date(next.start))} · in{' '}
            <span className="font-semibold">
              {formatCountdown(new Date(next.start) - now)}
            </span>{' '}
            · {next.durationMin} min
          </p>
        </>
      ) : (
        <p className="mt-2 text-lg font-semibold">All of today's breaks are done. Nice work.</p>
      )}
    </section>
  )
}
