import type { ReactNode, RefObject } from "react"

export interface ChartContainerProps {
  title: string
  isLoading: boolean
  error?: Error | null
  children: ReactNode
  containerRef?: RefObject<HTMLDivElement | null>
  minHeight?: number
  wide?: boolean
  resetKey?: unknown
}
