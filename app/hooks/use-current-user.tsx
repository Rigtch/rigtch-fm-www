import { useSession } from 'next-auth/react'

export function useCurrentUser() {
  const { data } = useSession()

  if (!data?.user) return null

  return data.user
}
