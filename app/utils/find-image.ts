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
  if (!item) return ''

  if ('images' in item)
    return (
      item.images.find(findImagePredicate(minWidth))?.url ?? item.images[0].url
    )
  else if (Array.isArray(item))
    return item.find(findImagePredicate(minWidth))?.url ?? item[0].url

  return (
    item.album.images.find(findImagePredicate(minWidth))?.url ??
    item.album.images[0].url
  )
}
