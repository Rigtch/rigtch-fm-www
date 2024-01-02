import TopTracksSkeleton from '@app/profile/sections/top-tracks.skeleton'
import { SkeletonProps } from '@app/types'

export default function ProfileTopTracksLoading({ view }: SkeletonProps) {
  return <TopTracksSkeleton view={view} />
}
