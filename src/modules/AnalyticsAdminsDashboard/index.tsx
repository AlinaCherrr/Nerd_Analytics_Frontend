import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts"
import { AnalyticsFilterBar } from "modules/AnalyticsFilterBar"
import { KpiCard } from "shared/ui/KpiCard"
import { ChartContainer } from "shared/ui/ChartContainer"
import { ExportToolbar } from "shared/ui/ExportToolbar"
import { exportCsv, exportChartPng, exportPdf } from "shared/utils/exportAnalytics"
import {
  CHART_GRID_STROKE,
  CHART_AXIS_TICK,
  CHART_CATEGORY_TICK_SMALL,
  CHART_TOOLTIP_CONTENT_STYLE,
  CHART_TOOLTIP_LABEL_STYLE,
  CHART_TOOLTIP_ITEM_STYLE,
  CHART_LEGEND_TEXT_STYLE,
} from "shared/constants/charts"
import {
 SLA_PIE_COLORS, OPEN_TICKETS_COLOR, CLOSED_TICKETS_COLOR, PRIORITY_LABELS 
} from "./constants"
import { useAnalyticsAdminsDashboard } from "./useLogic"
import styles from "./styles.module.scss"

export const AnalyticsAdminsDashboard = () => {
  const {
    filterState: { filters, updateFilters, resetFilters, saveConfig },
    sla: { data: sla, isLoading: slaLoading, error: slaError },
    workload: { data: workload, isLoading: wlLoading, error: wlError },
    adminSla: { data: adminSla, isLoading: aslLoading, error: aslError },
    refs: { slaPieRef, workloadRef, violationsRef },
    avgTtfr,
    avgTtr,
    pieData,
    workloadChartData,
    complianceHighlight,
    getCompliancePctColor,
  } = useAnalyticsAdminsDashboard()

  return (
    <div className={styles.dashboard}>
      <AnalyticsFilterBar filters={filters} onChange={updateFilters} onReset={resetFilters} onSave={saveConfig} />

      <div className={styles.kpiRow}>
        <KpiCard
          label="Соблюдение SLA"
          value={slaLoading ? "—" : `${((sla?.complianceRate ?? 0) * 100).toFixed(1)}`}
          unit="%"
          highlight={complianceHighlight}
        />
        <KpiCard label="Выполнено" value={slaLoading ? "—" : sla?.compliant ?? 0} highlight="success" />
        <KpiCard label="Нарушено SLA" value={slaLoading ? "—" : sla?.breached ?? 0} highlight={sla?.breached ? "danger" : undefined} />
        <KpiCard
          label="Ср. TTFR (мин)"
          value={aslLoading ? "—" : avgTtfr !== null ? avgTtfr.toFixed(0) : "—"}
        />
        <KpiCard
          label="Ср. TTR (мин)"
          value={aslLoading ? "—" : avgTtr !== null ? avgTtr.toFixed(0) : "—"}
        />
      </div>

      <div className={styles.chartsGrid}>
        <ChartContainer title="Выполнено / нарушено SLA" isLoading={slaLoading} error={slaError} resetKey={sla} containerRef={slaPieRef}>
          <div className={styles.chartWithExport}>
            <ExportToolbar
              onExportCsv={() => exportCsv(pieData, "sla-compliance")}
              onExportPng={() => exportChartPng(slaPieRef.current, "sla-compliance")}
              onExportPdf={() => slaPieRef.current && exportPdf(slaPieRef.current, "Соблюдение SLA")}
            />
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pieData} dataKey="count" nameKey="key" cx="50%" cy="50%" outerRadius={100} innerRadius={50}>
                  {pieData.map((entry, i) => (
                    <Cell key={entry.key} fill={SLA_PIE_COLORS[i % SLA_PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={CHART_TOOLTIP_CONTENT_STYLE}
                  labelStyle={CHART_TOOLTIP_LABEL_STYLE}
                  itemStyle={CHART_TOOLTIP_ITEM_STYLE}
                />
                <Legend formatter={(value) => <span style={CHART_LEGEND_TEXT_STYLE}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        <ChartContainer title="Нагрузка по сотрудникам" isLoading={wlLoading} error={wlError} resetKey={workload} containerRef={workloadRef}>
          <div className={styles.chartWithExport}>
            <ExportToolbar
              onExportCsv={() => exportCsv(workloadChartData, "admin-workload")}
              onExportPng={() => exportChartPng(workloadRef.current, "admin-workload")}
              onExportPdf={() => workloadRef.current && exportPdf(workloadRef.current, "Нагрузка по сотрудникам")}
            />
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={workloadChartData} margin={{ left: 0, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                <XAxis dataKey="name" tick={CHART_CATEGORY_TICK_SMALL} axisLine={false} tickLine={false} />
                <YAxis tick={CHART_AXIS_TICK} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_CONTENT_STYLE}
                  labelStyle={CHART_TOOLTIP_LABEL_STYLE}
                />
                <Bar dataKey="open" name="Открытые" fill={OPEN_TICKETS_COLOR} radius={[4, 4, 0, 0]} />
                <Bar dataKey="closed" name="Закрытые" fill={CLOSED_TICKETS_COLOR} radius={[4, 4, 0, 0]} />
                <Legend formatter={(value) => <span style={CHART_LEGEND_TEXT_STYLE}>{value}</span>} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        <ChartContainer title="SLA и время ответа по приоритетам" isLoading={aslLoading} error={aslError} resetKey={adminSla} containerRef={violationsRef} wide>
          {adminSla && adminSla.byPriority.length > 0 ? (
            <div className={styles.chartWithExport}>
              <ExportToolbar
                onExportCsv={() => exportCsv(adminSla.byPriority, "sla-by-priority")}
                onExportPng={() => {}}
                onExportPdf={() => {}}
              />
              <table className={styles.slaTable}>
                <thead>
                  <tr>
                    <th>Приоритет</th>
                    <th>Ср. TTFR (мин)</th>
                    <th>Ср. TTR (мин)</th>
                    <th>TTFR OK %</th>
                    <th>TTR OK %</th>
                  </tr>
                </thead>
                <tbody>
                  {adminSla.byPriority.map((row) => (
                    <tr key={row.priority}>
                      <td>{PRIORITY_LABELS[row.priority] ?? row.priority}</td>
                      <td>{row.avgTtfr.toFixed(0)}</td>
                      <td>{row.avgTtr.toFixed(0)}</td>
                      <td style={{ color: getCompliancePctColor(row.slaTtfrCompliancePct) }}>
                        {row.slaTtfrCompliancePct.toFixed(1)}%
                      </td>
                      <td style={{ color: getCompliancePctColor(row.slaTtrCompliancePct) }}>
                        {row.slaTtrCompliancePct.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {adminSla.topViolatedCategories.length > 0 && (
                <div className={styles.violationsList}>
                  <h4 className={styles.violationsTitle}>Топ нарушений по категориям</h4>
                  <div className={styles.tagList}>
                    {adminSla.topViolatedCategories.map((c) => (
                      <span key={c.category} className={styles.tag}>
                        {c.category} <span className={styles.tagCount}>{c.count}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.empty}>Нет данных за период</div>
          )}
        </ChartContainer>
      </div>
    </div>
  )
}
