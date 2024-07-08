'use client'

import { notFound } from 'next/navigation'

import {
  USER_NOT_FOUND,
  VALIDATION_FAILED_UUID_EXPECTED,
} from '@app/api/constants'
import type { ErrorProps } from '@app/types'

export default function ProfileError({ error, reset }: ErrorProps) {
  console.error(error)

  if (error.message === 'The access token expired') reset()

  if (
    error instanceof Error &&
    [VALIDATION_FAILED_UUID_EXPECTED, USER_NOT_FOUND].includes(error.message)
  )
    return notFound()
}
