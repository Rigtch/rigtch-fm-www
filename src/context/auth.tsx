import { useRouter } from 'next/router'
import { ReactNode, createContext, useState } from 'react'
import { useCookies } from 'react-cookie'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/common/constants'
import { client } from '~/config'
import { Profile } from '~/graphql/types'

export interface AuthContextType {
  profile?: Profile
  setProfile: (newProfile?: Profile) => void
  disconnect: () => void
  isAuthorized: boolean
}

export const AuthContext = createContext<AuthContextType>({
  profile: undefined,
  isAuthorized: false,
  disconnect: () => {},
  setProfile: () => {},
})

export interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [, , removeCookies] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN])
  const router = useRouter()

  const [profile, setProfile] = useState<Profile>()

  const isAuthorized = !!profile?.displayName

  function disconnect() {
    removeCookies(ACCESS_TOKEN)
    removeCookies(REFRESH_TOKEN)

    setProfile(undefined)

    client.resetStore()

    router.push('/about')
  }

  return (
    <AuthContext.Provider
      value={{
        profile,
        setProfile,
        disconnect,
        isAuthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
