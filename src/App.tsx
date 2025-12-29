import { useEffect, useState } from "react"

import ExamplesPage from "@/examples/ExamplesPage"

function usePathname() {
  const [pathname, setPathname] = useState(
    typeof window === "undefined" ? "/" : window.location.pathname
  )

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname)
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  return pathname
}

function App() {
  const pathname = usePathname()

  if (pathname.startsWith("/examples")) {
    return <ExamplesPage />
  }

  return (
    <div className="fixed inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
          Present Beyond
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
          Move beyond slides.
          <br />
        </h1>
      </div>
    </div>
  )
}

export default App
