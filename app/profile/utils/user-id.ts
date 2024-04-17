import { notFound } from 'next/navigation'
import { z } from 'zod'

export function validateUserId(userId?: string) {
  const schema = z.string().uuid()

  if (!userId || !schema.safeParse(userId).success) return notFound()

  return userId
}
