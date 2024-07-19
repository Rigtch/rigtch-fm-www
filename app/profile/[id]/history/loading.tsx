import { ItemsListSkeleton } from '@app/components/items/list'
import { DefaultSection } from '@app/sections'
import { View } from '@app/profile/enums'

export default function ProfileHistoryLoading() {
  return (
    <DefaultSection title={'History'}>
      <ItemsListSkeleton
        withPlayedAt
        withoutPosition
        withArtists
        view={View.LIST}
      />
    </DefaultSection>
  )
}
