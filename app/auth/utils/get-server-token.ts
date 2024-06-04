import { auth } from '../next-auth'

export async function getServerToken() {
  const session = await auth()

  return session?.token.value
}
