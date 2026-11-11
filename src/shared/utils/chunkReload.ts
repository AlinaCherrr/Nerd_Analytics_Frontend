const CHUNK_RELOAD_FLAG = "chunk-reload-attempted"

const CHUNK_ERROR_PATTERNS = [
  "Failed to fetch dynamically imported module",
  "Importing a module script failed",
  "error loading dynamically imported module",
  "Unable to preload CSS",
]

export const isChunkLoadError = (error: unknown): boolean => {
  if (!(error instanceof Error)) return false
  return CHUNK_ERROR_PATTERNS.some((pattern) => error.message.includes(pattern))
}

const readFlag = () => {
  try {
    return sessionStorage.getItem(CHUNK_RELOAD_FLAG) === "1"
  } catch {
    return false
  }
}

const writeFlag = () => {
  try {
    sessionStorage.setItem(CHUNK_RELOAD_FLAG, "1")
    return true
  } catch {
    return false
  }
}

export const clearChunkReloadFlag = () => {
  try {
    sessionStorage.removeItem(CHUNK_RELOAD_FLAG)
  } catch {
    /* storage недоступен — ничего не делаем */
  }
}

export const tryReloadForStaleChunk = (): boolean => {
  if (readFlag() || !writeFlag()) return false
  window.location.reload()
  return true
}
