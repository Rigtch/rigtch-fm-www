import { AlbumEntity, ItemParams } from '../types'

import { fetchApi } from './fetch-api'

export function getArtistAlbums({ id }: ItemParams) {
  return fetchApi<{ albums: AlbumEntity[] }>(`/artists/${id}/albums`)
}
