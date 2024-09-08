namespace FollowersCount {
  export type Props = Readonly<{
    value: number
  }>
}

function FollowersCount({ value }: FollowersCount.Props) {
  const formattedValue = new Intl.NumberFormat('en-EN').format(value)

  return <span className="text-md md:text-xl">Followers: {formattedValue}</span>
}

export { FollowersCount }
