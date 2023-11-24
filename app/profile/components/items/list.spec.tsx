import { mock } from 'vitest-mock-extended'
import { render, screen } from '@testing-library/react'

import { ItemsList } from './list'

import { Artist } from '@app/api/types'
import { artistMock, artistNameMock } from '@tests/mocks/artist'
import { imagesMock } from '@tests/mocks/images'
import { genresMock } from '@tests/mocks'

describe('ItemsList', () => {
  test('should render without items', () => {
    render(<ItemsList items={[artistMock]} />)

    expect(screen.getByText(artistNameMock)).toBeInTheDocument()
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
              images: imagesMock,
            })
          ),
        ]}
        isTop
      />
    )

    expect(screen.getByText(artistNameMock)).toBeInTheDocument()
    expect(screen.getByText(genresMock[0])).toBeInTheDocument()
  })
})
