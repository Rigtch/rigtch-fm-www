import { ReactNode } from 'react'

import { Params, SearchParams } from './params'

export interface PageProps {
  params: Params
  searchParams: SearchParams
}

export interface LayoutProps {
  children: ReactNode
}
