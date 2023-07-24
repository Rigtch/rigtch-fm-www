import { render, screen } from '@testing-library/react'
import { Mock, describe, vi } from 'vitest'

import { TopGenresSection } from './top-genres'

import { useTopGenresQuery } from '@hooks/api'

vi.mock('@hooks/api')

describe('TopGenresSection', () => {
  beforeEach(() => {
    ;(useTopGenresQuery as Mock).mockReturnValue({
      data: {
        genres: ['pop', 'rock', 'rap'],
      },
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
    })

    render(<TopGenresSection />)

    expect(screen.queryByText('pop')).not.toBeInTheDocument()
  })
})
