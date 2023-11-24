import { useCookies } from 'react-cookie'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@app/api/constants'

export const useAuthCookies = () => {
  const [cookie, , removeCookies] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN])

  return {
    accessToken: cookie[ACCESS_TOKEN] as string,
    refreshToken: cookie[REFRESH_TOKEN] as string,
    removeAuthCookies: () => {
      removeCookies(ACCESS_TOKEN)
      removeCookies(REFRESH_TOKEN)
    },
  }
}
