import { useLocation } from '../hooks/useLocation'
import { useNow } from '../hooks/useNow'
import { useSchedule } from '../hooks/useSchedule'
import { useSolarTimes } from '../hooks/useSolarTimes'
import LocationBanner from './LocationBanner'
import NextBreak from './NextBreak'
import ScheduleList from './ScheduleList'
import SolarCard from './SolarCard'

export default function Dashboard() {
  const { location, status, retry } = useLocation()
  const solar = useSolarTimes(location)
  const { windows, source, generating } = useSchedule(solar, location)
  const now = useNow()

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">SunRhythm</h1>
        <LocationBanner location={location} status={status} onRetry={retry} />
      </header>
      <NextBreak windows={windows} now={now} />
      <SolarCard solar={solar} now={now} />
      <ScheduleList windows={windows} source={source} generating={generating} now={now} />
    </div>
  )
}
