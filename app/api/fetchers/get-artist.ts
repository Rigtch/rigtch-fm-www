import { ArtistEntity } from '../types'

import { fetchApi } from './fetch-api'

export interface ItemParams {
  id: string
}

export function getArtist(token: string, { id }: ItemParams) {
  return fetchApi<ArtistEntity>(`/artists/${id}`, {
    token,
  })
}
