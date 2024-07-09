import { fetchApi } from '../fetch-api'

import type { ArtistEntity, ItemParams } from '@app/api/types'

export function getArtist({ id }: ItemParams) {
  return fetchApi<ArtistEntity>(`/artists/${id}`)
}
