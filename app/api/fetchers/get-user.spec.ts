import { getUser } from './get-user'
import { fetchApi } from './fetch-api'

import { displayNameMock } from '@tests/mocks/profile'
import { userMock } from '@tests/mocks/user'

vi.mock('./fetch-api')

describe('getProfile', () => {
  const accessToken = 'accessToken'

  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue(userMock)
  })

  test('should get user', async () => {
    const {
      profile: { displayName },
    } = await getUser(accessToken)

    expect(displayName).toEqual(displayNameMock)
    expect(fetchApi).toHaveBeenCalledWith('/auth/profile', {
      token: accessToken,
    })
  })

  test('should get selected user', async () => {
    const userId = 'userId'
    const {
      profile: { displayName },
    } = await getUser(accessToken, { userId })

    expect(displayName).toEqual(displayNameMock)
    expect(fetchApi).toHaveBeenCalledWith(`/users/${userId}`, {
      token: accessToken,
    })
  })
})
