'use server'

import { redirect } from 'next/navigation'

export async function declineUserCookiesAction() {
  redirect('https://www.google.com')
}
