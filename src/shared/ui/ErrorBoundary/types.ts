import type { ErrorInfo, ReactNode } from "react"

export interface ErrorBoundaryFallbackProps {
  error: Error
  reset: () => void
}

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback: (props: ErrorBoundaryFallbackProps) => ReactNode
  resetKeys?: unknown[]
  onError?: (error: Error, info: ErrorInfo) => void
}

export interface ErrorBoundaryState {
  error: Error | null
}
