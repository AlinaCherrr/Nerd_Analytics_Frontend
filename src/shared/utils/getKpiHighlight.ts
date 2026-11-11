import type { KpiHighlight } from "shared/ui/KpiCard/types"

export const getKpiHighlight = (
  value: number | undefined,
  successMin: number,
  warningMin: number,
): KpiHighlight | undefined => {
  if (value === undefined) return undefined
  if (value >= successMin) return "success"
  if (value >= warningMin) return "warning"
  return "danger"
}
