import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  server: {
    AUTH_SPOTIFY_ID: z.string(),
    AUTH_SPOTIFY_SECRET: z.string(),
    NEXTAUTH_URL: z.string().url(),
    AUTH_SECRET: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    AUTH_SPOTIFY_ID: process.env.AUTH_SPOTIFY_ID,
    AUTH_SPOTIFY_SECRET: process.env.AUTH_SPOTIFY_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
  skipValidation: process.env.NODE_ENV === 'test',
})
