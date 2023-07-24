import { mock } from 'vitest-mock-extended'

import { Artist } from '@api/types'

export const artistMock = mock<Artist>({
  name: 'Artist 1',
})
