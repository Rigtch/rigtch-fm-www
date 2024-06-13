import { ItemsListSkeleton } from '@app/components/items'
import { DefaultSection } from '@app/sections'
import { View } from '@app/types'

export default function ProfileHistorySubLoading() {
  return (
    <DefaultSection title={'History'}>
      <ItemsListSkeleton playedAt withoutPosition artists view={View.LIST} />
    </DefaultSection>
  )
}
