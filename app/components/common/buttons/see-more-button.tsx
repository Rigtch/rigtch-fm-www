'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button } from '@app/components/ui/button'
import { formatSearchParams } from '@app/utils/formatters'

namespace SeeMoreButton {
  export type Props = Readonly<
    {
      href: string
    } & Omit<ComponentProps<typeof Link>, 'href'>
  >
}

function SeeMoreButton({ href, ...props }: SeeMoreButton.Props) {
  const searchParams = useSearchParams()

  const hrefWithSearchParams = `${href.toString()}?${formatSearchParams(
    searchParams
  )}`

  return (
    <Button asChild variant="link">
      <Link href={hrefWithSearchParams} prefetch {...props}>
        See more
      </Link>
    </Button>
  )
}

export { SeeMoreButton }
