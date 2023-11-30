import { cookies } from 'next/headers'
import { render, screen } from '@testing-library/react'

import { ProfileRecentlyPlayedSection } from './recently-played'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getLastTracks } from '@app/api/fetchers'
import { spotifyResponseWithCursorsMockFactory } from '@tests/mocks/spotify-response'
import { artistNameMock } from '@tests/mocks/artist'
import { trackNameMock, tracksMock } from '@tests/mocks/track'

vi.mock('@app/api/fetchers')
vi.mock('next/headers')

describe('ProfileRecentlyPlayedSection', () => {
  const accessTokenMock = 'accessToken'

  beforeEach(() => {
    vi.mocked(getLastTracks).mockResolvedValue(
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
    expect(getLastTracks).toHaveBeenCalledWith(accessTokenMock, undefined)
  })

  test('should render with limit', async () => {
    const limit = 10

    render(
      await ProfileRecentlyPlayedSection({
        limit,
      })
    )

    expect(getLastTracks).toHaveBeenCalledWith(accessTokenMock, limit)
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
