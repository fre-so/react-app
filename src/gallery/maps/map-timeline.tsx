import { MapTimeline, type MapTimelineStepRenderProps } from "@/components/maps/MapTimeline"
import type { Coordinate } from "@/components/maps/MapRoute"
import { cn } from "@/lib/utils"

import type { ComponentsGalleryNavItem, ControlConfigMap } from "../types"

const MAP_TIMELINE_STOPS = [
  {
    label: "Chengdu",
    title: "Western gateway",
    description: "Start the cross-country story with a steady climb.",
    coordinate: [104.0668, 30.5728] as Coordinate,
  },
  {
    label: "Xi'an",
    title: "Historic core",
    description: "Pass through the heritage capital with a tighter arc.",
    coordinate: [108.9398, 34.3416] as Coordinate,
  },
  {
    label: "Zhengzhou",
    title: "Signal midpoint",
    description: "Align the route around the central transit corridor.",
    coordinate: [113.6254, 34.7466] as Coordinate,
  },
  {
    label: "Beijing",
    title: "Northern arrival",
    description: "Close the timeline with a fast, clean approach.",
    coordinate: [116.4074, 39.9042] as Coordinate,
  },
]

const MAP_TIMELINE_ROUTE: ReadonlyArray<Coordinate> = MAP_TIMELINE_STOPS.map(
  (stop) => stop.coordinate
)

export const MAP_TIMELINE_CONTROLS = {
  mapTimelineLayout: {
    label: "Timeline layout",
    options: [
      { label: "Vertical", value: "vertical" },
      { label: "Horizontal", value: "horizontal" },
    ],
  },
} as const satisfies ControlConfigMap

export type MapTimelineControlId = keyof typeof MAP_TIMELINE_CONTROLS

const formatCoordinate = (point: Coordinate) =>
  `${point[0].toFixed(2)}°, ${point[1].toFixed(2)}°`

function MapTimelineVerticalStep({
  stepIndex,
  isActive,
  routeItem,
}: MapTimelineStepRenderProps) {
  const stop = MAP_TIMELINE_STOPS[stepIndex]

  if (!stop) return null

  return (
    <div className="space-y-2 px-4 text-left">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        {stop.label}
      </p>
      <h3
        className={cn(
          "text-xl font-semibold",
          isActive ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {stop.title}
      </h3>
      <p className="text-sm text-muted-foreground">{stop.description}</p>
      <p className="text-xs text-muted-foreground">
        {formatCoordinate(routeItem)}
      </p>
    </div>
  )
}

function MapTimelineHorizontalStep({
  stepIndex,
  isActive,
  routeItem,
}: MapTimelineStepRenderProps) {
  const stop = MAP_TIMELINE_STOPS[stepIndex]

  if (!stop) return null

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {stop.label}
      </span>
      <span
        className={cn(
          "text-sm font-semibold transition-colors group-hover:text-foreground",
          isActive ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {stop.title}
      </span>
      <span className="text-[0.65rem] text-muted-foreground">
        {formatCoordinate(routeItem)}
      </span>
    </div>
  )
}

export const MAP_TIMELINE_NAV_ITEM = {
  id: "map-timeline",
  title: "Map Timeline",
  controls: ["mapTimelineLayout"],
  section: {
    eyebrow: "Maps",
    description: "Scroll the timeline to reveal the route progression.",
    render: ({ mapTimelineLayout }) => {
      const layout = mapTimelineLayout ?? "vertical"
      const StepComponent =
        layout === "horizontal"
          ? MapTimelineHorizontalStep
          : MapTimelineVerticalStep

      return (
        <MapTimeline
          layout={layout}
          route={MAP_TIMELINE_ROUTE}
          stepScrollDistance={320}
          mapSide="right"
          stepRatio={0.55}
          StepComponent={StepComponent}
        />
      )
    },
  },
} satisfies ComponentsGalleryNavItem<MapTimelineControlId>
