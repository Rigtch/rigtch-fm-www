import type { ReactNode } from 'react'

import type { Params, SearchParams } from './params'
import type { View } from './view'

export interface PageProps {
  params?: Params
  searchParams: SearchParams
}

export interface LayoutProps {
  children: ReactNode
}

export interface SkeletonProps {
  view?: View
}

export interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}
