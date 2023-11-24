import { render, screen } from '@testing-library/react'

import { TopItemCard } from './top-card'

describe('TopItemCard', () => {
  const name = 'name'
  const image = '/image'

  test('should render with props', () => {
    render(<TopItemCard name={name} image={image} />)

    expect(screen.getByText(name)).toBeInTheDocument()
  })

  test('should render with `position`', () => {
    render(<TopItemCard name={name} image={image} position={1} />)

    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('should render with `genres`', () => {
    const genre = 'genre'

    render(<TopItemCard name={name} image={image} genres={[genre]} />)

    expect(screen.getByText(genre)).toBeInTheDocument()
  })

  test('should render with `artists`', () => {
    const artistName = 'artist'

    render(
      <TopItemCard
        name={name}
        image={image}
        artists={[{ name: artistName, href: '/artist' }]}
      />
    )

    expect(screen.getByText(artistName)).toBeInTheDocument()
  })
})
