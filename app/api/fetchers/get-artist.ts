import type { ArtistEntity, ItemParams } from '../types'

import { fetchApi } from './fetch-api'

export function getArtist({ id }: ItemParams) {
  return fetchApi<ArtistEntity>(`/artists/${id}`)
}
