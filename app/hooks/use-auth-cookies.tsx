import { useCookies } from 'react-cookie'

import { USER_ID } from '@app/constants'

export const useAuthCookies = () => {
  const [cookie, , removeCookies] = useCookies([USER_ID])

  return {
    userId: cookie[USER_ID] as string,
    removeAuthCookies: async () => {
      removeCookies(USER_ID)

      await fetch('/api/deauthorize')
    },
  }
}
