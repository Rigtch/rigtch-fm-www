import type { ReactNode } from 'react'

export interface LayoutProps {
  children: ReactNode
}

export interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}
