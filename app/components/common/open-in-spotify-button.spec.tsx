import { render } from '@testing-library/react'

import { OpenInSpotifyButton } from './open-in-spotify-button'

describe('OpenInSpotifyButton', () => {
  const href = 'https://spotify.com'

  test('should match snapshot', () => {
    const view = render(<OpenInSpotifyButton href={href} />)

    expect(view).toMatchSnapshot()
  })
})
