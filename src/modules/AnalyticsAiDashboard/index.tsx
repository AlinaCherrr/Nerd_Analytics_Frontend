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
  CHART_CATEGORY_TICK,
  CHART_TOOLTIP_CONTENT_STYLE,
  CHART_TOOLTIP_LABEL_STYLE,
  CHART_TOOLTIP_ITEM_STYLE,
  CHART_LEGEND_TEXT_STYLE,
} from "shared/constants/charts"
import { CLASSIFICATION_PIE_COLORS, ESCALATED_COLOR, RESOLVED_COLOR } from "./constants"
import { useAnalyticsAiDashboard } from "./useLogic"
import styles from "./styles.module.scss"

export const AnalyticsAiDashboard = () => {
  const {
    filterState: { filters, updateFilters, resetFilters, saveConfig },
    accuracy: { data: accuracy, isLoading: accLoading, error: accError },
    efficiency: { data: efficiency, isLoading: effLoading, error: effError },
    refs: { classificationRef, escalatedRef, resolvedRef },
    pieData,
    accuracyHighlight,
    autoResolvedHighlight,
  } = useAnalyticsAiDashboard()

  return (
    <div className={styles.dashboard}>
      <AnalyticsFilterBar filters={filters} onChange={updateFilters} onReset={resetFilters} onSave={saveConfig} />

      <div className={styles.kpiRow}>
        <KpiCard
          label="Точность классификации"
          value={accLoading ? "—" : `${((accuracy?.accuracyRate ?? 0) * 100).toFixed(1)}`}
          unit="%"
          highlight={accuracyHighlight}
        />
        <KpiCard
          label="Изменено администратором"
          value={accLoading ? "—" : accuracy?.adminChanged ?? 0}
        />
        <KpiCard
          label="Всего классифицировано"
          value={accLoading ? "—" : accuracy?.totalClassified ?? 0}
        />
        <KpiCard
          label="Авторазрешено ИИ"
          value={effLoading ? "—" : `${(efficiency?.autoResolvedPct ?? 0).toFixed(1)}`}
          unit="%"
          highlight={autoResolvedHighlight}
        />
        <KpiCard
          label="Эскалировано"
          value={effLoading ? "—" : efficiency?.escalated ?? 0}
          highlight={efficiency?.escalated ? "warning" : undefined}
        />
        <KpiCard
          label="Сообщений до эскалации"
          value={effLoading ? "—" : (efficiency?.avgMessagesBeforeEscalation ?? 0).toFixed(1)}
        />
      </div>

      <div className={styles.chartsGrid}>
        <ChartContainer
          title="Соотношение авто / ручная классификация"
          isLoading={accLoading}
          error={accError}
          resetKey={accuracy}
          containerRef={classificationRef}
        >
          <div className={styles.chartWithExport}>
            <ExportToolbar
              onExportCsv={() => exportCsv(pieData, "ai-classification")}
              onExportPng={() => exportChartPng(classificationRef.current, "ai-classification")}
              onExportPdf={() => classificationRef.current && exportPdf(classificationRef.current, "Классификация ИИ")}
            />
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pieData} dataKey="count" nameKey="key" cx="50%" cy="50%" outerRadius={100} innerRadius={50}>
                  {pieData.map((entry, i) => (
                    <Cell key={entry.key} fill={CLASSIFICATION_PIE_COLORS[i % CLASSIFICATION_PIE_COLORS.length]} />
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

        <ChartContainer
          title="Топ категорий эскалации"
          isLoading={effLoading}
          error={effError}
          resetKey={efficiency}
          containerRef={escalatedRef}
        >
          <div className={styles.chartWithExport}>
            <ExportToolbar
              onExportCsv={() => exportCsv(efficiency?.topEscalatedCategories ?? [], "ai-escalated")}
              onExportPng={() => exportChartPng(escalatedRef.current, "ai-escalated")}
              onExportPdf={() => escalatedRef.current && exportPdf(escalatedRef.current, "Категории эскалации")}
            />
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={efficiency?.topEscalatedCategories ?? []} layout="vertical" margin={{ left: 16, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                <XAxis type="number" tick={CHART_AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis dataKey="category" type="category" width={130} tick={CHART_CATEGORY_TICK} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_CONTENT_STYLE}
                  labelStyle={CHART_TOOLTIP_LABEL_STYLE}
                  itemStyle={{ color: ESCALATED_COLOR }}
                />
                <Bar dataKey="count" name="Эскалации" fill={ESCALATED_COLOR} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        <ChartContainer
          title="Топ категорий авторазрешения"
          isLoading={effLoading}
          error={effError}
          resetKey={efficiency}
          containerRef={resolvedRef}
        >
          <div className={styles.chartWithExport}>
            <ExportToolbar
              onExportCsv={() => exportCsv(efficiency?.topResolvedCategories ?? [], "ai-resolved")}
              onExportPng={() => exportChartPng(resolvedRef.current, "ai-resolved")}
              onExportPdf={() => resolvedRef.current && exportPdf(resolvedRef.current, "Категории авторазрешения")}
            />
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={efficiency?.topResolvedCategories ?? []} layout="vertical" margin={{ left: 16, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                <XAxis type="number" tick={CHART_AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis dataKey="category" type="category" width={130} tick={CHART_CATEGORY_TICK} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_CONTENT_STYLE}
                  labelStyle={CHART_TOOLTIP_LABEL_STYLE}
                  itemStyle={{ color: RESOLVED_COLOR }}
                />
                <Bar dataKey="count" name="Авторазрешено" fill={RESOLVED_COLOR} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </div>
    </div>
  )
}
