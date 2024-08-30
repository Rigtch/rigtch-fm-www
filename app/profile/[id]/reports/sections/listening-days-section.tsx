import { redirect } from 'next/navigation'

import { ListeningDaysChart } from '../components'

import { getReportsListeningDays } from '@app/api/fetchers/reports'
import { getServerToken } from '@app/auth'

namespace ListeningDaysSection {
  export interface Props {
    userId: string
  }
}

async function ListeningDaysSection({ userId }: ListeningDaysSection.Props) {
  const token = await getServerToken()

  if (!token) redirect('/')

  const [thisWeekResponse, lastWeekResponse] = await Promise.all([
    getReportsListeningDays(token, {
      userId,
      after: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * (7 + new Date().getDay() - 1)
      ),
    }),
    getReportsListeningDays(token, {
      userId,
      before: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * (7 + new Date().getDay() - 1)
      ),
      after: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * (14 + new Date().getDay() - 1)
      ),
    }),
  ])

  return (
    <section className="flex flex-col gap-8 px-4">
      <header>
        <h2 className="text-4xl">Listening days</h2>
      </header>

      <main>
        <ListeningDaysChart
          thisWeekResponse={thisWeekResponse}
          lastWeekResponse={lastWeekResponse}
        />
      </main>
    </section>
  )
}

export { ListeningDaysSection }
