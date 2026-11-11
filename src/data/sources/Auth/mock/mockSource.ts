import { delay } from "shared/utils/delay"
import type {
 AuthTokens, LoginRequest, RegisterRequest, UpdateMeRequest, UserDto 
} from "../types"
import { MOCK_TOKENS, MOCK_USER_DTO } from "./fixtures"

let mockUser: UserDto = { ...MOCK_USER_DTO }

export const authMockSource = {
  login: async (_req: LoginRequest): Promise<AuthTokens> => {
    await delay(200)
    return MOCK_TOKENS
  },

  register: async (_req: RegisterRequest): Promise<UserDto> => {
    await delay(200)
    return mockUser
  },

  logout: async (_refreshToken: string): Promise<void> => {
    await delay(100)
  },

  me: async (): Promise<UserDto> => {
    await delay(100)
    return mockUser
  },

  updateMe: async (data: UpdateMeRequest): Promise<UserDto> => {
    await delay(200)
    mockUser = { ...mockUser, ...data }
    return mockUser
  },
}
