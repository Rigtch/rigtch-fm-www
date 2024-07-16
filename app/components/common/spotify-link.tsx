'use client'

import Link, { type LinkProps } from 'next/link'
import { IconContext } from 'react-icons'
import { FaSpotify } from 'react-icons/fa6'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

namespace SpotifyLink {
  export interface Props extends Omit<LinkProps, 'href'> {
    href?: string
    className?: string
    isDisabled?: boolean
  }
}

function SpotifyLink({
  href,
  className,
  isDisabled,
  ...props
}: SpotifyLink.Props) {
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
              <IconContext.Provider
                value={{
                  className: 'min-w-[20px] h-[20px]',
                  color: isDisabled ? 'gray' : '',
                }}
              >
                <FaSpotify />
              </IconContext.Provider>
            </Link>
          </TooltipTrigger>

          <TooltipContent>Open in Spotify</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}

export { SpotifyLink }
