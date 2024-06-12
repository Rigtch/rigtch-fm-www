import { TrackEntity } from '../types'

import { fetchApi } from './fetch-api'

export interface ItemParams {
  id: string
}

export function getArtistTopTracks({ id }: ItemParams) {
  return fetchApi<{ tracks: TrackEntity[] }>(`/artists/${id}/top-tracks`)
}
