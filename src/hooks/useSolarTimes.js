import { useMemo } from 'react'
import { getSolarTimes } from '../services/solarService'

export function useSolarTimes(location) {
  return useMemo(
    () => getSolarTimes(location.lat, location.lon, new Date()),
    [location.lat, location.lon],
  )
}
