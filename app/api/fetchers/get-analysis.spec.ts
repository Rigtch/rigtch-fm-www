import { getAnalysis } from './get-analysis'
import { fetchApi } from './fetch-api'

import { analysisMock } from '@tests/mocks/analysis'

vi.mock('./fetch-api')

describe('getAnalysis', () => {
  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue(analysisMock)
  })

  test('should get analysis', async () => {
    const analysis = await getAnalysis()

    expect(analysis).toEqual(analysisMock)
  })
})
