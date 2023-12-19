import { fetchApi } from '../fetch-api'

import { getUser } from './get-user'

import { userMock } from '@tests/mocks/user'
import { displayNameMock } from '@tests/mocks/profile'

vi.mock('../fetch-api')

describe('GetUser', () => {
  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue(userMock)
  })

  test('should get user', async () => {
    const {
      profile: { displayName },
    } = await getUser()

    expect(displayName).toEqual(displayNameMock)
  })
})
