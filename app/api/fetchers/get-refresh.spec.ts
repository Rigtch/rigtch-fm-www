import { mock } from 'vitest-mock-extended'

import { SecretData } from '../types'

import { getRefresh } from './get-refresh'
import { fetchApi } from './fetch-api'

vi.mock('./fetch-api')

describe('getRefresh', () => {
  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue(
      mock<SecretData>({
        accessToken: 'token',
      })
    )
  })

  test('should get secret data', async () => {
    const { accessToken } = await getRefresh()

    expect(accessToken).toBe('token')
  })
})
