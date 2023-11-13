import { USER_NOT_REGISTERED } from '@api/constants'

export function catchQueryError(error: unknown) {
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
