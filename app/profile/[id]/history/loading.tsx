import { ItemsListSkeleton } from '@app/components/items/list'
import { DefaultSection } from '@app/sections'
import { View } from '@app/types'

export default function ProfileHistoryLoading() {
  return (
    <DefaultSection title={'History'}>
      <ItemsListSkeleton playedAt withoutPosition artists view={View.LIST} />
    </DefaultSection>
  )
}
