import TopArtistsSkeleton from '@app/profile/sections/top-artists.skeleton'
import { SkeletonProps } from '@app/types'

export default function ProfileTopArtistsLoading({ view }: SkeletonProps) {
  return <TopArtistsSkeleton view={view} />
}
