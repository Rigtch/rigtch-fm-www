import { Mock, describe, test, vi } from 'vitest'

import { putPlayerPause } from './put-player-pause'
import { fetchApi } from './fetch-api'

vi.mock('./fetch-api')

describe('putPlayerPause', () => {
  beforeEach(() => {
    ;(fetchApi as Mock).mockResolvedValue({
      success: true,
    })
  })

  test('should pause player', async () => {
    const { success } = await putPlayerPause()

    expect(success).toBeTruthy()
  })
})
