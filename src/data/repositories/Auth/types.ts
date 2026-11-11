import type { AuthTokens, LoginRequest, RegisterRequest } from "data/sources/Auth"

export type { LoginRequest, RegisterRequest } from "data/sources/Auth"

export interface User {
  id: string
  username: string
  role: "client" | "employee"
  email?: string
  fullName?: string
  age?: number
  gender?: string
  city?: string
  createdAt?: string
}

export interface UpdateMeData {
  fullName?: string
  city?: string
  age?: number
  gender?: string
}

export interface AuthRepository {
  hasTokens: () => boolean
  getRefreshToken: () => string | null
  clearTokens: () => void
  setTokens: (tokens: AuthTokens) => void
  login: (req: LoginRequest) => Promise<User>
  register: (req: RegisterRequest) => Promise<User>
  logout: () => Promise<void>
  me: () => Promise<User>
  updateMe: (data: UpdateMeData) => Promise<User>
}
