import { useCookies } from 'react-cookie'

import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER_ACCEPT_COOKIES,
} from '@app/api/constants'
import { USER_ID } from '@app/constants'

export const useAuthCookies = () => {
  const [cookie, setCookies, removeCookies] = useCookies([
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    USER_ID,
    USER_ACCEPT_COOKIES,
  ])

  return {
    accessToken: cookie[ACCESS_TOKEN] as string,
    refreshToken: cookie[REFRESH_TOKEN] as string,
    userId: cookie[USER_ID] as string,
    userAcceptCookies: cookie[USER_ACCEPT_COOKIES] as boolean,
    removeAuthCookies: async () => {
      removeCookies(USER_ID)
      removeCookies(ACCESS_TOKEN)
      removeCookies(REFRESH_TOKEN)

      await fetch('/api/deauthorize')
    },
    setAuthAcceptCookies: () => {
      setCookies(USER_ACCEPT_COOKIES, true, { path: '/' })
    },
  }
}
