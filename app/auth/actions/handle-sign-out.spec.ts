import { cookies } from 'next/headers'
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

import { signOut } from '../next-auth'

import { handleSignOut } from './handle-sign-out'

import { USER_ID } from '@app/constants'

vi.mock('../next-auth')
vi.mock('next/headers')

describe('handleSignOut', () => {
  test('should call signOut', async () => {
    const deleteSpy = vi.fn()
    const signOutSpy = vi.mocked(signOut)

    vi.mocked(cookies).mockReturnValue({
      delete: deleteSpy,
    } as unknown as ReadonlyRequestCookies)

    await handleSignOut()

    expect(deleteSpy).toHaveBeenCalledWith(USER_ID)
    expect(signOutSpy).toHaveBeenCalledWith({ redirectTo: '/', redirect: true })
  })
})
