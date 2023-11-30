import { cookies } from 'next/headers'
import { render, screen } from '@testing-library/react'

import { ProfileTopGenresSection } from './top-genres'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopGenres } from '@app/api/fetchers'
import { genresMock } from '@tests/mocks'
import { TimeRange } from '@app/api/types'

vi.mock('@app/api/fetchers')
vi.mock('next/headers')

describe('ProfileTopGenresSection', () => {
  const accessTokenMock = 'accessToken'
  const timeRangeMock = TimeRange.SHORT_TERM
  const searchParamsMock = {
    time_range: timeRangeMock,
  }

  beforeEach(() => {
    vi.mocked(getTopGenres).mockResolvedValue({
      genres: genresMock,
    })
    vi.mocked(cookies, { partial: true }).mockReturnValue({
      get: () => ({
        name: ACCESS_TOKEN,
        value: accessTokenMock,
      }),
    })
  })

  test('should render with genres', async () => {
    render(
      await ProfileTopGenresSection({
        searchParams: searchParamsMock,
      })
    )

    expect(screen.getAllByText(genresMock[0])[0]).toBeInTheDocument()
    expect(getTopGenres).toHaveBeenCalledWith(
      accessTokenMock,
      timeRangeMock,
      undefined
    )
  })

  test('should render with limit', async () => {
    const limit = 10

    render(
      await ProfileTopGenresSection({
        searchParams: searchParamsMock,
        limit: limit,
      })
    )

    expect(getTopGenres).toHaveBeenCalledWith(
      accessTokenMock,
      timeRangeMock,
      limit
    )
  })
})
