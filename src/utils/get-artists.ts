import { Artist } from '~/graphql'

export const getArtists = (artists?: Pick<Artist, 'name'>[]) =>
  artists?.map(({ name }) => name).join(', ') ?? ''
