import { mockDeep } from 'vitest-mock-extended'

import { imagesMock } from './images'

import { genresMock, hrefMock, idMock } from '.'

import type { Artist, ArtistEntity } from '@app/api/types'

export const artistNameMock = 'Darkthrone'

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
    name: 'Mayhem',
    id: '2',
  },
  {
    ...artistMock,
    id: '3',
  },
  {
    ...artistMock,
    id: '4',
  },
]

export const artistEntityMock = mockDeep<ArtistEntity>({
  ...artistMock,
  externalId: idMock,
})

export const artistEntitiesMocks = [
  artistEntityMock,
  {
    ...artistEntityMock,
    id: '2',
    externalId: '2',
  },
  {
    ...artistEntityMock,
    id: '3',
    externalId: '3',
  },
  {
    ...artistEntityMock,
    id: '4',
    externalId: '4',
  },
]
