import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

import { getProfile } from '~/api/fetchers'
import { ACCESS_TOKEN, PROFILE } from '~/api/constants'

export const useProfile = () => {
  const [cookie] = useCookies([ACCESS_TOKEN])

  return useQuery([PROFILE], () => getProfile(cookie[ACCESS_TOKEN]))
}
