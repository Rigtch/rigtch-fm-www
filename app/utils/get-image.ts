import { AlbumEntity, Image } from '@app/api/types'

const getImagePredicate =
  (minWidth = 0) =>
  (image: Image) =>
    image.width >= minWidth

export type ItemWithImages =
  | Pick<AlbumEntity, 'images'>
  | {
      album: Pick<AlbumEntity, 'images'>
    }

export function getImage(item: ItemWithImages | Image[], minWidth = 0) {
  if ('images' in item)
    return (
      item.images.find(getImagePredicate(minWidth))?.url ?? item.images[0].url
    )
  else if (Array.isArray(item))
    return item.find(getImagePredicate(minWidth))?.url ?? item[0].url

  return (
    item.album.images.find(getImagePredicate(minWidth))?.url ??
    item.album.images[0].url
  )
}
