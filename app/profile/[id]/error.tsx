'use client'

import { notFound } from 'next/navigation'
import { useEffect } from 'react'

import {
  USER_NOT_FOUND,
  VALIDATION_FAILED_UUID_EXPECTED,
} from '@app/api/constants'
import type { ErrorProps } from '@app/types'

export default function ProfileError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  if (error.message === 'The access token expired') reset()

  console.log(
    'e',
    [VALIDATION_FAILED_UUID_EXPECTED, USER_NOT_FOUND].includes(error.message),
    error.message
  )

  if ([VALIDATION_FAILED_UUID_EXPECTED, USER_NOT_FOUND].includes(error.message))
    return notFound()
}
