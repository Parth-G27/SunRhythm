import { useEffect, useRef, useState } from 'react'
import { formatClock } from '../services/scheduleService'

// Full-screen break timer. Clock is derived from a fixed end time, so it cannot drift.
export default function StepOutside({ item, onComplete, onClose }) {
  const [startedAt] = useState(() => Date.now())
  const endAt = startedAt + item.durationMin * 60000
  const [now, setNow] = useState(startedAt)
  const [minutes, setMinutes] = useState(null) // set when finished
  const reported = useRef(false)

  const finish = (mins) => {
    if (reported.current) return
    reported.current = true
    setMinutes(mins)
    onComplete?.(mins)
  }

  useEffect(() => {
    if (minutes !== null) return
    const id = setInterval(() => setNow(Date.now()), 500)
    return () => clearInterval(id)
  }, [minutes])

  useEffect(() => {
    if (minutes === null && now >= endAt) finish(item.durationMin)
  })

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-amber-400 p-6 text-center text-slate-900">
      {minutes === null ? (
        <>
          <p className="text-lg font-medium">{item.title}</p>
          <p className="text-8xl font-bold tabular-nums sm:text-9xl" aria-live="off">
            {formatClock(endAt - now)}
          </p>
          <p className="max-w-sm text-lg">{item.instruction}</p>
          <button
            onClick={() => finish(Math.round((Date.now() - startedAt) / 60000))}
            className="rounded-full bg-slate-900 px-8 py-3 text-lg font-medium text-amber-50"
          >
            I'm back
          </button>
        </>
      ) : (
        <>
          <p className="text-4xl font-bold">Nice work</p>
          <p className="text-xl">
            {minutes} min of daylight — your body clock thanks you.
          </p>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-900 px-8 py-3 text-lg font-medium text-amber-50"
          >
            Close
          </button>
        </>
      )}
    </div>
  )
}
