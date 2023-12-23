import { cn } from '@app/utils/cn'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted/50', className)}
      {...props}
    />
  )
}

export { Skeleton }
