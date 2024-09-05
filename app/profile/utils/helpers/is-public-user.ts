import { env } from '@app/config/env'

export const isPublicUser = (userId: string) =>
  userId === env.NEXT_PUBLIC_USER_ID
