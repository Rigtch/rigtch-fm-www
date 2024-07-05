import { render } from '@testing-library/react'

import { SpotifyLink } from './spotify-link'

describe('SpotifyLink', () => {
  const href = 'https://spotify.com'

  test('should match snapshot', () => {
    const view = render(<SpotifyLink href={href} />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with skeleton', () => {
    const view = render(<SpotifyLink href={href} skeleton />)

    expect(view).toMatchSnapshot()
  })
})
