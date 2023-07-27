import { DateTime, DateTimeOptions } from 'luxon'

export interface relativeTimeProps {
  value: string
  options?: DateTimeOptions
}

export function RelativeTime({ value, options }: relativeTimeProps) {
  return (
    <p className="text-700 m-0 white-space-nowrap">
      {DateTime.fromISO(value, options).toRelative()}
    </p>
  )
}
