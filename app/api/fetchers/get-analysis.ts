import { Analysis } from '../types'

import { fetchApi } from './fetch-api'

export function getAnalysis(token?: string) {
  return fetchApi<Analysis>('/statistics/analysis', { token })
}
