import { render, screen } from '@testing-library/react'

import { ItemsSection } from './items'

import { trackMock } from '@tests/mocks/track'
import { artistMock, artistNameMock } from '@tests/mocks/artist'

describe('ItemsSection', () => {
  const title = 'title'

  test('should render with title', () => {
    render(<ItemsSection title={title} items={[]} />)

    expect(screen.getByText(title)).toBeInTheDocument()
  })

  test('should render with tracks', () => {
    render(<ItemsSection title={title} items={[trackMock]} />)

    expect(screen.getByText(trackMock.name)).toBeInTheDocument()
    expect(screen.getByText(artistNameMock)).toBeInTheDocument()
    expect(screen.getByText(1)).toBeInTheDocument()
  })

  test('should render with artists', () => {
    render(<ItemsSection title={title} items={[artistMock]} />)

    expect(screen.getByText(artistNameMock)).toBeInTheDocument()
    expect(screen.getByText(1)).toBeInTheDocument()
  })

  test('should render without position', () => {
    render(<ItemsSection title={title} items={[artistMock]} withoutPosition />)

    expect(screen.getByText(artistNameMock)).toBeInTheDocument()
    expect(screen.queryByText(1)).not.toBeInTheDocument()
  })

  test('should render with children', () => {
    const children = 'children'

    render(
      <ItemsSection title={title} items={[artistMock]}>
        {children}
      </ItemsSection>
    )

    expect(screen.getByText(children)).toBeInTheDocument()
  })
})
