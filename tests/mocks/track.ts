import { mockDeep } from 'vitest-mock-extended'

import { artistMock } from './artist'
import { albumMock } from './album'

import { hrefMock, idMock } from '.'

import { Track } from '@app/api/types'

export const trackNameMock = 'Track 1'

export const trackMock = mockDeep<Track>({
  id: idMock,
  name: trackNameMock,
  href: hrefMock,
  album: albumMock,
  artists: [artistMock],
})
