import { fetchApi } from '../fetch-api'

import type { ItemParams, TrackEntity } from '@app/api/types'

export function getArtistTopTracks({ id }: ItemParams) {
  return fetchApi<{ tracks: TrackEntity[] }>(`/artists/${id}/top-tracks`)
}
