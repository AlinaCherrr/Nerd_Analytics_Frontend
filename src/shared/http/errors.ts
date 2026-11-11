import axios, { type AxiosError, type AxiosInstance } from "axios"

export class ApiError extends Error {
  status: number | null
  code?: string
  details?: unknown

  constructor(message: string, status: number | null, code?: string, details?: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.code = code
    this.details = details
  }
}

export const DEFAULT_ERROR_MESSAGE = "Произошла непредвиденная ошибка. Попробуйте позже."
const NETWORK_ERROR_MESSAGE = "Нет соединения с сервером. Проверьте интернет-подключение."

interface ValidationErrorItem {
  msg?: string
}

interface ErrorResponseBody {
  message?: unknown
  detail?: unknown
  code?: string
}

const extractMessage = (data?: ErrorResponseBody): string | undefined => {
  if (typeof data?.message === "string" && data.message) return data.message
  if (typeof data?.detail === "string" && data.detail) return data.detail
  if (Array.isArray(data?.detail)) {
    const messages = (data.detail as ValidationErrorItem[])
      .map((item) => item?.msg)
      .filter((msg): msg is string => typeof msg === "string" && msg.length > 0)
    if (messages.length > 0) return messages.join(", ")
  }
  return undefined
}

export const normalizeApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) return error

  if (!axios.isAxiosError(error)) {
    return new ApiError(DEFAULT_ERROR_MESSAGE, null)
  }

  const axiosError = error as AxiosError<ErrorResponseBody>

  if (!axiosError.response) {
    return new ApiError(NETWORK_ERROR_MESSAGE, null)
  }

  const data = axiosError.response.data

  return new ApiError(
    extractMessage(data) ?? DEFAULT_ERROR_MESSAGE,
    axiosError.response.status,
    data?.code,
    data,
  )
}

export const getErrorMessage = (
  error: unknown,
  fallback: string = DEFAULT_ERROR_MESSAGE,
  map?: Record<string, string>,
): string => {
  if (error instanceof ApiError) return map?.[error.message] ?? error.message
  return fallback
}

export const attachErrorNormalization = (client: AxiosInstance) => {
  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(normalizeApiError(error)),
  )
}
