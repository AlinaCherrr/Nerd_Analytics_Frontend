import type { Filter } from "./types"

export const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "unread", label: "Непрочитанные" },
  { value: "read", label: "Прочитанные" },
]
