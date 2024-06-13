import { render } from '@testing-library/react'

import { ItemArtists } from './artists'

import {
  artistEntitiesMocks,
  artistEntityMock,
  artistMock,
} from '@tests/mocks/artist'

describe('ItemArtists', () => {
  test('should match snapshot with single artist', () => {
    const view = render(<ItemArtists artists={[artistMock]} />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with multiple artists', () => {
    const view = render(<ItemArtists artists={[artistMock, artistMock]} />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with artist entity', () => {
    const view = render(<ItemArtists artists={[artistEntityMock]} />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with multiple artist entities', () => {
    const view = render(<ItemArtists artists={artistEntitiesMocks} />)

    expect(view).toMatchSnapshot()
  })
})
