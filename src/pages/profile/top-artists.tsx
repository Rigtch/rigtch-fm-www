import { useState, useEffect, Fragment } from 'react'
import { useInView } from 'react-intersection-observer'
import { GetServerSideProps } from 'next'
import { QueryClient, dehydrate } from '@tanstack/react-query'

import { TimeRange } from '@api/types'
import { ElementCard, ElementCardSize } from '@components/element'
import { useTopArtistsInfiniteQuery } from '@api/hooks'
import { TopArtistsView } from '@components/views'
import { InfiniteLoadingButton } from '@components/common'
import { PageProps } from '@pages/_app'
import { ACCESS_TOKEN, PROFILE, TOP_ARTISTS } from '@api/constants'
import { getProfile, getTopArtists } from '@api/fetchers'
import { catchQueryError } from '@api/utils'

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  req: { cookies },
}) => {
  try {
    const accessToken = cookies[ACCESS_TOKEN]
    const queryClient = new QueryClient()

    await queryClient.fetchQuery([PROFILE], () => getProfile(accessToken))
    await queryClient.prefetchQuery([TOP_ARTISTS], () =>
      getTopArtists(accessToken)
    )

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  } catch (error) {
    return catchQueryError(error)
  }
}

export default function ProfileTopArtists() {
  const LIMIT = 20

  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.LONG_TERM)
  const { data, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTopArtistsInfiniteQuery(timeRange, LIMIT)
  const { ref, inView } = useInView()

  useEffect(() => {
    refetch()
  }, [timeRange, refetch])

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [inView, fetchNextPage])

  if (!data?.pages[0].items) return null

  return (
    <TopArtistsView
      timeRange={timeRange}
      setTimeRange={setTimeRange}
      items={data.pages[0].items}
      moreItems={data.pages.slice(1).map(page => (
        <Fragment key={page.offset}>
          {page.items.map(({ images, ...artist }, index) => (
            <ElementCard
              key={artist.id}
              {...artist}
              image={images[0].url}
              size={ElementCardSize.MEDIUM}
              position={index + page.offset + 1}
            />
          ))}
        </Fragment>
      ))}
    >
      <div className="flex justify-content-center">
        <InfiniteLoadingButton
          refFunction={ref}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </TopArtistsView>
  )
}
