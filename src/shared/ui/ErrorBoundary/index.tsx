import { Component, type ErrorInfo } from "react"
import type { ErrorBoundaryProps, ErrorBoundaryState } from "./types"

const toError = (value: unknown): Error =>
  value instanceof Error ? value : new Error(String(value))

const haveKeysChanged = (prev: unknown[] = [], next: unknown[] = []) =>
  prev.length !== next.length || prev.some((key, idx) => !Object.is(key, next[idx]))

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { error: toError(error) }
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    this.props.onError?.(toError(error), info)
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.state.error && haveKeysChanged(prevProps.resetKeys, this.props.resetKeys)) {
      this.reset()
    }
  }

  reset = () => this.setState({ error: null })

  render() {
    const { error } = this.state
    if (error) return this.props.fallback({ error, reset: this.reset })
    return this.props.children
  }
}

export type { ErrorBoundaryProps, ErrorBoundaryFallbackProps } from "./types"
