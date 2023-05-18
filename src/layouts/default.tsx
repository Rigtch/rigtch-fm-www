import { Layout } from 'antd'
import { ReactNode } from 'react'

export interface DefaultLayoutProps {
  children: ReactNode
}

const { Header, Content } = Layout

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Layout>
      <Header className="sticky top-0 z-1 w-full flex items-center">
        Rigtch
      </Header>

      <Content className="py-8">{children}</Content>
    </Layout>
  )
}
