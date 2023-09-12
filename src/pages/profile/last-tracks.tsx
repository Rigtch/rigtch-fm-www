import { useInView } from 'react-intersection-observer'
import { Fragment, useEffect } from 'react'

import { useLastTracksInfiniteQuery } from '@hooks/api'
import { ElementCard, ElementCardColor } from '@components/element'
import { InfiniteLoadingButton } from '@components/common'

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
