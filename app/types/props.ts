import type { ReactNode } from 'react'

import type { IdParam } from './params'

export type LayoutProps = Readonly<{
  children: ReactNode
}>

export type ErrorProps = Readonly<{
  error: Error & { digest?: string }
  reset: () => void
}>

export type PageWithIdParamProps = Readonly<{
  params: IdParam
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  searchParams: { [key: string]: string | string[] | undefined }
}>
