import { render, screen } from '@testing-library/react'
import { describe } from 'vitest'

import { ElementCard } from './card'

import { albumMock, artistMock } from '@tests/mocks'

describe('ElementCard', () => {
  const position = 1
  const name = 'Element 1'
  const image = 'image'
  const href = 'href'
  const album = albumMock
  const artists = [artistMock]
  const playedAt = new Date(Date.now() - 1000 * 60 * 60).toISOString()
  const genres = ['pop', 'rock', 'rap']

  test('should render component with required props', () => {
    render(<ElementCard name={name} image={image} href={href} />)

    expect(screen.getByText('Element 1')).toBeInTheDocument()
  })

  test('should render with artists', () => {
    render(
      <ElementCard name={name} image={image} href={href} artists={artists} />
    )

    expect(screen.getByText('Element 1')).toBeInTheDocument()
    expect(screen.getByText('Artist 1')).toBeInTheDocument()
  })

  test('should render with position', () => {
    render(
      <ElementCard name={name} image={image} href={href} position={position} />
    )

    expect(screen.getByText('Element 1')).toBeInTheDocument()
    expect(screen.getByText(position)).toBeInTheDocument()
  })

  test('should render with playedAt', () => {
    render(
      <ElementCard name={name} image={image} href={href} playedAt={playedAt} />
    )

    expect(screen.getByText('Element 1')).toBeInTheDocument()
    expect(screen.getByText('1 hour ago')).toBeInTheDocument()
  })

  test('should render with showGenres prop', () => {
    render(
      <ElementCard
        name={name}
        image={image}
        href={href}
        album={album}
        artists={artists}
        genres={genres}
        showGenres
      />
    )

    expect(screen.getByText('Element 1')).toBeInTheDocument()
    expect(screen.getByText('Artist 1')).toBeInTheDocument()
    expect(screen.getByText(genres[0])).toBeInTheDocument()
  })
})
