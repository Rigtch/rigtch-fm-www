'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

import { TIME_RANGE, VIEW } from '@app/constants'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { validateView } from '@app/profile/utils/view'
import { ToggleTimeRange, SelectView } from '@app/components/common'
import { ProfileLayoutBaseProps } from '@app/profile/types'
import { getSettingsCookie } from '@app/utils/settings-cookies'
import { useRouteName } from '@app/hooks/use-route-name'

export interface ProfileTopGenresSubLayoutProps extends ProfileLayoutBaseProps {
  genres: ReactNode
  artists: ReactNode
  tracks: ReactNode
}

export default function ProfileTopGenresSubLayout({
  genres,
  artists,
  tracks,
}: ProfileTopGenresSubLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const routeName = useRouteName()
  const searchParams = useSearchParams()

  let timeRangeCookie
  let viewCookie

  const urlParams = new URLSearchParams(searchParams)

  async function getCookies() {
    timeRangeCookie = await getSettingsCookie(routeName, 'time-range')
    viewCookie = await getSettingsCookie(routeName, 'view')

    if (timeRangeCookie) urlParams.set(TIME_RANGE, timeRangeCookie)

    if (viewCookie) urlParams.set(VIEW, viewCookie)

    router.push(`${pathname}?${urlParams.toString()}`)
  }

  useEffect(() => {
    //eslint-disable-next-line @typescript-eslint/no-floating-promises
    getCookies()
  }, [])

  const timeRange = validateTimeRange(searchParams.get(TIME_RANGE))
  const view = validateView(searchParams.get(VIEW))

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
        <ToggleTimeRange initialValue={timeRange} />

        <div>
          <SelectView initialValue={view} />
        </div>
      </div>

      {genres}
      {artists}
      {tracks}
    </>
  )
}
