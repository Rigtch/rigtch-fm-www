import { notFound } from 'next/navigation'
import { z } from 'zod'

export function validateUserId(userId?: string) {
  const schema = z.string().uuid()

  console.log(schema.safeParse(userId).success)

  if (!userId || !schema.safeParse(userId).success) return notFound()

  return userId
}
