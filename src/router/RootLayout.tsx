import { Suspense, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { PageLoader } from "shared/ui"
import { clearChunkReloadFlag } from "shared/utils/chunkReload"

export const RootLayout = () => {
  useEffect(() => {
    clearChunkReloadFlag()
  }, [])

  return (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  )
}
