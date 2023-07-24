import { mock } from 'vitest-mock-extended'

import { Profile } from '@api/types'

export const profileMock = mock<Profile>({
  displayName: 'John Doe',
  followers: 100,
  href: 'https://spotify.com',
  images: [
    {},
    {
      url: 'https://spotify.com/image.png',
    },
  ],
})
