import Image from 'next/image'
import Link, { LinkProps } from 'next/link'
import { Tooltip } from 'primereact/tooltip'
import { classNames } from 'primereact/utils'

import { spotifyIconWhite } from '@assets/images'

export interface OpenInSpotifyButtonProps extends Omit<LinkProps, 'href'> {
  href?: string
  className?: string
}

export function OpenInSpotifyButton({
  href,
  className,
  ...props
}: OpenInSpotifyButtonProps) {
  return (
    <>
      <Tooltip
        target=".open-in-spotify-button"
        position="bottom"
        content="Open In Spotify"
      />

      <Link
        href={href ?? ''}
        target="_blank"
        className={classNames('open-in-spotify-button', className)}
        style={{ height: 24 }}
        {...props}
      >
        <Image src={spotifyIconWhite} width="24" height="24" alt={''} />
      </Link>
    </>
  )
}
