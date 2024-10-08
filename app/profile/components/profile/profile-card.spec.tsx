import { render } from '@testing-library/react'
import type { ComponentProps } from 'react'

import { ProfileCard } from './profile-card'

vi.mock('@app/api/hooks', () => ({
  useToggleFollowing: () => ({
    toggle: vi.fn(),
  }),
}))

describe('ProfileCard', () => {
  const props: ComponentProps<typeof ProfileCard> = {
    displayName: 'Mnigos',
    followersCount: 420,
    followingCount: 69,
    id: '1',
    currentUserId: '1',
    isFollowingUser: true,
    isFollowingYou: true,
    isAuthenticated: true,
    href: 'https://open.spotify.com/user/moneyigos',
    images: [
      {
        height: 300,
        width: 300,
        url: 'https://i.scdn.co/image/ab6775700000ee8503aef823b019723735326905',
      },
    ],
  }

  test('should match snapshot', () => {
    const view = render(<ProfileCard {...props} />)

    expect(view).toMatchSnapshot()
  })
})
