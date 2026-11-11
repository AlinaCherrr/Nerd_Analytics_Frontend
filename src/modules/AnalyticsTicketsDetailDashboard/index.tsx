import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts"
import { AnalyticsFilterBar } from "modules/AnalyticsFilterBar"
import { AnalyticsKeywordsTable } from "modules/AnalyticsKeywordsTable"
import { ChartContainer } from "shared/ui/ChartContainer"
import { ExportToolbar } from "shared/ui/ExportToolbar"
import { exportCsv, exportChartPng, exportPdf } from "shared/utils/exportAnalytics"
import {
  CHART_GRID_STROKE,
  CHART_AXIS_TICK,
  CHART_AXIS_TICK_SMALL,
  CHART_TOOLTIP_CONTENT_STYLE,
  CHART_TOOLTIP_LABEL_STYLE,
  CHART_LEGEND_TEXT_STYLE,
} from "shared/constants/charts"
import {
  KEYWORDS_ACCENT_COLOR,
  CATEGORIES_ACCENT_COLOR,
  SLOWEST_CATEGORY_COLOR,
  ANOMALY_CATEGORY_COLOR,
  FORECAST_LINE_COLOR,
  FORECAST_BOUNDS_COLOR,
  KEYWORDS_TABLE_KEY_TITLE,
  KEYWORDS_TABLE_COUNT_TITLE,
} from "./constants"
import { useAnalyticsTicketsDetailDashboard } from "./useLogic"
import styles from "./styles.module.scss"

export const AnalyticsTicketsDetailDashboard = () => {
  const {
    analysis,
    forecast,
    dashboard: { data: d6, isLoading: d6Loading, error: d6Error },
    forecastQuery: { data: forecastData, isLoading: fcLoading, error: fcError },
    forecastRef,
    keywordRows,
    categoryRows,
    getZScoreColor,
  } = useAnalyticsTicketsDetailDashboard()

  return (
    <div className={styles.dashboard}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Анализ тикетов</h3>
        <AnalyticsFilterBar
          filters={analysis.filters}
          onChange={analysis.updateFilters}
          onReset={analysis.resetFilters}
          onSave={analysis.saveConfig}
        />

        <div className={styles.keywordsGrid}>
          <div className={styles.keywordsCard}>
            <div className={styles.keywordsHeader}>
              <h4 className={styles.keywordsCardTitle}>Ключевые слова тикетов</h4>
              <ExportToolbar
                onExportCsv={() => exportCsv(d6?.topKeywords ?? [], "tickets-keywords")}
                onExportPng={() => {}}
                onExportPdf={() => {}}
              />
            </div>
            <AnalyticsKeywordsTable
              data={keywordRows}
              isLoading={d6Loading}
              accentColor={KEYWORDS_ACCENT_COLOR}
              keyTitle={KEYWORDS_TABLE_KEY_TITLE}
              countTitle={KEYWORDS_TABLE_COUNT_TITLE}
            />
          </div>

          <div className={styles.keywordsCard}>
            <div className={styles.keywordsHeader}>
              <h4 className={styles.keywordsCardTitle}>Топ категорий</h4>
              <ExportToolbar
                onExportCsv={() => exportCsv(d6?.topCategories ?? [], "tickets-categories")}
                onExportPng={() => {}}
                onExportPdf={() => {}}
              />
            </div>
            <AnalyticsKeywordsTable
              data={categoryRows}
              isLoading={d6Loading}
              accentColor={CATEGORIES_ACCENT_COLOR}
              keyTitle={KEYWORDS_TABLE_KEY_TITLE}
              countTitle={KEYWORDS_TABLE_COUNT_TITLE}
            />
          </div>
        </div>

        <div className={styles.keywordsGrid}>
          <div className={styles.keywordsCard}>
            <div className={styles.keywordsHeader}>
              <h4 className={styles.keywordsCardTitle}>Медленные категории (ср. TTR)</h4>
              <ExportToolbar
                onExportCsv={() => exportCsv(d6?.slowestCategories ?? [], "tickets-slowest")}
                onExportPng={() => {}}
                onExportPdf={() => {}}
              />
            </div>
            {d6Loading ? (
              <div className={styles.tableMsg}>Загрузка…</div>
            ) : !d6?.slowestCategories.length ? (
              <div className={styles.tableMsg}>Нет данных</div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Категория</th>
                    <th>Ср. TTR (мин)</th>
                  </tr>
                </thead>
                <tbody>
                  {d6.slowestCategories.map((row) => (
                    <tr key={row.category}>
                      <td style={{ color: SLOWEST_CATEGORY_COLOR }}>{row.category}</td>
                      <td>{row.avgTtrMin.toFixed(0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className={styles.keywordsCard}>
            <div className={styles.keywordsHeader}>
              <h4 className={styles.keywordsCardTitle}>Аномалии (Z-score)</h4>
              <ExportToolbar
                onExportCsv={() => exportCsv(d6?.anomalies ?? [], "tickets-anomalies")}
                onExportPng={() => {}}
                onExportPdf={() => {}}
              />
            </div>
            {d6Loading ? (
              <div className={styles.tableMsg}>Загрузка…</div>
            ) : d6Error ? (
              <div className={styles.tableMsg}>Ошибка загрузки</div>
            ) : !d6?.anomalies.length ? (
              <div className={styles.tableMsg}>Аномалий не обнаружено</div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Категория</th>
                    <th>Продукт</th>
                    <th>48ч</th>
                    <th>Среднее</th>
                    <th>Z</th>
                  </tr>
                </thead>
                <tbody>
                  {d6.anomalies.map((a, i) => (
                    <tr key={i}>
                      <td style={{ color: ANOMALY_CATEGORY_COLOR }}>{a.category}</td>
                      <td>{a.product}</td>
                      <td>{a.count48h}</td>
                      <td>{a.rollingAvg.toFixed(1)}</td>
                      <td style={{ color: getZScoreColor(a.zScore) }}>
                        {a.zScore.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Прогноз обращений на 7 дней</h3>
        <AnalyticsFilterBar
          filters={forecast.filters}
          onChange={forecast.updateFilters}
          onReset={forecast.resetFilters}
          onSave={forecast.saveConfig}
          hideDates
          hidePriority
        />

        <ChartContainer
          title="Прогноз (скользящее среднее ± 1σ)"
          isLoading={fcLoading}
          error={fcError}
          resetKey={forecastData}
          containerRef={forecastRef}
        >
          <div className={styles.chartWithExport}>
            <ExportToolbar
              onExportCsv={() => exportCsv(forecastData?.forecast ?? [], "tickets-forecast")}
              onExportPng={() => exportChartPng(forecastRef.current, "tickets-forecast")}
              onExportPdf={() => forecastRef.current && exportPdf(forecastRef.current, "Прогноз обращений")}
            />
            {!fcLoading && !forecastData?.forecast.length ? (
              <div className={styles.tableMsg}>Недостаточно данных для прогноза</div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={forecastData?.forecast ?? []} margin={{ left: 0, right: 16, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                  <XAxis dataKey="date" tick={CHART_AXIS_TICK_SMALL} axisLine={false} tickLine={false} />
                  <YAxis tick={CHART_AXIS_TICK} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={CHART_TOOLTIP_CONTENT_STYLE}
                    labelStyle={CHART_TOOLTIP_LABEL_STYLE}
                  />
                  <Legend formatter={(value) => <span style={CHART_LEGEND_TEXT_STYLE}>{value}</span>} />
                  <Line type="monotone" dataKey="predictedCount" name="Прогноз" stroke={FORECAST_LINE_COLOR} strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="upperBound" name="Верх. граница" stroke={FORECAST_BOUNDS_COLOR} strokeWidth={1} strokeDasharray="4 4" dot={false} />
                  <Line type="monotone" dataKey="lowerBound" name="Ниж. граница" stroke={FORECAST_BOUNDS_COLOR} strokeWidth={1} strokeDasharray="4 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </ChartContainer>
      </section>
    </div>
  )
}
