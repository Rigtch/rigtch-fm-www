import { putPlayerResume } from './put-player-resume'
import { fetchApi } from './fetch-api'

vi.mock('./fetch-api')

describe('putPlayerResume', () => {
  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue({
      success: true,
    })
  })

  test('should resume player', async () => {
    const { success } = await putPlayerResume()

    expect(success).toBeTruthy()
  })
})
