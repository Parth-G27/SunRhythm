import { useCallback, useState } from 'react'
import { loadProfile, saveProfile } from '../services/profileService'

export function useProfile() {
  const [profile, setProfile] = useState(loadProfile)
  const update = useCallback((patch) => setProfile(saveProfile(patch)), [])
  return [profile, update]
}
