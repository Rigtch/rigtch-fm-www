import type { HTMLAttributes } from 'react'
import { LuInfo } from 'react-icons/lu'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@app/components/ui/tooltip'

namespace TooltipInfo {
  export interface Props
    extends Pick<HTMLAttributes<HTMLDivElement>, 'children'> {
    title: string
  }
}

function TooltipInfo({ title, children }: TooltipInfo.Props) {
  return (
    <div className="flex items-center gap-2">
      <p>{title}</p>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <LuInfo />
          </TooltipTrigger>

          <TooltipContent>{children}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export { TooltipInfo }
