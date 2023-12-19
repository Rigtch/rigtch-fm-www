import { fetchApi } from '../fetch-api'

import { getUserProfileTopGenres } from './get-user-profile-top-genres'

import { genresMock } from '@tests/mocks'

vi.mock('../fetch-api')

describe('GetUserProfileTopGenres', () => {
  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue({
      genres: genresMock,
    })
  })

  test('should get user profile top genres', async () => {
    const { genres } = await getUserProfileTopGenres()

    expect(genres).toEqual(genresMock)
  })
})
