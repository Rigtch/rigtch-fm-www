import { getTopGenres } from './get-top-genres'
import { fetchApi } from './fetch-api'

vi.mock('./fetch-api')

describe('getTopGenres', () => {
  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue({
      genres: ['pop', 'rock', 'rap'],
    })
  })

  test('should get top genres', async () => {
    const { genres } = await getTopGenres()

    expect(genres).toEqual(['pop', 'rock', 'rap'])
  })
})
