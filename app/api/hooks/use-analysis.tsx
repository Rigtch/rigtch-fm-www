import { useQuery } from '@tanstack/react-query'

import { getAnalysis } from '../fetchers'
import { ANALYSIS } from '../constants'

import { useAuthCookies } from '@app/hooks/use-auth-cookies'

export const useAnalysisQuery = () => {
  const { accessToken } = useAuthCookies()

  return useQuery([ANALYSIS], () => getAnalysis(accessToken))
}
