import axios from "axios"

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean
  }
}

export const BASE_URL = import.meta.env.VITE_BASE_URL as string

export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
})
