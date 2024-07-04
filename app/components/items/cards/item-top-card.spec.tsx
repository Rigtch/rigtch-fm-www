import { render } from '@testing-library/react'

import { ItemTopCard } from './item-top-card'

import { trackMock } from '@tests/mocks/track'
import { albumMock } from '@tests/mocks/album'
import { artistMock } from '@tests/mocks/artist'

describe('ItemTopCard', () => {
  test('should match snapshot as track', () => {
    const view = render(<ItemTopCard {...trackMock} />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as album', () => {
    const view = render(<ItemTopCard {...albumMock} />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as artist', () => {
    const view = render(<ItemTopCard {...artistMock} />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as top 2', () => {
    const view = render(<ItemTopCard {...trackMock} position={2} />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as top 3', () => {
    const view = render(<ItemTopCard {...trackMock} position={3} />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as track with play time', () => {
    const view = render(
      <ItemTopCard {...trackMock} playTime={1000} maxPlayTime={2000} />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as track with play time and plays', () => {
    const view = render(
      <ItemTopCard {...trackMock} playTime={1000} maxPlayTime={2000} />
    )

    expect(view).toMatchSnapshot()
  })
})
