import { fetchApi } from '../fetch-api'

import type { ItemParams, TrackEntity } from '@app/api/types'

export function getTrack({ id }: ItemParams) {
  return fetchApi<TrackEntity>(`/tracks/${id}`)
}
