import type { ItemParams, TrackEntity } from '../types'

import { fetchApi } from './fetch-api'

export function getTrack({ id }: ItemParams) {
  return fetchApi<TrackEntity>(`/tracks/${id}`)
}
