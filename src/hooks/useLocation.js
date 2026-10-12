import { useCallback, useEffect, useState } from 'react'
import {
  DEFAULT_LOCATION,
  detectLocation,
  loadSavedLocation,
  saveLocation,
} from '../services/locationService'

// status: 'loading' | 'detected' | 'default'
export function useLocation() {
  const [state, setState] = useState(() => {
    const saved = loadSavedLocation()
    return saved
      ? { location: saved, status: 'detected' }
      : { location: DEFAULT_LOCATION, status: 'loading' }
  })

  const detect = useCallback(async () => {
    setState((s) => ({ ...s, status: 'loading' }))
    try {
      const loc = await detectLocation()
      saveLocation(loc)
      setState({ location: loc, status: 'detected' })
    } catch {
      setState({ location: DEFAULT_LOCATION, status: 'default' })
    }
  }, [])

  useEffect(() => {
    if (state.status === 'loading') detect()
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { ...state, retry: detect }
}
