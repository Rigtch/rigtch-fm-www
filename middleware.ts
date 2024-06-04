import NextAuth from 'next-auth'

import { nextAuthConfig } from '@app/auth'

export const { auth: middleware } = NextAuth(nextAuthConfig)
