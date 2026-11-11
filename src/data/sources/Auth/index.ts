import { apiClient } from "data/api/apiClient"
import { AUTH_ENDPOINTS } from "./endpoints"
import type {
 AuthTokens, LoginRequest, RegisterRequest, UpdateMeRequest, UserDto 
} from "./types"

export const authSource = {
  login: (req: LoginRequest) =>
    apiClient.post<AuthTokens>(AUTH_ENDPOINTS.login, req).then((r) => r.data),

  register: (req: RegisterRequest) =>
    apiClient.post<UserDto>(AUTH_ENDPOINTS.register, req).then((r) => r.data),

  logout: (refreshToken: string) =>
    apiClient
      .post(AUTH_ENDPOINTS.logout, { refresh_token: refreshToken }, {
        validateStatus: (status) => status === 204 || (status >= 200 && status < 300),
      })
      .then(() => undefined),

  me: () => apiClient.get<UserDto>(AUTH_ENDPOINTS.me).then((r) => r.data),

  updateMe: (data: UpdateMeRequest) =>
    apiClient.patch<UserDto>(AUTH_ENDPOINTS.me, data).then((r) => r.data),
}

export type { AuthTokens, LoginRequest, RegisterRequest, UpdateMeRequest, UserDto }
