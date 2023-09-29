import Link, { LinkProps } from 'next/link'
import { Tooltip } from 'primereact/tooltip'

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

      <Link href={href ?? ''} target="_blank" className={className} {...props}>
        <i className="open-in-spotify-button pi pi-external-link" />
      </Link>
    </>
  )
}
