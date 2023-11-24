import { getProfile } from './get-profile'
import { fetchApi } from './fetch-api'

import { displayNameMock, profileMock } from '@tests/mocks/profile'

vi.mock('./fetch-api')

describe('getProfile', () => {
  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue(profileMock)
  })

  test('should get profile', async () => {
    const { displayName } = await getProfile()

    expect(displayName).toEqual(displayNameMock)
  })
})
