import { authMockSource } from "data/sources/Auth/mock/mockSource"
import type { AuthTokens } from "data/sources/Auth"
import {
 getAccessToken, getRefreshToken, setTokens as storeTokens, clearTokens 
} from "shared/storage/tokenStorage"
import { mapUserDto } from "./mappers"
import type { AuthRepository } from "./types"

const setTokens = (tokens: AuthTokens) => storeTokens(tokens.access_token, tokens.refresh_token)

export const authMockRepository: AuthRepository = {
  hasTokens: () => Boolean(getAccessToken()),
  getRefreshToken,
  clearTokens,
  setTokens,

  login: async (req) => {
    const tokens = await authMockSource.login(req)
    setTokens(tokens)
    const dto = await authMockSource.me()
    return mapUserDto(dto)
  },

  register: async (req) => {
    await authMockSource.register(req)
    const tokens = await authMockSource.login({ username: req.username, password: req.password })
    setTokens(tokens)
    const dto = await authMockSource.me()
    return mapUserDto(dto)
  },

  logout: async () => {
    const rt = getRefreshToken()
    clearTokens()
    if (rt) await authMockSource.logout(rt)
  },

  me: async () => {
    const dto = await authMockSource.me()
    return mapUserDto(dto)
  },

  updateMe: async (data) => {
    const dto = await authMockSource.updateMe({
      full_name: data.fullName,
      city: data.city,
      age: data.age,
      gender: data.gender,
    })
    return mapUserDto(dto)
  },
}
