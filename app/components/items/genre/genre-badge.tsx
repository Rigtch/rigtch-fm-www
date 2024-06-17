'use client'

import { GenreProps } from './props'

import { Badge } from '@app/components/ui/badge'

export function GenreBadge({ genre }: GenreProps) {
  return <Badge className="text-primary-foreground/80">{genre}</Badge>
}
