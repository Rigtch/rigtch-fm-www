import { render } from '@testing-library/react'

import { SpotifyLink } from './spotify-link'

describe('OpenInSpotifyButton', () => {
  const href = 'https://spotify.com'

  test('should match snapshot', () => {
    const view = render(<SpotifyLink href={href} />)

    expect(view).toMatchSnapshot()
  })
})
