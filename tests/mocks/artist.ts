import { mock } from 'vitest-mock-extended'

import { Artist } from '@app/api/types'

export const artistMock = mock<Artist>({
  name: 'Artist 1',
  images: [{ url: 'https://spotify.com/image1.png' }],
  genres: ['pop', 'rock', 'rap'],
  href: 'https://spotify.com',
})
