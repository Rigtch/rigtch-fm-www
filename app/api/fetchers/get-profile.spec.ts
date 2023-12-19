import { getProfile } from './get-profile'
import { fetchApi } from './fetch-api'

import { displayNameMock } from '@tests/mocks/profile'
import { userMock } from '@tests/mocks/user'

vi.mock('./fetch-api')

describe('getProfile', () => {
  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue(userMock)
  })

  test('should get profile', async () => {
    const {
      profile: { displayName },
    } = await getProfile()

    expect(displayName).toEqual(displayNameMock)
  })
})
