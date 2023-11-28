import { PageProps } from '@app/types'
import { ProfileTopGenresSection } from '@app/profile/sections/top-genres'

export default async function ProfileTopGenresPage({
  searchParams,
}: PageProps) {
  return <ProfileTopGenresSection searchParams={searchParams} />
}
