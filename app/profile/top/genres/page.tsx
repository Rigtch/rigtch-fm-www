import { PageProps } from '@app/types'
import { ProfileTopGenresSection } from '@app/profile/sections'

export default function ProfileTopGenresPage({ searchParams }: PageProps) {
  return <ProfileTopGenresSection searchParams={searchParams} limit={50} />
}
