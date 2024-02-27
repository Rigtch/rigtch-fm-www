import { ItemsListSkeleton } from '@app/profile/components/items'
import { DefaultSection } from '@app/sections'
import { View } from '@app/types'

export function RecentlyPlayedSkeleton() {
  return (
    <DefaultSection title={'Recently Played'}>
      <ItemsListSkeleton playedAt withoutPosition artists view={View.LIST} />
    </DefaultSection>
  )
}
