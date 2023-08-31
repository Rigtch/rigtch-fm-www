import { GetServerSideProps } from 'next'
import { QueryClient, dehydrate } from '@tanstack/react-query'

import { PageProps } from '../_app'

import {
  ACCESS_TOKEN,
  ANALYSIS,
  PROFILE,
  TOP_ARTISTS,
  TOP_GENRES,
  TOP_TRACKS,
  USER_NOT_REGISTERED,
} from '@api/constants'
import { ProfileCard } from '@components/profile'
import {
  getAnalysis,
  getProfile,
  getTopArtists,
  getTopGenres,
  getTopTracks,
} from '@api/fetchers'
import {
  TopArtistsSection,
  TopGenresSection,
  TopTracksSection,
  LastTracksSection,
  AnalysisSection,
} from '@sections/profile'

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  req: { cookies },
}) => {
  try {
    const accessToken = cookies[ACCESS_TOKEN]
    const queryClient = new QueryClient()

    await queryClient.fetchQuery([PROFILE], () => getProfile(accessToken))
    await queryClient.fetchQuery([TOP_GENRES], () => getTopGenres(accessToken))
    await queryClient.prefetchQuery([TOP_ARTISTS], () =>
      getTopArtists(accessToken)
    )
    await queryClient.prefetchQuery([TOP_TRACKS], () =>
      getTopTracks(accessToken)
    )
    await queryClient.prefetchQuery([ANALYSIS], () => getAnalysis(accessToken))

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  } catch (error) {
    if (error instanceof Error && error.message === USER_NOT_REGISTERED)
      return {
        redirect: {
          destination: '/not-registered',
          permanent: false,
        },
      }

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}

export default function Profile() {
  return (
    <div className="flex-column flex gap-8">
      <ProfileCard />
      <TopGenresSection />
      <TopArtistsSection />
      <TopTracksSection />
      <AnalysisSection />
      <LastTracksSection />
    </div>
  )
}
