import { Artist } from '@api/types'

export const formatArtists = (artists?: Pick<Artist, 'name'>[]) =>
  artists?.map(({ name }) => name).join(', ') ?? ''
