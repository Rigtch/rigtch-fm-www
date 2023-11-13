import { useQuery } from '@tanstack/react-query'

import { getAnalysis } from '@api/fetchers'
import { useAuthCookies } from '@hooks/use-auth-cookies'
import { ANALYSIS } from '@api/constants'

export const useAnalysisQuery = () => {
  const { accessToken } = useAuthCookies()

  return useQuery([ANALYSIS], () => getAnalysis(accessToken))
}
