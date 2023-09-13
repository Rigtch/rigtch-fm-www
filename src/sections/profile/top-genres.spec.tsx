import { render, screen } from '@testing-library/react'
import { Mock, describe, vi } from 'vitest'

import { TopGenresSection } from './top-genres'

import { useTopGenresQuery } from '@api/hooks'

vi.mock('@api/hooks')

describe('TopGenresSection', () => {
  beforeEach(() => {
    ;(useTopGenresQuery as Mock).mockReturnValue({
      data: {
        genres: ['pop', 'rock', 'rap'],
      },
      refetch: vi.fn(),
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should render section', () => {
    render(<TopGenresSection />)

    expect(screen.getByText('pop')).toBeInTheDocument()
  })

  test('should render section without data', () => {
    ;(useTopGenresQuery as Mock).mockReturnValue({
      data: undefined,
      refetch: vi.fn(),
    })

    render(<TopGenresSection />)

    expect(screen.queryByText('pop')).not.toBeInTheDocument()
  })
})
