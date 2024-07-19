import { ItemsListSkeleton } from '@app/components/items/list'
import { DefaultSection } from '@app/sections'
import { View } from '@app/profile/enums'

export default function ProfileHistorySubLoading() {
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
