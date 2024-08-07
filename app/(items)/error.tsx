'use client'

import { notFound } from 'next/navigation'

import type { ErrorProps } from '@app/types'

export default function ItemsError({ error }: ErrorProps) {
  if (error.message.includes('not been found')) return notFound()
}
