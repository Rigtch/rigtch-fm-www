import type { AppRouteHandlerFn } from 'next-auth/lib/types'

import { auth } from '../next-auth'

import { getServerUser } from './get-server-user'

vi.mock('../next-auth')

describe('getServerUser', () => {
  test('should return the server user', async () => {
    const user = { name: 'John Doe' }

    const authSpy = vi.mocked(auth).mockReturnValue({
      user,
    } as unknown as AppRouteHandlerFn)

    expect(await getServerUser()).toEqual(user)
    expect(authSpy).toHaveBeenCalled()
  })
})
