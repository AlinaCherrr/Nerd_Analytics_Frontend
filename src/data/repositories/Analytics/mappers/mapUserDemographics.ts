import type { UserDemographicsDto } from "data/sources/Analytics"
import type { UserDemographics } from "../types"
import { mapKeyCount } from "./mapKeyCount"

export const mapUserDemographics = (dto: UserDemographicsDto): UserDemographics => ({
  byGender: dto.by_gender.map(mapKeyCount),
  byAgeGroup: dto.by_age_group.map(mapKeyCount),
  byCity: dto.by_city.map(mapKeyCount),
})
