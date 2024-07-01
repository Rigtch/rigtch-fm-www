import type { AppRouteHandlerFn } from 'next-auth/lib/types'

import { auth } from '../next-auth'

import { getServerToken } from './get-server-token'

vi.mock('../next-auth')

describe('getServerToken', () => {
  test('should return the server token', async () => {
    const token = 'token'

    const authSpy = vi.mocked(auth).mockReturnValue({
      token: {
        value: token,
      },
    } as unknown as AppRouteHandlerFn)

    expect(await getServerToken()).toEqual(token)
    expect(authSpy).toHaveBeenCalled()
  })
})
