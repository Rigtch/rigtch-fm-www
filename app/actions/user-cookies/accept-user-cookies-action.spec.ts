import { cookies } from 'next/headers'
import type { Mock } from 'vitest'

import { acceptUserCookiesAction } from './accept-user-cookies-action'

import { USER_ACCEPT_COOKIES } from '@app/constants'

vi.mock('next/headers')

describe('acceptUserCookiesAction', () => {
  test('should set the cookie', async () => {
    const setSpy = vi.fn()

    ;(vi.mocked(cookies) as Mock).mockReturnValue({
      set: setSpy,
    })

    await acceptUserCookiesAction()

    expect(setSpy).toHaveBeenCalledWith(USER_ACCEPT_COOKIES, 'true', {
      path: '/',
    })
  })
})
