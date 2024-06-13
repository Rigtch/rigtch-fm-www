import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'

import '@app/styles/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
    docs: {
      theme: themes.dark,
    },
  },
  tags: ['autodocs'],
}

export default preview
