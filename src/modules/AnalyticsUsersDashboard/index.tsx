import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
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
  CHART_CATEGORY_TICK_SMALL,
  CHART_TOOLTIP_CONTENT_STYLE,
  CHART_TOOLTIP_LABEL_STYLE,
  CHART_TOOLTIP_ITEM_STYLE,
} from "shared/constants/charts"
import { GENDER_BAR_COLOR, AGE_BAR_COLOR, CITY_BAR_COLOR } from "./constants"
import { useAnalyticsUsersDashboard } from "./useLogic"
import styles from "./styles.module.scss"

export const AnalyticsUsersDashboard = () => {
  const {
    filterState: { filters, updateFilters, resetFilters, saveConfig },
    demographics: { data: demographics, isLoading: demoLoading, error: demoError },
    retention: { data: retention, isLoading: retLoading },
    refs: { genderRef, ageRef, cityRef },
    totalUsers,
    topCities,
    retentionHighlights,
  } = useAnalyticsUsersDashboard()

  return (
    <div className={styles.dashboard}>
      <AnalyticsFilterBar filters={filters} onChange={updateFilters} onReset={resetFilters} onSave={saveConfig} hidePriority />

      <div className={styles.kpiRow}>
        <KpiCard label="Всего пользователей" value={demoLoading ? "—" : totalUsers ?? 0} />
        <KpiCard
          label="Удержание 7 дней"
          value={retLoading ? "—" : `${(retention?.retention7dPct ?? 0).toFixed(1)}`}
          unit="%"
          highlight={retentionHighlights.d7}
        />
        <KpiCard
          label="Удержание 14 дней"
          value={retLoading ? "—" : `${(retention?.retention14dPct ?? 0).toFixed(1)}`}
          unit="%"
          highlight={retentionHighlights.d14}
        />
        <KpiCard
          label="Удержание 30 дней"
          value={retLoading ? "—" : `${(retention?.retention30dPct ?? 0).toFixed(1)}`}
          unit="%"
          highlight={retentionHighlights.d30}
        />
      </div>

      <div className={styles.chartsGrid}>
        <ChartContainer title="По полу" isLoading={demoLoading} error={demoError} resetKey={demographics} containerRef={genderRef}>
          <div className={styles.chartWithExport}>
            <ExportToolbar
              onExportCsv={() => exportCsv(demographics?.byGender ?? [], "users-by-gender")}
              onExportPng={() => exportChartPng(genderRef.current, "users-by-gender")}
              onExportPdf={() => genderRef.current && exportPdf(genderRef.current, "Пользователи по полу")}
            />
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={demographics?.byGender ?? []} margin={{ left: 0, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                <XAxis dataKey="key" tick={CHART_CATEGORY_TICK} axisLine={false} tickLine={false} />
                <YAxis tick={CHART_AXIS_TICK} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_CONTENT_STYLE}
                  labelStyle={CHART_TOOLTIP_LABEL_STYLE}
                  itemStyle={CHART_TOOLTIP_ITEM_STYLE}
                />
                <Bar dataKey="count" name="Пользователи" fill={GENDER_BAR_COLOR} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        <ChartContainer title="По возрастным группам" isLoading={demoLoading} error={demoError} resetKey={demographics} containerRef={ageRef}>
          <div className={styles.chartWithExport}>
            <ExportToolbar
              onExportCsv={() => exportCsv(demographics?.byAgeGroup ?? [], "users-by-age")}
              onExportPng={() => exportChartPng(ageRef.current, "users-by-age")}
              onExportPdf={() => ageRef.current && exportPdf(ageRef.current, "Пользователи по возрасту")}
            />
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={demographics?.byAgeGroup ?? []} margin={{ left: 0, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                <XAxis dataKey="key" tick={CHART_CATEGORY_TICK_SMALL} axisLine={false} tickLine={false} />
                <YAxis tick={CHART_AXIS_TICK} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_CONTENT_STYLE}
                  labelStyle={CHART_TOOLTIP_LABEL_STYLE}
                  itemStyle={CHART_TOOLTIP_ITEM_STYLE}
                />
                <Bar dataKey="count" name="Пользователи" fill={AGE_BAR_COLOR} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        <ChartContainer title="По городам (топ-10)" isLoading={demoLoading} error={demoError} resetKey={demographics} containerRef={cityRef} wide>
          <div className={styles.chartWithExport}>
            <ExportToolbar
              onExportCsv={() => exportCsv(demographics?.byCity ?? [], "users-by-city")}
              onExportPng={() => exportChartPng(cityRef.current, "users-by-city")}
              onExportPdf={() => cityRef.current && exportPdf(cityRef.current, "Пользователи по городам")}
            />
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={topCities} layout="vertical" margin={{ left: 16, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                <XAxis type="number" tick={CHART_AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis dataKey="key" type="category" width={100} tick={CHART_CATEGORY_TICK} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_CONTENT_STYLE}
                  labelStyle={CHART_TOOLTIP_LABEL_STYLE}
                  itemStyle={CHART_TOOLTIP_ITEM_STYLE}
                />
                <Bar dataKey="count" name="Пользователи" fill={CITY_BAR_COLOR} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </div>
    </div>
  )
}
