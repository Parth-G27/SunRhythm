import { useCallback, useState } from 'react'
import { loadLog, recordBreak, saveLog } from '../services/logService'

export function useDailyLog() {
  const [log, setLog] = useState(() => loadLog())

  const record = useCallback((id, minutes) => {
    const next = recordBreak(loadLog(), id, minutes) // reload so a new day starts fresh
    saveLog(next)
    setLog(next)
  }, [])

  return { log, record, completedIds: Object.keys(log.completed) }
}
