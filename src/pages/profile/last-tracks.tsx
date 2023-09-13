import { useInView } from 'react-intersection-observer'
import { Fragment, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { QueryClient, dehydrate } from '@tanstack/react-query'

import { useLastTracksInfiniteQuery } from '@api/hooks'
import { ElementCard, ElementCardColor } from '@components/element'
import { InfiniteLoadingButton } from '@components/common'
import { catchQueryError } from '@api/utils'
import { ACCESS_TOKEN, LAST_TRACKS, PROFILE } from '@api/constants'
import { getLastTracks, getProfile } from '@api/fetchers'
import { PageProps } from '@pages/_app'

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  req: { cookies },
}) => {
  try {
    const accessToken = cookies[ACCESS_TOKEN]
    const queryClient = new QueryClient()

    await queryClient.fetchQuery([PROFILE], () => getProfile(accessToken))
    await queryClient.prefetchQuery([LAST_TRACKS], () =>
      getLastTracks(accessToken)
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

export default function ProfileLastTracks() {
  const LIMIT = 20

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLastTracksInfiniteQuery(LIMIT)
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [inView, fetchNextPage])

  if (!data?.pages?.[0]?.items) return null

  return (
    <section>
      <header>
        <h2 className="text-5xl">Last played tracks</h2>
      </header>

      <main className="flex-column flex gap-2 lg:gap-3">
        {data.pages.map(page => (
          <Fragment key={page.cursors?.before ?? 'last'}>
            {page.items.map(({ album, ...track }, index) => (
              <ElementCard
                {...track}
                color={ElementCardColor.SURFACE_GROUND}
                album={album}
                image={album.images[0].url}
                key={index}
              />
            ))}
          </Fragment>
        ))}

        <div className="flex justify-content-center">
          <InfiniteLoadingButton
            refFunction={ref}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      </main>
    </section>
  )
}
