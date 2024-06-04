'use server'

import { cookies } from 'next/headers'

import { signOut } from '../next-auth'

import { USER_ID } from '@app/constants'

export async function handleSignOut() {
  cookies().delete(USER_ID)
  await signOut({ redirectTo: '/', redirect: true })
}
