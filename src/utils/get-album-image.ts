import { getImage } from './get-image'

import { Album } from '~/graphql/types'

export const getAlbumImage = (album?: Pick<Album, 'images'>, index = 0) =>
  getImage(album?.images, index)
