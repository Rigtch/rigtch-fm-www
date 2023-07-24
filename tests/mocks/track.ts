import { mock } from 'vitest-mock-extended'

import { artistMock } from './artist'

import { Track } from '@api/types'

export const trackMock = mock<Track>({
  name: 'Track 1',
  href: 'https://spotify.com',
  artists: [artistMock],
})
