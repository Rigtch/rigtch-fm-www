import { QueryOptions } from '@apollo/client'

import { AuthorizationType } from './authorization-type'

export const applyAuthorizationHeader = (
  token?: string,
  authorizationType: AuthorizationType = AuthorizationType.Bearer
): Pick<QueryOptions, 'context'> => ({
  context: {
    headers: {
      Authorization: `${authorizationType} ${token}`,
    },
  },
})
