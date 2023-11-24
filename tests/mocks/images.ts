import { mockDeep } from 'vitest-mock-extended'

import { Image } from '@app/api/types'

export const imagesMock = mockDeep<Image[]>([
  {
    url: 'https://spotify.com/image.png',
  },
  {
    url: 'https://spotify.com/image.png',
  },
])
