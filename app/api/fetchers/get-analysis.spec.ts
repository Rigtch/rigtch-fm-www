import { getAnalysis } from './get-analysis'
import { fetchApi } from './fetch-api'

import { analysisMock } from '@tests/mocks/analysis'

vi.mock('./fetch-api')

describe('getAnalysis', () => {
  const accessToken = 'accessToken'

  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue(analysisMock)
  })

  test('should get analysis for selected user', async () => {
    const userId = 'userId'
    const analysis = await getAnalysis(accessToken, { userId })

    expect(analysis).toEqual(analysisMock)
    expect(fetchApi).toHaveBeenCalledWith(`/users/${userId}/profile/analysis`, {
      token: accessToken,
    })
  })
})
