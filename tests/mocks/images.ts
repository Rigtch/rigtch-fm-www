import { mockDeep } from 'vitest-mock-extended'

import { Image } from '@app/api/types'

export const imagesMock = mockDeep<Image[]>([
  {
    url: 'https://spotify.com/image.png',
    height: 100,
    width: 100,
  },
  {
    url: 'https://spotify.com/image.png',
    height: 200,
    width: 200,
  },
])
