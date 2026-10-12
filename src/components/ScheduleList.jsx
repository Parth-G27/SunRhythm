import { formatTime } from '../services/solarService'

export default function ScheduleList({ windows, source, generating, now }) {
  return (
    <section className="rounded-xl bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="font-medium">Today's daylight breaks</h2>
        <span className="text-xs text-slate-500">
          {generating ? 'Asking local AI…' : source === 'ai' ? 'AI plan' : 'Static schedule'}
        </span>
      </div>
      <ol className="space-y-3">
        {windows.map((w) => {
          const past = new Date(w.start) <= now
          return (
            <li key={w.id} className={past ? 'opacity-40' : ''}>
              <p className="font-medium">
                {formatTime(new Date(w.start))} · {w.title}{' '}
                <span className="text-sm font-normal text-slate-500">({w.durationMin} min)</span>
              </p>
              <p className="text-sm text-slate-600">{w.instruction}</p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
