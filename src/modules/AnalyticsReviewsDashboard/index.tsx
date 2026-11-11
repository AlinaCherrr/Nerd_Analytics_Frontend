import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts"
import { AnalyticsFilterBar } from "modules/AnalyticsFilterBar"
import { AnalyticsKeywordsTable } from "modules/AnalyticsKeywordsTable"
import { KpiCard } from "shared/ui/KpiCard"
import { ChartContainer } from "shared/ui/ChartContainer"
import { ExportToolbar } from "shared/ui/ExportToolbar"
import { exportCsv, exportChartPng, exportPdf } from "shared/utils/exportAnalytics"
import {
  CHART_GRID_STROKE,
  CHART_AXIS_TICK,
  CHART_AXIS_TICK_SMALL,
  CHART_CATEGORY_TICK,
  CHART_TOOLTIP_CONTENT_STYLE,
  CHART_TOOLTIP_LABEL_STYLE,
  CHART_TOOLTIP_ITEM_STYLE,
  CHART_LEGEND_TEXT_STYLE,
} from "shared/constants/charts"
import {
  POSITIVE_COLOR,
  NEGATIVE_COLOR,
  SENTIMENT_BAR_COLOR,
  KEYWORDS_TABLE_KEY_TITLE,
  KEYWORDS_TABLE_COUNT_TITLE,
} from "./constants"
import { useAnalyticsReviewsDashboard } from "./useLogic"
import styles from "./styles.module.scss"

export const AnalyticsReviewsDashboard = () => {
  const {
    filterState: { filters, updateFilters, resetFilters, saveConfig },
    summary: { data: summary, isLoading: summaryLoading, error: summaryError },
    keywords: { data: keywords, isLoading: keywordsLoading },
    dynamics: { data: dynamics, isLoading: dynLoading, error: dynError },
    refs: { sentimentRef, dynamicsRef },
    ratingHighlight,
  } = useAnalyticsReviewsDashboard()

  return (
    <div className={styles.dashboard}>
      <AnalyticsFilterBar filters={filters} onChange={updateFilters} onReset={resetFilters} onSave={saveConfig} hidePriority />

      <div className={styles.kpiRow}>
        <KpiCard
          label="Средний рейтинг (CSAT)"
          value={summaryLoading ? "—" : (summary?.averageRating ?? 0).toFixed(1)}
          unit="/ 5"
          highlight={ratingHighlight}
        />
        <KpiCard
          label="Всего отзывов"
          value={summaryLoading ? "—" : (summary?.totalReviews ?? 0).toLocaleString()}
        />
      </div>

      <ChartContainer
        title="Тональность по дням"
        isLoading={dynLoading}
        error={dynError}
        resetKey={dynamics}
        containerRef={dynamicsRef}
      >
        <div className={styles.chartWithExport}>
          <ExportToolbar
            onExportCsv={() => exportCsv(dynamics?.items ?? [], "reviews-dynamics")}
            onExportPng={() => exportChartPng(dynamicsRef.current, "reviews-dynamics")}
            onExportPdf={() => dynamicsRef.current && exportPdf(dynamicsRef.current, "Тональность по дням")}
          />
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={dynamics?.items ?? []} margin={{ left: 0, right: 16, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
              <XAxis dataKey="date" tick={CHART_AXIS_TICK_SMALL} axisLine={false} tickLine={false} />
              <YAxis tick={CHART_AXIS_TICK} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={CHART_TOOLTIP_CONTENT_STYLE}
                labelStyle={CHART_TOOLTIP_LABEL_STYLE}
              />
              <Legend formatter={(value) => <span style={CHART_LEGEND_TEXT_STYLE}>{value}</span>} />
              <Line type="monotone" dataKey="positiveCount" name="Позитивные" stroke={POSITIVE_COLOR} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="negativeCount" name="Негативные" stroke={NEGATIVE_COLOR} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>

      <ChartContainer
        title="Распределение тональности"
        isLoading={summaryLoading}
        error={summaryError}
        resetKey={summary}
        containerRef={sentimentRef}
      >
        <div className={styles.chartWithExport}>
          <ExportToolbar
            onExportCsv={() => exportCsv(summary?.sentimentDistribution ?? [], "reviews-sentiment")}
            onExportPng={() => exportChartPng(sentimentRef.current, "reviews-sentiment")}
            onExportPdf={() => sentimentRef.current && exportPdf(sentimentRef.current, "Тональность отзывов")}
          />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={summary?.sentimentDistribution} margin={{ left: 0, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
              <XAxis dataKey="key" tick={CHART_CATEGORY_TICK} axisLine={false} tickLine={false} />
              <YAxis tick={CHART_AXIS_TICK} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={CHART_TOOLTIP_CONTENT_STYLE}
                labelStyle={CHART_TOOLTIP_LABEL_STYLE}
                itemStyle={CHART_TOOLTIP_ITEM_STYLE}
              />
              <Bar dataKey="count" name="Отзывы" fill={SENTIMENT_BAR_COLOR} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>

      <div className={styles.keywordsGrid}>
        <div className={styles.keywordsCard}>
          <div className={styles.keywordsHeader}>
            <h4 className={styles.keywordsTitle}>Позитивные ключевые слова</h4>
            {!keywordsLoading && (
              <ExportToolbar
                onExportCsv={() => exportCsv(keywords?.keywordsPositive ?? [], "keywords-positive")}
                onExportPng={() => { }}
                onExportPdf={() => { }}
              />
            )}
          </div>
          <AnalyticsKeywordsTable
            data={keywords?.keywordsPositive ?? []}
            isLoading={keywordsLoading}
            accentColor={POSITIVE_COLOR}
            keyTitle={KEYWORDS_TABLE_KEY_TITLE}
            countTitle={KEYWORDS_TABLE_COUNT_TITLE}
          />
        </div>

        <div className={styles.keywordsCard}>
          <div className={styles.keywordsHeader}>
            <h4 className={styles.keywordsTitle}>Негативные ключевые слова</h4>
            {!keywordsLoading && (
              <ExportToolbar
                onExportCsv={() => exportCsv(keywords?.keywordsNegative ?? [], "keywords-negative")}
                onExportPng={() => { }}
                onExportPdf={() => { }}
              />
            )}
          </div>
          <AnalyticsKeywordsTable
            data={keywords?.keywordsNegative ?? []}
            isLoading={keywordsLoading}
            accentColor={NEGATIVE_COLOR}
            keyTitle={KEYWORDS_TABLE_KEY_TITLE}
            countTitle={KEYWORDS_TABLE_COUNT_TITLE}
          />
        </div>
      </div>
    </div>
  )
}
