import { putPlayerResume } from './put-player-resume'
import { fetchApi } from './fetch-api'

vi.mock('./fetch-api')

describe('putPlayerResume', () => {
  const accessToken = 'accessToken'
  const userId = 'userId'

  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue({
      success: true,
    })
  })

  test('should resume player', async () => {
    const { success } = await putPlayerResume(accessToken, { userId })

    expect(success).toBeTruthy()
  })
})
