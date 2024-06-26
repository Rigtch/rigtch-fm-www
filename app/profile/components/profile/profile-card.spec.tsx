import { render } from '@testing-library/react'

import { ProfileCard } from './profile-card'

describe('ProfileCard', () => {
  const props = {
    displayName: 'Mnigos',
    followers: 420,
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
