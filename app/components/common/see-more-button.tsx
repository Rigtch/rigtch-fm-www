'use client'

import Link from 'next/link'
import { ComponentProps } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button } from '../ui/button'

import { formatSearchParams } from '@app/utils/formatters'

export function SeeMoreButton({
  href,

  ...props
}: ComponentProps<typeof Link>) {
  const searchParams = useSearchParams()

  const hrefWithSearchParams = `${href}?${formatSearchParams(searchParams)}`

  return (
    <Button asChild variant="link">
      <Link href={hrefWithSearchParams} {...props}>
        See more
      </Link>
    </Button>
  )
}
