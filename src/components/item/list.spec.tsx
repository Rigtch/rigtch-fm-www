import { DeepMockProxy, mock, mockDeep } from 'vitest-mock-extended'
import { render, screen } from '@testing-library/react'

import { ItemsList } from './list'

import { Artist } from '@api/types'

describe('ItemsList', () => {
  const artistName = 'artist 1'
  const genre = 'genre 1'
  const id = 'id'
  const images = [
    {
      url: '/url',
    },
  ]

  let artistMock: DeepMockProxy<Artist>

  beforeEach(() => {
    artistMock = mockDeep<Artist>({
      id,
      name: artistName,
      images,
      genres: [genre],
    })
  })

  test('should render without items', () => {
    render(<ItemsList items={[artistMock]} />)

    expect(screen.getByText(artistName)).toBeInTheDocument()
  })

  test('should render with `isTop`', () => {
    render(
      <ItemsList
        items={[
          artistMock,
          ...Array.from({ length: 4 }, (_, index) =>
            mock<Artist>({
              id: index + '',
              name: 'name',
              images,
            })
          ),
        ]}
        isTop
      />
    )

    expect(screen.getByText(artistName)).toBeInTheDocument()
    expect(screen.getByText(genre)).toBeInTheDocument()
  })
})
