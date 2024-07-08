import type { ReactNode } from 'react'

import type { IdParam } from './params'

export interface LayoutProps {
  children: ReactNode
}

export interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export interface PageWithIdParamProps {
  params: IdParam
}
