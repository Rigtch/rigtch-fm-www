import { mockDeep } from 'vitest-mock-extended'

import { imagesMock } from './images'

import { genresMock, hrefMock, idMock } from '.'

import { Artist } from '@app/api/types'

export const artistNameMock = 'Artist 1'

export const artistMock = mockDeep<Artist>({
  id: idMock,
  name: artistNameMock,
  images: imagesMock,
  genres: genresMock,
  href: hrefMock,
})

export const artistsMock = [
  artistMock,
  {
    ...artistMock,
    id: '2',
  },
  {
    ...artistMock,
    id: '3',
  },
]
