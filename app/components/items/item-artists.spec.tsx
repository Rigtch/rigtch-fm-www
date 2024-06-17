import { render } from '@testing-library/react'

import { ItemArtists } from './item-artists'

import { artistEntitiesMocks, artistEntityMock } from '@tests/mocks/artist'

describe('ItemArtists', () => {
  test('should match snapshot with artist entity', () => {
    const view = render(<ItemArtists artists={[artistEntityMock]} />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with multiple artist entities', () => {
    const view = render(<ItemArtists artists={artistEntitiesMocks} />)

    expect(view).toMatchSnapshot()
  })
})
