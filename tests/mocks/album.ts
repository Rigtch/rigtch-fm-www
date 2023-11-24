import { mock } from 'vitest-mock-extended'

import { imagesMock } from './images'

import { Album } from '@app/api/types'

export const albumNameMock = 'Album 1'

export const albumMock = mock<Album>({
  name: albumNameMock,
  images: imagesMock,
})
