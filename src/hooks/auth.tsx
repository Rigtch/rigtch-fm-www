import { useContext } from 'react'

import { AuthContext } from '~/context/auth'

export const useAuth = () => {
  const authContext = useContext(AuthContext)

  function getProfileImage(index = 0) {
    return authContext.profile?.images[index].url
  }

  return {
    ...authContext,
    getProfileImage,
  }
}
