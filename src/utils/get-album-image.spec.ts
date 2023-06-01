import { describe, test } from 'vitest'

import { getAlbumImage } from './get-album-image'

import { Image } from '~/graphql/types'

const albumMock: { images: Image[] } = {
  images: [
    { url: 'https://url1' },
    { url: 'https://url2' },
    { url: 'https://url3' },
  ],
}

describe('getAlbumImage', () => {
  test('returns empty string if album is undefined', () => {
    expect(getAlbumImage()).toEqual('')
  })

  test('returns empty string if album images is empty', () => {
    expect(getAlbumImage({ images: [] })).toEqual('')
  })

  test('should return string with album image url at default index 0', () => {
    expect(getAlbumImage(albumMock)).toEqual('https://url1')
  })

  test('should return string with album image url at index 1', () => {
    expect(getAlbumImage(albumMock, 1)).toEqual('https://url2')
  })
})
