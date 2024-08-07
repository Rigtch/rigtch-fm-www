'use client'

import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'

import { Button } from './components/ui/button'

namespace ErrorBoundary {
  export interface Props {
    children: ReactNode
    hasError?: boolean
  }
}

class ErrorBoundary extends Component {
  state: { hasError: boolean }

  constructor(readonly props: ErrorBoundary.Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo)
    // Log the error or report it to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <Button
            onClick={() => {
              this.setState({ hasError: false })
            }}
          >
            Try again?
          </Button>
        </div>
      )
    }
    return this.props.children
  }
}

export { ErrorBoundary }
