import type { AppRouteHandlerFn } from 'next-auth/lib/types'
import type { MockInstance } from 'vitest'

import { auth } from '../next-auth'

import { getServerToken } from './get-server-token'

import { isPublicUser } from '@app/profile/utils/helpers'

vi.mock('../next-auth')
vi.mock('@app/profile/utils/helpers')

describe('getServerToken', () => {
  const userId = 'user-id'

  let isPublicUserSpy: MockInstance

  beforeEach(() => {
    isPublicUserSpy = vi.mocked(isPublicUser)
  })

  test('should return the server token', async () => {
    const token = 'token'

    const authSpy = vi.mocked(auth).mockReturnValue({
      token: {
        value: token,
      },
    } as unknown as AppRouteHandlerFn)

    expect(await getServerToken(userId)).toEqual(token)
    expect(authSpy).toHaveBeenCalled()
  })

  test('should redirect to home page if token is undefined and user is not public', async () => {
    const token = undefined

    const authSpy = vi.mocked(auth).mockReturnValue({
      token: {
        value: token,
      },
    } as unknown as AppRouteHandlerFn)

    isPublicUserSpy.mockReturnValue(false)

    await expect(getServerToken(userId)).rejects.toThrowError('NEXT_REDIRECT')

    expect(authSpy).toHaveBeenCalled()
    expect(isPublicUserSpy).toHaveBeenCalledWith(userId)
  })

  test('should return empty token if token is undefined and user is public', async () => {
    const token = undefined

    const authSpy = vi.mocked(auth).mockReturnValue({
      token: {
        value: token,
      },
    } as unknown as AppRouteHandlerFn)

    isPublicUserSpy.mockReturnValue(true)

    expect(await getServerToken(userId)).toEqual('')

    expect(authSpy).toHaveBeenCalled()
    expect(isPublicUserSpy).toHaveBeenCalledWith(userId)
  })
})
