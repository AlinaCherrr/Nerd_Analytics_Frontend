import type { CategoryCountExtDto } from "data/sources/Analytics/types"
import type { CategoryCount } from "../types"

export const mapCategoryCount = (dto: CategoryCountExtDto): CategoryCount => ({ category: dto.category, count: dto.count })
