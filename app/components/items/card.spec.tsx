import { render } from '@testing-library/react'

import { ItemCard } from './card'

import { albumMock } from '@tests/mocks/album'
import { artistMock } from '@tests/mocks/artist'
import { trackMock } from '@tests/mocks/track'

describe('ItemCard', () => {
  test('should match snapshot as album', () => {
    const view = render(
      <ItemCard
        id={albumMock.id}
        name={albumMock.name}
        href={albumMock.href}
        releaseDate={albumMock.releaseDate}
        images={albumMock.images}
        albumType={albumMock.albumType}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as track', () => {
    const view = render(
      <ItemCard
        id={trackMock.id}
        name={trackMock.name}
        href={trackMock.href}
        artists={trackMock.artists}
        album={trackMock.album}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as artist', () => {
    const view = render(
      <ItemCard
        id={artistMock.id}
        name={artistMock.name}
        href={artistMock.href}
        images={artistMock.images}
      />
    )

    expect(view).toMatchSnapshot()
  })
})
