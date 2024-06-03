import { AuthOptions } from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import { cookies } from 'next/headers'

import { spotifyAuthScopes } from './spotify-auth-scopes'

import { env } from '@app/config/env'
import { postMeUser } from '@app/api/fetchers'
import { USER_ID } from '@app/constants'

export const authOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope: spotifyAuthScopes.join(' '),
        },
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  events: {
    async signIn(message) {
      if (message.account?.refresh_token) {
        const user = await postMeUser(message.account.refresh_token)

        cookies().set(USER_ID, user.id)
      }
    },
  },
  callbacks: {
    session({ session, token }) {
      session.token = token

      if (session.user) {
        session.user.id = token.id
      }

      return session
    },
    jwt({ token, user, account }) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (user) {
        token.id = user.id
      }
      if (account) {
        token.value = account.access_token!
      }
      return token
    },
  },
}
