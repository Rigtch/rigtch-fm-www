import { fetchApi } from '../fetch-api'

import type { AlbumEntity, ItemParams } from '@app/api/types'

export function getArtistAlbums({ id }: ItemParams) {
  return fetchApi<{ albums: AlbumEntity[] }>(`/artists/${id}/albums`)
}
