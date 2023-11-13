import { useQuery } from '@tanstack/react-query'

import { ANALYSIS } from '@api/constants'
import { getAnalysis } from '@api/fetchers'
import { useAuthCookies } from '@hooks/use-auth-cookies'

export const useAnalysisQuery = () => {
  const { accessToken } = useAuthCookies()

  return useQuery([ANALYSIS], () => getAnalysis(accessToken))
}
