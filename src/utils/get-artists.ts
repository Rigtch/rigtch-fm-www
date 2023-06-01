import { Artist } from '~/graphql/types'

export const getArtists = (artists?: Pick<Artist, 'name'>[]) =>
  artists?.map(({ name }) => name).join(', ') ?? ''
