import { useState } from 'react'
import { Bell, BellOff, Settings } from 'lucide-react'
import { useDailyLog } from '../hooks/useDailyLog'
import { useLocation } from '../hooks/useLocation'
import { useNow } from '../hooks/useNow'
import { useProfile } from '../hooks/useProfile'
import { useReminder } from '../hooks/useReminder'
import { useSchedule } from '../hooks/useSchedule'
import { useSolarTimes } from '../hooks/useSolarTimes'
import DailyLogCard from './DailyLogCard'
import LocationBanner from './LocationBanner'
import NextBreak from './NextBreak'
import ReminderBanner from './ReminderBanner'
import ScheduleList from './ScheduleList'
import SettingsModal from './SettingsModal'
import SolarCard from './SolarCard'
import StepOutside from './StepOutside'

export default function Dashboard() {
  const { location, status, retry, setManual } = useLocation()
  const [profile, updateProfile] = useProfile()
  const solar = useSolarTimes(location)
  const { windows, source, generating } = useSchedule(solar, location, profile)
  const now = useNow()
  const [session, setSession] = useState(null)
  const [showSettings, setShowSettings] = useState(false)
  const { log, record, completedIds } = useDailyLog()
  const { due, dismiss } = useReminder(windows, now, profile.remindersOn, completedIds)

  const start = (item) => {
    dismiss()
    setSession(item)
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <header className="space-y-1">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">SunRhythm</h1>
          <div className="flex">
          <button
            onClick={() => updateProfile({ remindersOn: !profile.remindersOn })}
            aria-label={profile.remindersOn ? 'Turn reminders off' : 'Turn reminders on'}
            title={profile.remindersOn ? 'Reminders on' : 'Reminders off'}
            className="rounded-full p-2 text-slate-600 hover:bg-amber-100"
          >
            {profile.remindersOn ? <Bell size={20} /> : <BellOff size={20} />}
          </button>
          <button
            onClick={() => setShowSettings(true)}
            aria-label="Settings"
            className="rounded-full p-2 text-slate-600 hover:bg-amber-100"
          >
            <Settings size={20} />
          </button>
          </div>
        </div>
        <LocationBanner location={location} status={status} onRetry={retry} />
      </header>
      {due && <ReminderBanner item={due} onStart={start} onDismiss={dismiss} />}
      <NextBreak windows={windows} now={now} completedIds={completedIds} onStart={start} />
      <DailyLogCard log={log} />
      <SolarCard solar={solar} now={now} />
      <ScheduleList
        windows={windows}
        source={source}
        generating={generating}
        now={now}
        completedIds={completedIds}
      />
      {showSettings && (
        <SettingsModal
          profile={profile}
          location={location}
          onSave={(times, manual) => {
            updateProfile(times)
            if (manual) setManual(manual)
          }}
          onDetect={retry}
          onClose={() => setShowSettings(false)}
        />
      )}
      {session && (
        <StepOutside
          item={session}
          onComplete={(minutes) => record(session.id, minutes)}
          onClose={() => setSession(null)}
        />
      )}
    </div>
  )
}
