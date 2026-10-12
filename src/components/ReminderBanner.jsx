import { BellRing } from 'lucide-react'

export default function ReminderBanner({ item, onStart, onDismiss }) {
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center gap-3 rounded-xl bg-slate-900 p-4 text-amber-50 shadow"
    >
      <BellRing size={20} className="text-amber-300" />
      <p className="flex-1 font-medium">Time to step outside — {item.title}</p>
      <button
        onClick={() => onStart(item)}
        className="rounded-full bg-amber-400 px-4 py-1.5 text-sm font-medium text-slate-900"
      >
        Start
      </button>
      <button onClick={onDismiss} className="text-sm underline">
        Dismiss
      </button>
    </div>
  )
}
