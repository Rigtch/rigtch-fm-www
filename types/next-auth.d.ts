import { DefaultSession } from 'next-auth'
import { JWT as DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    token: {
      value: string
    }

    user?: {
      id?: string
      name?: string
      email?: string
      image?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    value: string
    id: string
    idToken?: string
  }
}
