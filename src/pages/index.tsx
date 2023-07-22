import { GetServerSideProps } from 'next'
import { QueryClient, dehydrate } from '@tanstack/react-query'

import { PageProps } from './_app'

import {
  ACCESS_TOKEN,
  PROFILE,
  TOP_ARTISTS,
  TOP_GENRES,
  TOP_TRACKS,
} from '~/api/constants'
import { ProfileCard } from '~/components/profile'
import { LastTracksSection } from '~/components/last-tracks-section'
import {
  getProfile,
  getTopArtists,
  getTopGenres,
  getTopTracks,
} from '~/api/fetchers'
import { TopGenresSection } from '~/components/top-genres-section'
import { TopArtistsSection } from '~/components/top-artists-section'
import { TopTracksSection } from '~/components/top-tracks-section'

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  req: { cookies },
}) => {
  try {
    const accessToken = cookies[ACCESS_TOKEN]
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery([PROFILE], () => getProfile(accessToken))
    await queryClient.prefetchQuery([TOP_GENRES], () =>
      getTopGenres(accessToken)
    )
    await queryClient.prefetchQuery([TOP_ARTISTS], () =>
      getTopArtists(accessToken)
    )
    await queryClient.prefetchQuery([TOP_TRACKS], () =>
      getTopTracks(accessToken)
    )

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  } catch (error) {
    console.log('error', error)

    return {
      redirect: {
        destination: '/about',
        permanent: false,
      },
    }
  }
}

export default function Home() {
  return (
    <div className="flex-column flex gap-8">
      <ProfileCard />
      <TopGenresSection />
      <TopArtistsSection />
      <TopTracksSection />
      <LastTracksSection />
    </div>
  )
}
