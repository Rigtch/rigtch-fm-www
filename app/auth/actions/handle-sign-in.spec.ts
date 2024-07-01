import { signIn } from '../next-auth'
import { spotifyAuthScopes } from '../spotify-auth-scopes'

import { handleSignIn } from './handle-sign-in'

vi.mock('../next-auth')

describe('handleSignIn', () => {
  test('should call signIn', async () => {
    const signInSpy = vi.mocked(signIn)

    await handleSignIn()

    expect(signInSpy).toHaveBeenCalledWith(
      'spotify',
      {},
      {
        scope: spotifyAuthScopes.join(' '),
      }
    )
  })
})
