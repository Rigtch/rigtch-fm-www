import { GET } from './route'

import { handleSignOut } from '@app/auth/actions'

vi.mock('@app/auth/actions')

describe('GET /api/auth/disconnect', () => {
  test('should call handleSignOut', async () => {
    vi.mocked(handleSignOut).mockResolvedValue(undefined)

    await GET()

    expect(handleSignOut).toHaveBeenCalled()
  })
})
