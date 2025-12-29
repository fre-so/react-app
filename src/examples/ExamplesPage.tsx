import { useEffect, useState } from "react"

import HighlightStepScrollytelling from "@/examples/scrollytelling/HighlightStep"
import StickySideScrollytelling from "@/examples/scrollytelling/StickySide"
import { cn } from "@/lib/utils"

const EXAMPLE_NAV = [
  {
    id: "sticky-side",
    label: "Sticky Side Scrollytelling",
  },
  {
    id: "highlight-step",
    label: "Highlight Step Scrollytelling",
  },
]

export default function ExamplesPage() {
  const [activeExampleId, setActiveExampleId] = useState(() => {
    if (typeof window === "undefined") {
      return EXAMPLE_NAV[0]?.id ?? ""
    }
    const hash = window.location.hash.replace(/^#/, "")
    const match = EXAMPLE_NAV.find((item) => item.id === hash)
    return match?.id ?? EXAMPLE_NAV[0]?.id ?? ""
  })
  const [mediaSide, setMediaSide] = useState<"left" | "right">("right")
  const activeExample = EXAMPLE_NAV.find((item) => item.id === activeExampleId)
  const isStickySide = activeExample?.id === "sticky-side"
  const isHighlightStep = activeExample?.id === "highlight-step"
  const hasMediaSideControl = isStickySide || isHighlightStep

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "")
      const match = EXAMPLE_NAV.find((item) => item.id === hash)
      const nextId = match?.id ?? EXAMPLE_NAV[0]?.id ?? ""
      setActiveExampleId((current) => (current === nextId ? current : nextId))
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !activeExampleId) {
      return
    }
    const nextHash = `#${activeExampleId}`
    if (window.location.hash !== nextHash) {
      window.location.hash = activeExampleId
    }
  }, [activeExampleId])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed left-0 top-0 h-screen w-72 border-r border-border p-6">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Examples
          </p>
          <h1 className="text-lg font-semibold">Demo Gallery</h1>
        </div>

        <nav className="mt-6 space-y-2">
          {EXAMPLE_NAV.map((item) => {
            const isActive = item.id === activeExampleId
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "w-full cursor-pointer border border-border px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-muted/60",
                  isActive && "bg-muted"
                )}
                onClick={() => setActiveExampleId(item.id)}
              >
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Controls
          </p>
          {hasMediaSideControl ? (
            <div className="mt-4 space-y-3">
              <p className="text-sm font-medium text-foreground">Media side</p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className={cn(
                    "cursor-pointer border border-border px-3 py-2 text-left text-sm transition-colors hover:bg-muted/60",
                    mediaSide === "left" && "bg-muted"
                  )}
                  onClick={() => setMediaSide("left")}
                >
                  Left
                </button>
                <button
                  type="button"
                  className={cn(
                    "cursor-pointer border border-border px-3 py-2 text-left text-sm transition-colors hover:bg-muted/60",
                    mediaSide === "right" && "bg-muted"
                  )}
                  onClick={() => setMediaSide("right")}
                >
                  Right
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              Select an example to see its controls.
            </p>
          )}
        </div>
      </aside>

      <main className="min-h-screen pl-72">
        <div className="p-8">
          {isStickySide ? (
            <section className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Scrollytelling
                </p>
                <h2 className="mt-2 text-xl font-semibold">Sticky side narrative</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Scroll the steps to change the sticky media panel.
                </p>
              </div>
              <div className="border border-border">
                <StickySideScrollytelling mediaSide={mediaSide} />
              </div>
            </section>
          ) : null}
          {isHighlightStep ? (
            <section className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Scrollytelling
                </p>
                <h2 className="mt-2 text-xl font-semibold">Highlight step narrative</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Keep the steps compact while the media swaps on scroll.
                </p>
              </div>
              <div className="border border-border">
                <HighlightStepScrollytelling mediaSide={mediaSide} />
              </div>
            </section>
          ) : null}
          {!isStickySide && !isHighlightStep ? (
            <p className="text-sm text-muted-foreground">Select an example from the sidebar.</p>
          ) : null}
        </div>
      </main>
    </div>
  )
}
