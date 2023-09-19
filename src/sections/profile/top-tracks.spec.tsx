import { render, screen } from '@testing-library/react'
import { Mock, describe, vi } from 'vitest'

import { TopTracksSection } from './top-tracks'

import { spotifyResponseMockFactory, trackMock } from '@tests/mocks'
import { useTopTracksQuery } from '@api/hooks'

vi.mock('@api/hooks')

describe('TopTracksSection', () => {
  beforeEach(() => {
    ;(useTopTracksQuery as Mock).mockReturnValue({
      data: spotifyResponseMockFactory([trackMock]),
      refetch: vi.fn(),
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should render section', () => {
    render(<TopTracksSection />)

    expect(screen.getByText('Track 1')).toBeInTheDocument()
  })

  test('should render section without data', () => {
    ;(useTopTracksQuery as Mock).mockReturnValue({
      data: undefined,
      isRefetching: true,
      refetch: vi.fn(),
    })

    render(<TopTracksSection />)

    expect(screen.queryByText('Track 1')).not.toBeInTheDocument()
  })
})
