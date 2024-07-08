'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button } from '@app/components/ui/button'
import { formatSearchParams } from '@app/profile/utils/formatters'

export function SeeMoreButton({ href, ...props }: ComponentProps<typeof Link>) {
  const searchParams = useSearchParams()

  const hrefWithSearchParams = `${href.toString()}?${formatSearchParams(
    searchParams
  )}`

  return (
    <Button asChild variant="link">
      <Link href={hrefWithSearchParams} {...props}>
        See more
      </Link>
    </Button>
  )
}
