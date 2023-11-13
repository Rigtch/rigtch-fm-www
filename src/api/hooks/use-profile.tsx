import { useQuery } from '@tanstack/react-query'

import { useAuthCookies } from '@hooks/use-auth-cookies'
import { PROFILE } from '@api/constants'
import { getProfile } from '@api/fetchers'

export const useProfileQuery = () => {
  const { accessToken } = useAuthCookies()

  return useQuery([PROFILE], () => getProfile(accessToken))
}
