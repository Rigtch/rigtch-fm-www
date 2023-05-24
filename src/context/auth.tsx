import { ReactNode, createContext, useState } from 'react'

import { Profile } from '~/graphql'

export interface AuthContextType {
  profile?: Profile
  setProfile: (newProfile?: Profile) => void
  isAuthorized: boolean
}

export const AuthContext = createContext<AuthContextType>({
  profile: undefined,
  isAuthorized: false,
  setProfile: () => {},
})

export interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [profile, setProfile] = useState<Profile>()
  const [isAuthorized, setIsAuthorized] = useState(false)

  function handleSetProfile(newProfile?: Profile) {
    setProfile(newProfile)
    setIsAuthorized(!!newProfile?.displayName)
  }

  return (
    <AuthContext.Provider
      value={{
        profile,
        setProfile: handleSetProfile,
        isAuthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
