import Image from 'next/image'
import Link, { LinkProps } from 'next/link'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={href ?? ''}
              target="_blank"
              className={className}
              {...props}
            >
              <Image
                src="/spotify-icon-white.png"
                width={25}
                height={25}
                alt={''}
                className="w-[25px] h-[25px]"
              />
            </Link>
          </TooltipTrigger>

          <TooltipContent>Open in Spotify</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
