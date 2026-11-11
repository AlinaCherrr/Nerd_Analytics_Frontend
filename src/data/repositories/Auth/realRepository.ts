import { authSource } from "data/sources/Auth"
import type { AuthTokens } from "data/sources/Auth"
import {
 getAccessToken, getRefreshToken, setTokens as storeTokens, clearTokens 
} from "shared/storage/tokenStorage"
import { mapUserDto } from "./mappers"
import type { AuthRepository } from "./types"

const setTokens = (tokens: AuthTokens) => storeTokens(tokens.access_token, tokens.refresh_token)

export const authRealRepository: AuthRepository = {
  hasTokens: () => Boolean(getAccessToken()),
  getRefreshToken,
  clearTokens,
  setTokens,

  login: async (req) => {
    const tokens = await authSource.login(req)
    setTokens(tokens)
    const dto = await authSource.me()
    return mapUserDto(dto)
  },

  register: async (req) => {
    await authSource.register(req)
    const tokens = await authSource.login({ username: req.username, password: req.password })
    setTokens(tokens)
    const dto = await authSource.me()
    return mapUserDto(dto)
  },

  logout: async () => {
    const rt = getRefreshToken()
    clearTokens()
    if (rt) await authSource.logout(rt)
  },

  me: async () => {
    const dto = await authSource.me()
    return mapUserDto(dto)
  },

  updateMe: async (data) => {
    const dto = await authSource.updateMe({
      full_name: data.fullName,
      city: data.city,
      age: data.age,
      gender: data.gender,
    })
    return mapUserDto(dto)
  },
}
