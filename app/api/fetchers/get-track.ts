import { TrackEntity } from '../types'

import { fetchApi } from './fetch-api'

export interface ItemParams {
  id: string
}

export function getTrack({ id }: ItemParams) {
  return fetchApi<TrackEntity>(`/tracks/${id}`)
}
