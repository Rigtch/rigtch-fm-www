import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

import { ACCESS_TOKEN, ANALYSIS } from '@api/constants'
import { getAnalysis } from '@api/fetchers'

export const useAnalysisQuery = () => {
  const [cookie] = useCookies([ACCESS_TOKEN])
  return useQuery([ANALYSIS], () => getAnalysis(cookie[ACCESS_TOKEN]))
}
