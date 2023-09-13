import { render, screen } from '@testing-library/react'
import { Mock, describe, vi } from 'vitest'

import { LastTracksSection } from './last-tracks'

import { spotifyResponseMockFactory, trackMock } from '@tests/mocks'
import { useLastTracksQuery } from '@api/hooks'

vi.mock('@api/hooks')

describe('LastTracksSection', () => {
  beforeEach(() => {
    ;(useLastTracksQuery as Mock).mockReturnValue({
      data: spotifyResponseMockFactory([trackMock]),
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should render section', () => {
    render(<LastTracksSection />)

    expect(screen.getByText('Track 1')).toBeInTheDocument()
  })

  test('should render section without data', () => {
    ;(useLastTracksQuery as Mock).mockReturnValue({
      data: undefined,
    })

    render(<LastTracksSection />)

    expect(screen.queryByText('Track 1')).not.toBeInTheDocument()
  })
})
