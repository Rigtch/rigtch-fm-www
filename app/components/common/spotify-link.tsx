'use client'

import type { LinkProps } from 'next/link'
import Link from 'next/link'
import { IconContext } from 'react-icons'
import { FaSpotify } from 'react-icons/fa6'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

export interface SpotifyLinkProps extends Omit<LinkProps, 'href'> {
  href?: string
  className?: string
  skeleton?: boolean
}

export function SpotifyLink({
  href,
  className,
  skeleton,
  ...props
}: SpotifyLinkProps) {
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
                  color: skeleton ? 'gray' : '',
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
