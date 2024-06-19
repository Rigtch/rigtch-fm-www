import { redirect } from 'next/navigation'

import { declineUserCookiesAction } from './decline-user-cookies-action'

vi.mock('next/navigation')

describe('declineUserCookiesAction', () => {
  test('should redirect to google', async () => {
    await declineUserCookiesAction()

    expect(redirect).toHaveBeenCalledWith('https://www.google.com')
  })
})
