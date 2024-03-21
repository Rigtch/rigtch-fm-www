'use server'

import { cookies } from 'next/headers'

// eslint-disable-next-line @typescript-eslint/require-await
export async function createSettingsCookie(
  routeName: string,
  value: string,
  type: 'view' | 'time-range'
) {
  cookies().set(`${type}${routeName}`, value)
}

export async function getSettingsCookie(
  routeName: string,
  type: 'view' | 'time-range'
) {
  //eslint-disable-next-line @typescript-eslint/await-thenable
  return await cookies().get(`${type}${routeName}`)?.value
}
