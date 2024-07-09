import { notFound } from 'next/navigation'
import { z } from 'zod'

export function validateId(id?: string) {
  const schema = z.string().uuid()

  if (!id || !schema.safeParse(id).success) return notFound()

  return id
}
