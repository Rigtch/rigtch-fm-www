import { handleSignOut } from '@app/auth/actions'

export function GET() {
  return handleSignOut()
}
