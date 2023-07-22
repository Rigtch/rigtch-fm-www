import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

import { ACCESS_TOKEN, TOP_ARTISTS } from '~/api/constants'
import { getTopArtists } from '~/api/fetchers'

export const useTopArtists = () => {
  const [cookie] = useCookies([ACCESS_TOKEN])

  return useQuery([TOP_ARTISTS], () => getTopArtists(cookie[ACCESS_TOKEN]))
}
