import type { UserDto } from "data/sources/Auth"
import type { User } from "../types"

export const mapUserDto = (dto: UserDto): User => ({
  id: dto.id,
  username: dto.username,
  role: dto.role,
  email: dto.email,
  fullName: dto.full_name,
  age: dto.age,
  gender: dto.gender,
  city: dto.city,
  createdAt: dto.created_at,
})
