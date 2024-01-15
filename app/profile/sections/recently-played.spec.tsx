import { cookies } from 'next/headers'
import { render, screen } from '@testing-library/react'

import { ProfileRecentlyPlayedSection } from './recently-played'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getRecentlyPlayed } from '@app/api/fetchers'
import { spotifyResponseWithCursorsMockFactory } from '@tests/mocks/spotify-response'
import { artistNameMock } from '@tests/mocks/artist'
import { trackNameMock, tracksMock } from '@tests/mocks/track'

vi.mock('@app/api/fetchers')
vi.mock('next/headers')

describe('ProfileRecentlyPlayedSection', () => {
  const accessTokenMock = 'accessToken'

  beforeEach(() => {
    vi.mocked(getRecentlyPlayed).mockResolvedValue(
      spotifyResponseWithCursorsMockFactory(tracksMock)
    )
    vi.mocked(cookies, { partial: true }).mockReturnValue({
      get: () => ({
        name: ACCESS_TOKEN,
        value: accessTokenMock,
      }),
    })
  })

  test('should render with items', async () => {
    render(await ProfileRecentlyPlayedSection({}))

    expect(screen.getAllByText(trackNameMock)[0]).toBeInTheDocument()
    expect(screen.getAllByText(artistNameMock)[0]).toBeInTheDocument()
    expect(getRecentlyPlayed).toHaveBeenCalledWith(accessTokenMock, {})
  })

  test('should render with limit', async () => {
    const limit = 10

    render(
      await ProfileRecentlyPlayedSection({
        limit,
      })
    )

    expect(getRecentlyPlayed).toHaveBeenCalledWith(accessTokenMock, {
      limit: 10,
    })
  })

  test('should render with userId', async () => {
    const userId = 'userId'

    render(
      await ProfileRecentlyPlayedSection({
        userId,
      })
    )

    expect(getRecentlyPlayed).toHaveBeenCalledWith(accessTokenMock, {
      userId,
    })
  })

  test('should render with children', async () => {
    const children = 'children'

    render(
      await ProfileRecentlyPlayedSection({
        children,
      })
    )

    expect(screen.getByText(children)).toBeInTheDocument()
  })
})
