import { mock } from 'vitest-mock-extended'

import { Album } from '@app/api/types'

export const albumMock = mock<Album>({
  name: 'Album 1',
  images: [{ url: 'https://spotify.com/image1.png' }],
})
