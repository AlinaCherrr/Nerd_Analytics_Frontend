import axios, { type AxiosError } from "axios"
import { httpClient, BASE_URL, attachErrorNormalization } from "shared/http"
import {
 getAccessToken, getRefreshToken, setTokens, clearTokens 
} from "shared/storage/tokenStorage"
import { routes } from "shared/utils/routes"
import { AUTH_ENDPOINTS } from "data/sources/Auth/endpoints"

export const apiClient = httpClient

const AUTH_NO_REFRESH_PATHS = [
  AUTH_ENDPOINTS.login,
  AUTH_ENDPOINTS.register,
  AUTH_ENDPOINTS.refresh,
  AUTH_ENDPOINTS.logout,
]

const shouldSkipTokenRefresh = (url?: string) =>
  AUTH_NO_REFRESH_PATHS.some((path) => (url ?? "").includes(path))

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let isRefreshing = false
const queue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = []

const processQueue = (error: unknown, token: string | null) => {
  queue.forEach((promise) => (error ? promise.reject(error) : promise.resolve(token!)))
  queue.length = 0
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config

    if (!config || error.response?.status !== 401 || config._retry) {
      return Promise.reject(error)
    }

    if (shouldSkipTokenRefresh(config.url) || !getRefreshToken()) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        queue.push({ resolve, reject })
      }).then((token) => {
        config._retry = true
        config.headers.Authorization = `Bearer ${token}`
        return apiClient(config)
      })
    }

    config._retry = true
    isRefreshing = true

    try {
      const refreshToken = getRefreshToken()

      const { data } = await axios.post<{ access_token: string; refresh_token: string }>(
        `${BASE_URL}${AUTH_ENDPOINTS.refresh}`,
        { refresh_token: refreshToken },
      )
      setTokens(data.access_token, data.refresh_token)
      processQueue(null, data.access_token)

      config.headers.Authorization = `Bearer ${data.access_token}`

      return apiClient(config)
    } catch (refreshError) {
      processQueue(refreshError, null)
      clearTokens()
      const path = window.location.pathname

      if (!path.startsWith(routes.login) && !path.startsWith(routes.register)) {
        window.location.href = routes.login
      }

      throw refreshError
    } finally {
      isRefreshing = false
    }
  },
)

attachErrorNormalization(apiClient)
