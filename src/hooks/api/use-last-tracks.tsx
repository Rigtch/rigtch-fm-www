import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

import { ACCESS_TOKEN, LAST_TRACKS } from '@api/constants'
import { getLastTracks } from '@api/fetchers'

export const useLastTracksQuery = () => {
  const [cookie] = useCookies([ACCESS_TOKEN])

  return useQuery([LAST_TRACKS], () => getLastTracks(cookie[ACCESS_TOKEN]))
}

export const useLastTracksInfiniteQuery = (limit = 20) => {
  const [cookie] = useCookies([ACCESS_TOKEN])

  return useInfiniteQuery(
    [LAST_TRACKS],
    ({ pageParam }) => getLastTracks(cookie[ACCESS_TOKEN], limit, pageParam),
    {
      getNextPageParam: lastPage => {
        console.log('lastPage', lastPage)
        return lastPage.next ? lastPage.cursors.before : undefined
      },
    }
  )
}
