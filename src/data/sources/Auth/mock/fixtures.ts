import type { AuthTokens, UserDto } from "../types"

export const MOCK_USER_DTO: UserDto = {
  id: "mock-user-id",
  username: "mock_employee",
  role: "employee",
  email: "mock.employee@nerd-analytics.local",
  full_name: "Алина",
  city: "Москва",
  created_at: "2025-01-01T00:00:00Z",
}

export const MOCK_TOKENS: AuthTokens = {
  access_token: "mock-access-token",
  refresh_token: "mock-refresh-token",
  token_type: "bearer",
}
