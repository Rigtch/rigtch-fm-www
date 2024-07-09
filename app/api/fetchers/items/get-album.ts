import { fetchApi } from '../fetch-api'

import type { AlbumEntity, ItemParams } from '@app/api/types'

export function getAlbum({ id }: ItemParams) {
  return fetchApi<AlbumEntity>(`/albums/${id}`)
}
