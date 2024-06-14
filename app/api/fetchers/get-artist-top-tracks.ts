import { ItemParams, TrackEntity } from '../types'

import { fetchApi } from './fetch-api'

export function getArtistTopTracks({ id }: ItemParams) {
  return fetchApi<{ tracks: TrackEntity[] }>(`/artists/${id}/top-tracks`)
}
