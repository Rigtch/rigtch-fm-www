import { fetchApi } from './fetch-api'

import { Analysis } from '@api/types'

export function getAnalysis(token?: string) {
  return fetchApi<Analysis>('/statistics/analysis', { token })
}
