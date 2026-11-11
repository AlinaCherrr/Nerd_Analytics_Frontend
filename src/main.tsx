import { StrictMode, type ErrorInfo } from "react"
import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { tryReloadForStaleChunk } from "shared/utils/chunkReload"
import "./index.css"
import App from "./App.tsx"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
})

window.addEventListener("vite:preloadError", (event) => {
  if (tryReloadForStaleChunk()) event.preventDefault()
})

const reportError = (kind: string) => (error: unknown, info: ErrorInfo) => {
  console.error(`[${kind}]`, error, info.componentStack)
}

createRoot(document.getElementById("root")!, {
  onUncaughtError: reportError("uncaught"),
  onCaughtError: reportError("caught"),
}).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
