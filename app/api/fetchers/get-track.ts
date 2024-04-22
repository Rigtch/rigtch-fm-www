import { Track } from '../types'

import { fetchApi } from './fetch-api'

export interface ItemParams {
  id: string
}

export function getTrack({ id }: ItemParams) {
  return fetchApi<Track>(`/tracks/${id}`)
}
