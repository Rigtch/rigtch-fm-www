'use client'

import Link from 'next/link'
import { ComponentProps } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button } from '@components/ui/button'
import { formatSearchParams } from '@utils/formatters'

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
