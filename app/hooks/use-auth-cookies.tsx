import { useCookies } from 'react-cookie'

import { USER_ID } from '@app/constants'

export const useAuthCookies = () => {
  const [cookie] = useCookies([USER_ID])

  return {
    userId: cookie[USER_ID] as string,
  }
}
