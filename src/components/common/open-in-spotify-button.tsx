import Link, { LinkProps } from 'next/link'
import { Tooltip } from 'primereact/tooltip'
import { classNames } from 'primereact/utils'

import { SpotifyIcon } from '@assets/svgs'

export interface OpenInSpotifyButtonProps extends LinkProps {
  href: string
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
        <SpotifyIcon />
      </Link>
    </>
  )
}
