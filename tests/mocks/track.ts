import { mock } from 'vitest-mock-extended'

import { artistMock } from './artist'
import { albumMock } from './album'

import { Track } from '@api/types'

export const trackMock = mock<Track>({
  name: 'Track 1',
  href: 'https://spotify.com',
  album: albumMock,
  artists: [artistMock],
})
