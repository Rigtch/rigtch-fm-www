import { findImage } from './find-image'

import type { Image } from '@app/api/types'

describe('getImage', () => {
  let imagesMock: Image[]

  beforeEach(() => {
    imagesMock = [
      {
        url: 'https://spotify.com/image1.png',
        width: 48,
        height: 48,
      },
      {
        url: 'https://spotify.com/image2.png',
        width: 128,
        height: 128,
      },
    ]
  })

  test('should return empty string if item is undefined', () => {
    expect(findImage(undefined)).toEqual('')
  })

  test('should return image with width greater than or equal to minWidth', () => {
    expect(findImage(imagesMock, 48)).toEqual(imagesMock[0].url)
    expect(findImage(imagesMock, 128)).toEqual(imagesMock[1].url)
  })

  test('should return first image if no image with width greater than or equal to minWidth', () => {
    expect(findImage(imagesMock, 200)).toEqual(imagesMock[0].url)
  })

  describe('when item is track object', () => {
    let trackMock: {
      album: {
        images: Image[]
      }
    }

    beforeEach(() => {
      trackMock = {
        album: {
          images: imagesMock,
        },
      }
    })

    test('should return image with width greater than or equal to minWidth', () => {
      expect(findImage(trackMock, 48)).toEqual(imagesMock[0].url)
    })

    test('should return first image if no image with width greater than or equal to minWidth', () => {
      expect(findImage(trackMock, 300)).toEqual(imagesMock[0].url)
    })
  })

  describe('when item is album or artist object', () => {
    let albumOrArtistMock: {
      images: Image[]
    }

    beforeEach(() => {
      albumOrArtistMock = {
        images: imagesMock,
      }
    })

    test('should return image with width greater than or equal to minWidth', () => {
      expect(findImage(albumOrArtistMock, 48)).toEqual(imagesMock[0].url)
    })

    test('should return first image if no image with width greater than or equal to minWidth', () => {
      expect(findImage(albumOrArtistMock, 300)).toEqual(imagesMock[0].url)
    })
  })
})
