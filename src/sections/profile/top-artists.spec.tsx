import { render, screen } from '@testing-library/react'
import { Mock, describe, vi } from 'vitest'

import { TopArtistsSection } from './top-artists'

import { artistMock, spotifyResponseMockFactory } from '@tests/mocks'
import { useTopArtistsQuery } from '@api/hooks'

vi.mock('@api/hooks')

describe('TopArtistsSection', () => {
  beforeEach(() => {
    ;(useTopArtistsQuery as Mock).mockReturnValue({
      data: spotifyResponseMockFactory([artistMock]),
      refetch: vi.fn(),
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should render section', () => {
    render(<TopArtistsSection />)

    expect(screen.getByText('Artist 1')).toBeInTheDocument()
  })

  test('should render section without data', () => {
    ;(useTopArtistsQuery as Mock).mockReturnValue({
      data: undefined,
      refetch: vi.fn(),
    })

    render(<TopArtistsSection />)

    expect(screen.queryByText('Artist 1')).not.toBeInTheDocument()
  })
})
