import { render } from '@testing-library/react'

import { ItemsList } from './items-list'

import { tracksMock } from '@tests/mocks/track'
import { artistEntitiesMocks } from '@tests/mocks/artist'

import '@tests/mocks/window'

describe('ItemsList', () => {
  test('should match snapshot with position', () => {
    const view = render(<ItemsList items={artistEntitiesMocks} />)

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with position and top', () => {
    const view = render(<ItemsList isTop items={artistEntitiesMocks} />)

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

  test('should match snapshot with plays', () => {
    const view = render(
      <ItemsList
        items={tracksMock.map(track => ({
          ...track,
          plays: 100,
          maxPlays: 100,
        }))}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with plays and top', () => {
    const view = render(
      <ItemsList
        isTop
        items={tracksMock.map(track => ({
          ...track,
          plays: 100,
          maxPlays: 100,
        }))}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with playtime', () => {
    const view = render(
      <ItemsList
        items={tracksMock.map(track => ({
          ...track,
          playtime: 1000 * 60 * 60 * 2,
          maxPlaytime: 1000 * 60 * 60 * 2,
        }))}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot with playtime and top', () => {
    const view = render(
      <ItemsList
        isTop
        items={tracksMock.map(track => ({
          ...track,
          playtime: 1000 * 60 * 60 * 2,
          maxPlaytime: 1000 * 60 * 60 * 2,
        }))}
      />
    )

    expect(view).toMatchSnapshot()
  })
})
