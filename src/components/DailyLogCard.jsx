import { Check } from 'lucide-react'

const IDS = ['morning', 'midday', 'evening']

export default function DailyLogCard({ log }) {
  const done = IDS.filter((id) => log.completed[id]).length
  return (
    <section className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
      <div>
        <h2 className="font-medium">Today</h2>
        <p className="text-sm text-slate-600">
          {done} of {IDS.length} breaks · {log.totalOutdoorMinutes} min outside
        </p>
      </div>
      <div className="flex gap-2" aria-hidden="true">
        {IDS.map((id) => (
          <span
            key={id}
            className={`flex h-7 w-7 items-center justify-center rounded-full ${
              log.completed[id] ? 'bg-green-500 text-white' : 'bg-slate-200 text-transparent'
            }`}
          >
            <Check size={16} />
          </span>
        ))}
      </div>
    </section>
  )
}
