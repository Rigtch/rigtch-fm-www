'use server'

import { cookies } from 'next/headers'
import type { Account, Profile, User } from 'next-auth'

import { postMeUser } from '@app/api/fetchers'
import { USER_ID } from '@app/constants'

export async function signInEvent(message: {
  user: User
  account: Account | null
  profile?: Profile
  isNewUser?: boolean
}) {
  if (message.account?.refresh_token) {
    const user = await postMeUser(message.account.refresh_token)
    cookies().set(USER_ID, user.id)
  }
}
