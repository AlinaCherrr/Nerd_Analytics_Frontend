export interface AnalyticsKeywordsTableRow {
  key: string
  count: number
}

export interface AnalyticsKeywordsTableProps {
  data: AnalyticsKeywordsTableRow[]
  isLoading: boolean
  accentColor: string
  keyTitle: string
  countTitle: string
}
