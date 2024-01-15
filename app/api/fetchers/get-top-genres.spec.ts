import { TimeRange } from '../types'

import { getTopGenres } from './get-top-genres'
import { fetchApi } from './fetch-api'

import { genresMock } from '@tests/mocks'

vi.mock('./fetch-api')

describe('getTopGenres', () => {
  const accessToken = 'accessToken'
  const userId = 'userId'

  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue({
      genres: genresMock,
    })
  })

  test('should get top genres for selected user', async () => {
    const { genres } = await getTopGenres(accessToken, { userId })

    expect(genres).toEqual(genresMock)
    expect(fetchApi).toHaveBeenCalledWith(
      `/users/${userId}/profile/top/genres?timeRange=long_term&limit=10`,
      {
        token: accessToken,
      }
    )
  })

  test('should get top genres with params', async () => {
    const limit = 50
    const timeRange = TimeRange.SHORT_TERM
    const { genres } = await getTopGenres(accessToken, {
      limit,
      userId,
      timeRange,
    })

    expect(genres).toEqual(genresMock)
    expect(fetchApi).toHaveBeenCalledWith(
      `/users/${userId}/profile/top/genres?timeRange=${timeRange}&limit=${limit}`,
      {
        token: accessToken,
      }
    )
  })
})
