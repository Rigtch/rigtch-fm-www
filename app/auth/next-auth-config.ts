import { NextAuthConfig } from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

import { signInEvent } from './sign-in-event'

export const nextAuthConfig: NextAuthConfig = {
  providers: [
    SpotifyProvider({
      checks: ['none'],
    }),
  ],
  events: {
    signIn: signInEvent,
  },
  callbacks: {
    session({ session, token }) {
      session.token = token

      session.user.id = token.id

      return session
    },
    jwt({ token, account }) {
      if (account) {
        token.id = account.providerAccountId
        token.value = account.access_token!
      }

      return token
    },
  },
}
