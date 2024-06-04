import NextAuth from 'next-auth'

import { nextAuthConfig } from './next-auth-config'

export const { auth, handlers, signIn, signOut } = NextAuth(nextAuthConfig)
