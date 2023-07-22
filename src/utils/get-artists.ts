import { Artist } from '~/api/types'

export const getArtists = (artists?: Pick<Artist, 'name'>[]) =>
  artists?.map(({ name }) => name).join(', ') ?? ''
