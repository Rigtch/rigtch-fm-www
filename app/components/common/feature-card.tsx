import { Card, CardTitle } from '../ui/card'

export interface FeatureCardProps {
  content: string
}

export function FeatureCard({ content }: FeatureCardProps) {
  return (
    <Card className="w-2/5 bg-gradient-to-tr from-cyan-800/80 to-purple-600/70 p-4">
      <CardTitle className="text-center text-3xl">{content}</CardTitle>
    </Card>
  )
}
