export interface FollowersCountProps {
  value: number
}

export function FollowersCount({ value }: FollowersCountProps) {
  const formattedValue = new Intl.NumberFormat('en-EN').format(value)

  return <span className="text-md md:text-xl">Followers: {formattedValue}</span>
}
