import { useSession } from 'next-auth/react'

export function useToken() {
  const { data: session } = useSession()

  return session?.token.value
}
