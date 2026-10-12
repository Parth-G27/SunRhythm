import { OPEN_WINDOW_MIN } from './scheduleService'

// First break that is open now and has not been reminded yet.
export function getDueReminder(windows, now, notifiedIds = []) {
  const t = now.getTime()
  return (
    windows.find((w) => {
      const start = new Date(w.start).getTime()
      return start <= t && t < start + OPEN_WINDOW_MIN * 60000 && !notifiedIds.includes(w.id)
    }) ?? null
  )
}

let ctx = null
function audio() {
  try {
    ctx ??= new (window.AudioContext || window.webkitAudioContext)()
    return ctx
  } catch {
    return null
  }
}

// Browsers block audio until the user interacts; call on the first pointer event.
export function unlockAudio() {
  audio()?.resume?.().catch(() => {})
}

// Soft two-note chime, synthesized locally. Silently does nothing if blocked.
export function playChime() {
  const c = audio()
  if (!c || c.state !== 'running') return
  ;[660, 880].forEach((freq, i) => {
    const osc = c.createOscillator()
    const gain = c.createGain()
    const t = c.currentTime + i * 0.25
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.15, t + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.8)
    osc.connect(gain).connect(c.destination)
    osc.start(t)
    osc.stop(t + 0.85)
  })
}

export function vibrate() {
  try {
    navigator.vibrate?.([200, 100, 200])
  } catch {
    // unsupported: ignore
  }
}
