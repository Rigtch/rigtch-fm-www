import { ReactNode } from 'react'

import { Params, SearchParams } from './params'
import { View } from './view'

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
