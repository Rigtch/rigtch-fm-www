import { fetchApi } from '../fetch-api'

import { getUserProfileAnalysis } from './get-user-profile-analysis'

import { analysisMock } from '@tests/mocks/analysis'

vi.mock('../fetch-api')

describe('getUserProfileAnalysis', () => {
  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue(analysisMock)
  })

  test('should get user profile analysis', async () => {
    const analysis = await getUserProfileAnalysis()

    expect(analysis).toEqual(analysisMock)
  })
})
