'use server'

import { cookies } from 'next/headers'

import { USER_ACCEPT_COOKIES } from '@app/constants'

export async function acceptUserCookiesAction() {
  cookies().set(USER_ACCEPT_COOKIES, 'true', { path: '/' })
}
