import { GetServerSidePropsResult } from 'next'

import { USER_NOT_REGISTERED } from '@api/constants'
import { PageProps } from '@pages/_app'

export function catchQueryError(
  error: unknown
): GetServerSidePropsResult<PageProps> {
  if (error instanceof Error && error.message === USER_NOT_REGISTERED)
    return {
      redirect: {
        destination: '/not-registered',
        permanent: false,
      },
    }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}
