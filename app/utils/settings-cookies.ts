'use server'

import { cookies } from 'next/headers'

// eslint-disable-next-line @typescript-eslint/require-await
export async function createSettingsCookie(
  routeName: string,
  value: string,
  type: 'view' | 'timeRange'
) {
  cookies().set(`${type}${routeName}`, value)
}
