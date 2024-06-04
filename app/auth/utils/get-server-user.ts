import { auth } from '../next-auth'

export async function getServerUser() {
  const session = await auth()

  return session?.user
}
