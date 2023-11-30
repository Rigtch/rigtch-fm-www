import { cookies } from 'next/headers'
import { render, screen } from '@testing-library/react'

import { ProfileTopArtistsSection } from './top-artists'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopArtists } from '@app/api/fetchers'
import { genresMock } from '@tests/mocks'
import { TimeRange } from '@app/api/types'
import { View } from '@app/types'
import { spotifyResponseWithOffsetMockFactory } from '@tests/mocks/spotify-response'
import { artistNameMock, artistsMock } from '@tests/mocks/artist'

vi.mock('@app/api/fetchers')
vi.mock('next/headers')

describe('ProfileTopArtistsSection', () => {
  const accessTokenMock = 'accessToken'
  const timeRangeMock = TimeRange.SHORT_TERM
  const searchParamsMock = {
    time_range: timeRangeMock,
    view: View.LIST,
  }

  beforeEach(() => {
    vi.mocked(getTopArtists).mockResolvedValue(
      spotifyResponseWithOffsetMockFactory(artistsMock)
    )
    vi.mocked(cookies, { partial: true }).mockReturnValue({
      get: () => ({
        name: ACCESS_TOKEN,
        value: accessTokenMock,
      }),
    })
  })

  test('should render with genres', async () => {
    render(
      await ProfileTopArtistsSection({
        searchParams: searchParamsMock,
      })
    )

    expect(screen.getAllByText(artistNameMock)[0]).toBeInTheDocument()
    expect(getTopArtists).toHaveBeenCalledWith(
      accessTokenMock,
      timeRangeMock,
      undefined
    )
  })

  test('should render with limit', async () => {
    const limit = 10

    render(
      await ProfileTopArtistsSection({
        searchParams: searchParamsMock,
        limit: limit,
      })
    )

    expect(getTopArtists).toHaveBeenCalledWith(
      accessTokenMock,
      timeRangeMock,
      limit
    )
  })

  test('should render with card view', async () => {
    searchParamsMock.view = View.CARD

    render(
      await ProfileTopArtistsSection({
        searchParams: searchParamsMock,
      })
    )

    expect(screen.getAllByText(genresMock[0])[0]).toBeInTheDocument()
  })

  test('should render with children', async () => {
    const children = 'children'

    render(
      await ProfileTopArtistsSection({
        searchParams: searchParamsMock,
        children,
      })
    )

    expect(screen.getByText(children)).toBeInTheDocument()
  })
})
