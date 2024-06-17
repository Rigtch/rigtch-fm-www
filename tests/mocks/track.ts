import { mockDeep } from 'vitest-mock-extended'

import { artistMock } from './artist'
import { albumMock } from './album'

import { hrefMock, idMock } from '.'

import type { TrackEntity } from '@app/api/types'

export const trackNameMock = 'Track 1'

export const trackMock = mockDeep<TrackEntity>({
  id: idMock,
  name: trackNameMock,
  href: hrefMock,
  album: albumMock,
  artists: [artistMock],
})

export const tracksMock = [
  trackMock,
  {
    ...trackMock,
    id: '2',
  },
  {
    ...trackMock,
    id: '3',
  },
]
