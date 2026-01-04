import { useEffect, useState, type ReactNode } from "react"

import HighlightStepScrollytelling from "@/best-practice/scrollytelling/HighlightStep"
import StickySideScrollytelling from "@/best-practice/scrollytelling/StickySide"
import TimelineScrollytelling from "@/best-practice/scrollytelling/Timeline"
import MapRoute, { type Coordinate } from "@/best-practice/maps/MapRoute"
import { cn } from "@/lib/utils"

type MediaSide = "left" | "right"
type TimelineOrientation = "horizontal" | "vertical"

type BestPracticeRenderProps = {
  mediaSide: MediaSide
  timelineOrientation: TimelineOrientation
}

type ControlConfigMap = {
  mediaSide: {
    label: string
    options: Array<{ label: string; value: MediaSide }>
  }
  timelineOrientation: {
    label: string
    options: Array<{ label: string; value: TimelineOrientation }>
  }
}

type ControlId = keyof ControlConfigMap

type ControlStateMap = {
  [Key in ControlId]: {
    value: ControlConfigMap[Key]["options"][number]["value"]
    onChange: (value: ControlConfigMap[Key]["options"][number]["value"]) => void
  }
}

type BestPracticeNavItem = {
  id: string
  title: string
  controls: ControlId[]
  section: {
    eyebrow: string
    description: string
    render: (props: BestPracticeRenderProps) => ReactNode
  }
}

const MAP_ROUTE_COORDINATES: ReadonlyArray<Coordinate> = [
  [104.0668, 30.5728],
  [116.4074, 39.9042],
]

const CONTROL_CONFIGS: ControlConfigMap = {
  mediaSide: {
    label: "Media side",
    options: [
      { label: "Left", value: "left" },
      { label: "Right", value: "right" },
    ],
  },
  timelineOrientation: {
    label: "Timeline layout",
    options: [
      { label: "Horizontal", value: "horizontal" },
      { label: "Vertical", value: "vertical" },
    ],
  },
}

const BEST_PRACTICE_NAV: BestPracticeNavItem[] = [
  {
    id: "sticky-side",
    title: "Sticky Side Scrollytelling",
    controls: ["mediaSide"],
    section: {
      eyebrow: "Scrollytelling",
      description: "Scroll the steps to change the sticky media panel.",
      render: ({ mediaSide }) => <StickySideScrollytelling mediaSide={mediaSide} />,
    },
  },
  {
    id: "highlight-step",
    title: "Highlight Step Scrollytelling",
    controls: ["mediaSide"],
    section: {
      eyebrow: "Scrollytelling",
      description: "Keep the steps compact while the media swaps on scroll.",
      render: ({ mediaSide }) => <HighlightStepScrollytelling mediaSide={mediaSide} />,
    },
  },
  {
    id: "timeline",
    title: "Timeline Scrollytelling",
    controls: ["mediaSide", "timelineOrientation"],
    section: {
      eyebrow: "Scrollytelling",
      description: "Switch between horizontal and vertical timelines to match the story.",
      render: ({ mediaSide, timelineOrientation }) => (
        <TimelineScrollytelling mediaSide={mediaSide} orientation={timelineOrientation} />
      ),
    },
  },
  {
    id: "map-route",
    title: "Map Route",
    controls: [],
    section: {
      eyebrow: "Maps",
      description: "Preview the Chengdu to Beijing route and auto-fit bounds.",
      render: () => (
        <MapRoute
          className="mx-auto max-w-200"
          coordinates={MAP_ROUTE_COORDINATES}
        />
      ),
    },
  },
]

export default function BestPracticePage() {
  const [activeBestPracticeId, setActiveBestPracticeId] = useState(() => {
    if (typeof window === "undefined") {
      return BEST_PRACTICE_NAV[0]?.id ?? ""
    }
    const hash = window.location.hash.replace(/^#/, "")
    const match = BEST_PRACTICE_NAV.find((item) => item.id === hash)
    return match?.id ?? BEST_PRACTICE_NAV[0]?.id ?? ""
  })
  const [mediaSide, setMediaSide] = useState<MediaSide>("right")
  const [timelineOrientation, setTimelineOrientation] =
    useState<TimelineOrientation>("horizontal")
  const activeBestPractice = BEST_PRACTICE_NAV.find(
    (item) => item.id === activeBestPracticeId
  )
  const activeControls = activeBestPractice?.controls ?? []
  const hasControls = activeControls.length > 0
  const controlState: ControlStateMap = {
    mediaSide: { value: mediaSide, onChange: setMediaSide },
    timelineOrientation: {
      value: timelineOrientation,
      onChange: setTimelineOrientation,
    },
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "")
      const match = BEST_PRACTICE_NAV.find((item) => item.id === hash)
      const nextId = match?.id ?? BEST_PRACTICE_NAV[0]?.id ?? ""
      setActiveBestPracticeId((current) => (current === nextId ? current : nextId))
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !activeBestPracticeId) {
      return
    }
    const nextHash = `#${activeBestPracticeId}`
    if (window.location.hash !== nextHash) {
      window.location.hash = activeBestPracticeId
    }
  }, [activeBestPracticeId])

  const renderControl = <Key extends ControlId>(controlId: Key) => {
    const config = CONTROL_CONFIGS[controlId]
    const state = controlState[controlId]

    return (
      <div key={controlId} className="space-y-3">
        <p className="text-sm font-medium text-foreground">{config.label}</p>
        <div className="flex flex-col gap-2">
          {config.options.map((option) => {
            const isActive = option.value === state.value
            return (
              <button
                key={option.value}
                type="button"
                className={cn(
                  "cursor-pointer border border-border px-3 py-2 text-left text-sm transition-colors hover:bg-muted/60",
                  isActive && "bg-muted"
                )}
                onClick={() => state.onChange(option.value)}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed left-0 top-0 h-screen w-72 border-r border-border p-6">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Best Practice
          </p>
          <h1 className="text-lg font-semibold">Demo Gallery</h1>
        </div>

        <nav className="mt-6 space-y-2">
          {BEST_PRACTICE_NAV.map((item) => {
            const isActive = item.id === activeBestPracticeId
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "w-full cursor-pointer border border-border px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-muted/60",
                  isActive && "bg-muted"
                )}
                onClick={() => setActiveBestPracticeId(item.id)}
              >
                {item.title}
              </button>
            )
          })}
        </nav>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Controls
          </p>
          {hasControls ? (
            <div className="mt-4 space-y-6">
              {activeControls.map((controlId) => renderControl(controlId))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              Select a component to see its controls.
            </p>
          )}
        </div>
      </aside>

      <main className="min-h-screen pl-72">
        <div className="p-8">
          {activeBestPractice ? (
            <section className="space-y-4">
              <div className="min-h-40">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {activeBestPractice.section.eyebrow}
                </p>
                <h2 className="mt-2 text-xl font-semibold">{activeBestPractice.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {activeBestPractice.section.description}
                </p>
              </div>
              <div className="border border-border">
                {activeBestPractice.section.render({
                  mediaSide,
                  timelineOrientation,
                })}
              </div>
            </section>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select a component from the sidebar.
            </p>
          )}
          <section className="mt-16 flex h-screen items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 p-6">
            <div className="max-w-md space-y-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Placeholder
              </p>
              <h3 className="text-lg font-semibold text-foreground">
                Sticky release test section
              </h3>
              <p className="text-sm text-muted-foreground">
                Extra viewport-height content to verify sticky panels stop after the component
                scrolls away.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
