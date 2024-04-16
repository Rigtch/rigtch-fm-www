import { ArtistEntity } from '../types'

import { fetchApi } from './fetch-api'

export interface ItemParams {
  id: string
}

export function getArtist(token: string, { id }: ItemParams) {
  console.log('getArtist', id)
  return fetchApi<ArtistEntity>(`/artists/${id}`, {
    token,
  })
}
