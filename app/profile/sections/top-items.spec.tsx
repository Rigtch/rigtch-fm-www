import { render, screen } from '@testing-library/react'

import { TopItemsSection } from './top-items'

import { trackMock } from '@tests/mocks/track'
import { artistMock, artistNameMock } from '@tests/mocks/artist'
import { View } from '@app/types'
import { genresMock } from '@tests/mocks'

describe('TopItemsSection', () => {
  const title = 'title'
  const tracksMock = [
    trackMock,
    {
      ...trackMock,
      id: '2',
    },
    {
      ...trackMock,
      id: '3',
    },
  ]
  const artistsMock = [
    artistMock,
    {
      ...artistMock,
      id: '2',
    },
    {
      ...artistMock,
      id: '3',
    },
  ]
  const view = View.LIST

  test('should render with title', () => {
    render(<TopItemsSection title={title} items={tracksMock} view={view} />)

    expect(screen.getByText(title)).toBeInTheDocument()
  })

  test('should render with tracks', () => {
    render(<TopItemsSection title={title} items={tracksMock} view={view} />)

    expect(screen.getAllByText(trackMock.name)[0]).toBeInTheDocument()
    expect(screen.getAllByText(artistNameMock)[0]).toBeInTheDocument()
    expect(screen.getByText(1)).toBeInTheDocument()
  })

  test('should render with artists', () => {
    render(<TopItemsSection title={title} items={artistsMock} view={view} />)

    expect(screen.getAllByText(artistNameMock)[0]).toBeInTheDocument()
    expect(screen.getByText(1)).toBeInTheDocument()
  })

  test('should render with card view', () => {
    render(
      <TopItemsSection title={title} items={artistsMock} view={View.CARD} />
    )

    expect(screen.getAllByText(artistMock.name)[0]).toBeInTheDocument()
    expect(screen.getAllByText(artistNameMock)[0]).toBeInTheDocument()
    expect(screen.getAllByText(genresMock[0])[0]).toBeInTheDocument()
    expect(screen.getByText(1)).toBeInTheDocument()
  })

  test('should render with children', () => {
    const children = 'children'

    render(
      <TopItemsSection title={title} items={artistsMock} view={view}>
        {children}
      </TopItemsSection>
    )

    expect(screen.getByText(children)).toBeInTheDocument()
  })
})
