import { render } from '@testing-library/react'

import { ItemCard } from './item-card'

import { albumMock } from '@tests/mocks/album'
import { artistMock } from '@tests/mocks/artist'
import { trackMock } from '@tests/mocks/track'

describe('ItemCard', () => {
  test('should match snapshot as album', () => {
    const view = render(<ItemCard {...albumMock} />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as track', () => {
    const view = render(<ItemCard {...trackMock} />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as artist', () => {
    const view = render(<ItemCard {...artistMock} />)

    expect(view).toMatchSnapshot()
  })
})
