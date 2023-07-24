import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

import { getTopGenres } from '@api/fetchers'
import { ACCESS_TOKEN, TOP_GENRES } from '@api/constants'

export const useTopGenresQuery = () => {
  const [cookie] = useCookies([ACCESS_TOKEN])

  return useQuery([TOP_GENRES], () => getTopGenres(cookie[ACCESS_TOKEN]))
}
