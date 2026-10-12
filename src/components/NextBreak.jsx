import { Sun } from 'lucide-react'
import { formatCountdown, getFocusBreak } from '../services/scheduleService'
import { formatTime } from '../services/solarService'

export default function NextBreak({ windows, now, completedIds, onStart }) {
  const focus = getFocusBreak(windows, now, completedIds)

  return (
    <section className="rounded-xl bg-amber-400 p-5 text-slate-900 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Sun size={16} /> {focus?.active ? 'Time to step outside' : 'Next break'}
      </div>
      {focus ? (
        <>
          <p className="mt-2 text-2xl font-semibold">{focus.item.title}</p>
          <p className="mt-1 text-sm">
            {formatTime(new Date(focus.item.start))}
            {focus.active ? (
              <> · open now</>
            ) : (
              <>
                {' '}· in{' '}
                <span className="font-semibold">
                  {formatCountdown(new Date(focus.item.start) - now)}
                </span>
              </>
            )}{' '}
            · {focus.item.durationMin} min
          </p>
          <button
            onClick={() => onStart(focus.item)}
            className="mt-4 rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-amber-50"
          >
            Step outside
          </button>
        </>
      ) : (
        <p className="mt-2 text-lg font-semibold">All of today's breaks are done. Nice work.</p>
      )}
    </section>
  )
}
