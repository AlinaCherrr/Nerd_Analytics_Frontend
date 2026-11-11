import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
} from "recharts"
import { AnalyticsFilterBar } from "modules/AnalyticsFilterBar"
import { KpiCard } from "shared/ui/KpiCard"
import { ChartContainer } from "shared/ui/ChartContainer"
import { ExportToolbar } from "shared/ui/ExportToolbar"
import { exportCsv, exportChartPng, exportPdf } from "shared/utils/exportAnalytics"
import {
  CHART_COLORS,
  CHART_GRID_STROKE,
  CHART_AXIS_TICK,
  CHART_AXIS_TICK_SMALL,
  CHART_CATEGORY_TICK,
  CHART_TOOLTIP_CONTENT_STYLE,
  CHART_TOOLTIP_LABEL_STYLE,
  CHART_TOOLTIP_ITEM_STYLE,
  CHART_LEGEND_TEXT_STYLE,
} from "shared/constants/charts"
import { STATUS_PIE_COLORS } from "./constants"
import { useAnalyticsOverviewDashboard } from "./useLogic"
import styles from "./styles.module.scss"

export const AnalyticsOverviewDashboard = () => {
  const {
    filterState: { filters, updateFilters, resetFilters, saveConfig },
    summary: { data, isLoading, error },
    timeline: { data: timeline, isLoading: tlLoading, error: tlError },
    getLabel,
    refs: { timelineRef, statusRef, productRef, categoryRef },
    hiddenStatus,
    toggleStatus,
    totalTickets,
    openCount,
  } = useAnalyticsOverviewDashboard()

  return (
    <div className={styles.dashboard}>
      <AnalyticsFilterBar filters={filters} onChange={updateFilters} onReset={resetFilters} onSave={saveConfig} />

      <div className={styles.kpiRow}>
        <KpiCard label="Всего тикетов" value={isLoading ? "—" : totalTickets} />
        <KpiCard label="Открытые тикеты" value={isLoading ? "—" : openCount} highlight={openCount > 0 ? "warning" : "success"} />
        <KpiCard label="Продуктов" value={isLoading ? "—" : data?.byProduct.length ?? 0} />
        <KpiCard label="Категорий ИИ" value={isLoading ? "—" : data?.byCategory.length ?? 0} />
      </div>

      <div className={styles.chartsGrid}>
        <ChartContainer title="Динамика обращений" isLoading={tlLoading} error={tlError} resetKey={timeline} containerRef={timelineRef} wide>
          <div className={styles.chartWithExport}>
            <ExportToolbar
              onExportCsv={() => exportCsv(timeline?.items ?? [], "tickets-timeline")}
              onExportPng={() => exportChartPng(timelineRef.current, "tickets-timeline")}
              onExportPdf={() => timelineRef.current && exportPdf(timelineRef.current, "Динамика обращений")}
            />
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={timeline?.items ?? []} margin={{ left: 0, right: 16, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                <XAxis dataKey="date" tick={CHART_AXIS_TICK_SMALL} axisLine={false} tickLine={false} />
                <YAxis tick={CHART_AXIS_TICK} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_CONTENT_STYLE}
                  labelStyle={CHART_TOOLTIP_LABEL_STYLE}
                  itemStyle={CHART_TOOLTIP_ITEM_STYLE}
                />
                <Line type="monotone" dataKey="count" name="Тикеты" stroke={CHART_COLORS.purple} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        <ChartContainer title="Распределение по статусам" isLoading={isLoading} error={error} resetKey={data} containerRef={statusRef}>
          <div className={styles.chartWithExport}>
            <ExportToolbar
              onExportCsv={() => exportCsv(data?.byStatus ?? [], "tickets-by-status")}
              onExportPng={() => exportChartPng(statusRef.current, "tickets-by-status")}
              onExportPdf={() => statusRef.current && exportPdf(statusRef.current, "Статусы тикетов")}
            />
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={data?.byStatus}
                  dataKey="count"
                  nameKey="key"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  onClick={(entry) => toggleStatus(String(entry.key ?? ""))}
                >
                  {data?.byStatus.map((entry, i) => (
                    <Cell
                      key={entry.key}
                      fill={STATUS_PIE_COLORS[i % STATUS_PIE_COLORS.length]}
                      opacity={hiddenStatus.has(entry.key) ? 0.2 : 1}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={CHART_TOOLTIP_CONTENT_STYLE}
                  labelStyle={CHART_TOOLTIP_LABEL_STYLE}
                  itemStyle={CHART_TOOLTIP_ITEM_STYLE}
                  formatter={(value, name) => [value, getLabel(String(name))]}
                />
                <Legend
                  formatter={(value) => <span style={CHART_LEGEND_TEXT_STYLE}>{getLabel(String(value))}</span>}
                  onClick={(e) => e.value && toggleStatus(e.value)}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        <ChartContainer title="Распределение по продуктам" isLoading={isLoading} error={error} resetKey={data} containerRef={productRef}>
          <div className={styles.chartWithExport}>
            <ExportToolbar
              onExportCsv={() => exportCsv(data?.byProduct ?? [], "tickets-by-product")}
              onExportPng={() => exportChartPng(productRef.current, "tickets-by-product")}
              onExportPdf={() => productRef.current && exportPdf(productRef.current, "Тикеты по продуктам")}
            />
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data?.byProduct} layout="vertical" margin={{ left: 16, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                <XAxis type="number" tick={CHART_AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis dataKey="key" type="category" width={130} tick={CHART_CATEGORY_TICK} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_CONTENT_STYLE}
                  labelStyle={CHART_TOOLTIP_LABEL_STYLE}
                  itemStyle={CHART_TOOLTIP_ITEM_STYLE}
                />
                <Bar dataKey="count" name="Тикеты" fill={CHART_COLORS.purple} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        <ChartContainer title="Распределение по категориям ИИ" isLoading={isLoading} error={error} resetKey={data} containerRef={categoryRef}>
          <div className={styles.chartWithExport}>
            <ExportToolbar
              onExportCsv={() => exportCsv(data?.byCategory ?? [], "tickets-by-category")}
              onExportPng={() => exportChartPng(categoryRef.current, "tickets-by-category")}
              onExportPdf={() => categoryRef.current && exportPdf(categoryRef.current, "Тикеты по категориям")}
            />
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data?.byCategory} layout="vertical" margin={{ left: 16, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                <XAxis type="number" tick={CHART_AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis dataKey="key" type="category" width={130} tick={CHART_CATEGORY_TICK} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_CONTENT_STYLE}
                  labelStyle={CHART_TOOLTIP_LABEL_STYLE}
                  itemStyle={CHART_TOOLTIP_ITEM_STYLE}
                />
                <Bar dataKey="count" name="Тикеты" fill={CHART_COLORS.blue} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </div>
    </div>
  )
}
