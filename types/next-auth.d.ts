import { DefaultSession } from 'next-auth'

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
  interface JWT {
    value: string
    id: string
  }
}
