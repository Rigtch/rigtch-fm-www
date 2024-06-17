import { AlbumEntity, ItemParams } from '../types'

import { fetchApi } from './fetch-api'

export function getAlbum({ id }: ItemParams) {
  return fetchApi<AlbumEntity>(`/albums/${id}`)
}
