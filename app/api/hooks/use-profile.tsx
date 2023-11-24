import { useQuery } from '@tanstack/react-query'

import { PROFILE } from '../constants'
import { getProfile } from '../fetchers'

import { useAuthCookies } from '@app/hooks/use-auth-cookies'

export const useProfileQuery = () => {
  const { accessToken } = useAuthCookies()

  return useQuery([PROFILE], () => getProfile(accessToken))
}
