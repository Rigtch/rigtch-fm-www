import { useQuery } from '@tanstack/react-query'

import { getProfile } from '@api/fetchers'
import { PROFILE } from '@api/constants'
import { useAuthCookies } from '@hooks/use-auth-cookies'

export const useProfileQuery = () => {
  const { accessToken } = useAuthCookies()

  return useQuery([PROFILE], () => getProfile(accessToken))
}
