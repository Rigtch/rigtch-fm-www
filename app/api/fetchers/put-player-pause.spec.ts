import { putPlayerPause } from './put-player-pause'
import { fetchApi } from './fetch-api'

vi.mock('./fetch-api')

describe('putPlayerPause', () => {
  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue({
      success: true,
    })
  })

  test('should pause player', async () => {
    const { success } = await putPlayerPause()

    expect(success).toBeTruthy()
  })
})
