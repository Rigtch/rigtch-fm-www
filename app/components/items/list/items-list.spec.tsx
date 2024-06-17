import { render } from '@testing-library/react'

import { ItemsList } from './items-list'

import { tracksMock } from '@tests/mocks/track'
import { artistEntitiesMocks } from '@tests/mocks/artist'

describe('ItemsList', () => {
  test('should match snapshot with position', () => {
    const view = render(<ItemsList items={artistEntitiesMocks} />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with position size', () => {
    const view = render(
      <ItemsList items={artistEntitiesMocks} positionSize="lg" />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with relative time', () => {
    const view = render(
      <ItemsList
        items={tracksMock.map(track => ({
          ...track,
          playedAt: '2022-01-01T00:00:00.000Z',
        }))}
      />
    )

    expect(view).toMatchSnapshot()
  })
})
