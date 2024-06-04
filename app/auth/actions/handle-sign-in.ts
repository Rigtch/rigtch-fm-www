'use server'

import { signIn } from '../next-auth'
import { spotifyAuthScopes } from '../spotify-auth-scopes'

export async function handleSignIn() {
  'use server'
  console.log(spotifyAuthScopes)

  await signIn(
    'spotify',
    {},
    {
      scope: spotifyAuthScopes.join(' '),
    }
  )
}
