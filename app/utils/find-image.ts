import type { Simplify } from 'type-fest'

import type { AlbumEntity, Image } from '@app/api/types'

const findImagePredicate =
  (minWidth = 0) =>
  (image: Image) =>
    image.width >= minWidth

export type ItemWithImages =
  | Simplify<
      | Pick<AlbumEntity, 'images'>
      | {
          album: Pick<AlbumEntity, 'images'>
        }
      | Image[]
    >
  | []

export function findImage(item?: ItemWithImages, minWidth = 0) {
  const defaultCover = 'https://dev.afrocharts.com/images/song_cover.png'

  if (!item) return defaultCover

  if ('images' in item) {
    if (item.images.length === 0) return defaultCover

    return (
      item.images.find(findImagePredicate(minWidth))?.url ?? item.images[0].url
    )
  } else if (Array.isArray(item)) {
    if (item.length === 0) return defaultCover

    return item.find(findImagePredicate(minWidth))?.url ?? item[0].url
  }

  if (item.album.images.length === 0) return defaultCover

  return (
    item.album.images.find(findImagePredicate(minWidth))?.url ??
    item.album.images[0].url
  )
}
