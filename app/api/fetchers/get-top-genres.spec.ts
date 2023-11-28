import { getTopGenres } from './get-top-genres'
import { fetchApi } from './fetch-api'

vi.mock('./fetch-api')

describe('getTopGenres', () => {
  const genresMock = ['pop', 'rock', 'rap']

  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue({
      genres: genresMock,
    })
  })

  test('should get top genres', async () => {
    const { genres } = await getTopGenres()

    expect(genres).toEqual(genresMock)
  })
})
