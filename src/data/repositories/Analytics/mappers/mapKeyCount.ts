import type { KeyCountDto } from "data/sources/Analytics"
import type { KeyCount } from "../types"

export const mapKeyCount = (dto: KeyCountDto): KeyCount => ({ key: dto.key, count: dto.count })
