import { Album } from '~/graphql/types'

export const getAlbumImage = (album?: Pick<Album, 'images'>, index = 0) =>
  album?.images[index]?.url ?? ''
