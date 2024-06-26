import { mockDeep } from 'vitest-mock-extended'

import { imagesMock } from './images'

import { hrefMock } from '.'

import type { AlbumEntity } from '@app/api/types'

export const albumNameMock = 'Album 1'

export const albumMock = mockDeep<AlbumEntity>({
  name: albumNameMock,
  href: hrefMock,
  images: imagesMock,
})
