import { AlbumEntity } from '../types'

import { fetchApi } from './fetch-api'

export interface ItemParams {
  id: string
}

export function getAlbum({ id }: ItemParams) {
  return fetchApi<AlbumEntity>(`/albums/${id}`)
}
