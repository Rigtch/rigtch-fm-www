import { cookies } from 'next/headers'
import { render, screen } from '@testing-library/react'

import { ProfileTopTracksSection } from './top-tracks'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopTracks } from '@app/api/fetchers'
import { TimeRange } from '@app/api/types'
import { View } from '@app/types'
import { spotifyResponseWithOffsetMockFactory } from '@tests/mocks/spotify-response'
import { artistNameMock } from '@tests/mocks/artist'
import { trackNameMock, tracksMock } from '@tests/mocks/track'

vi.mock('@app/api/fetchers')
vi.mock('next/headers')

describe('ProfileTopTracksSection', () => {
  const accessTokenMock = 'accessToken'
  const timeRangeMock = TimeRange.SHORT_TERM
  const searchParamsMock = {
    time_range: timeRangeMock,
    view: View.LIST,
  }

  beforeEach(() => {
    vi.mocked(getTopTracks).mockResolvedValue(
      spotifyResponseWithOffsetMockFactory(tracksMock)
    )
    vi.mocked(cookies, { partial: true }).mockReturnValue({
      get: () => ({
        name: ACCESS_TOKEN,
        value: accessTokenMock,
      }),
    })
  })

  test('should render with items', async () => {
    render(
      await ProfileTopTracksSection({
        searchParams: searchParamsMock,
      })
    )

    expect(screen.getAllByText(trackNameMock)[0]).toBeInTheDocument()
    expect(screen.getByText(1)).toBeInTheDocument()
    expect(screen.getAllByText(artistNameMock)[0]).toBeInTheDocument()
    expect(getTopTracks).toHaveBeenCalledWith(accessTokenMock, {
      timeRange: timeRangeMock,
    })
  })

  test('should render with limit', async () => {
    const limit = 10

    render(
      await ProfileTopTracksSection({
        searchParams: searchParamsMock,
        limit: limit,
      })
    )

    expect(getTopTracks).toHaveBeenCalledWith(accessTokenMock, {
      limit,
      timeRange: timeRangeMock,
    })
  })

  test('should render with userId', async () => {
    const userId = 'userId'

    render(
      await ProfileTopTracksSection({
        searchParams: searchParamsMock,
        userId,
      })
    )

    expect(getTopTracks).toHaveBeenCalledWith(accessTokenMock, {
      userId,
      timeRange: timeRangeMock,
    })
  })

  test('should render with children', async () => {
    const children = 'children'

    render(
      await ProfileTopTracksSection({
        searchParams: searchParamsMock,
        children,
      })
    )

    expect(screen.getByText(children)).toBeInTheDocument()
  })
})
