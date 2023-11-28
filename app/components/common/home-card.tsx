import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

import { FeatureCard, FeatureCardProps } from './feature-card'

export function HomeItemCard() {
  const features: FeatureCardProps[] = [
    {
      content: 'Top Artists',
    },
    {
      content: 'Top Tracks',
    },
    {
      content: 'Top Genres',
    },
    {
      content: 'Recently Played',
    },
  ]
  return (
    <Card className="bg-neutral-900 w-full p-2">
      <CardHeader className="flex flex-col gap-6">
        <CardTitle className="text-3xl">
          Connect and share your music taste with your friends
        </CardTitle>

        <CardContent className="flex text-neutral-300 flex-col gap-12 text-xl">
          <div className="text-2xl">
            We&apos;re happy to announce that Rigtch is officially out.
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-2xl">Currently available features:</div>

            <div className="flex flex-row justify-center gap-4 flex-wrap">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  )
}
