import type { ComponentsGalleryNavItem, ControlConfigMap } from "../types"

import { MapRoutePreview } from "./map-route"
import MapRouteHorizontalTimelineDemo from "./map-route-htimeline"
import MapRouteVerticalTimelineDemo from "./map-route-vtimeline"

const MAP_ROUTE_CONTROLS = {
  mapRouteProgress: {
    label: "Route progress",
    options: [
      { label: "0%", value: "0" },
      { label: "25%", value: "0.25" },
      { label: "50%", value: "0.5" },
      { label: "75%", value: "0.75" },
      { label: "100%", value: "1" },
    ],
  },
} as const satisfies ControlConfigMap

export const MAPS_CONTROLS = {
  ...MAP_ROUTE_CONTROLS,
} as const satisfies ControlConfigMap

export type MapRouteControlId = keyof typeof MAP_ROUTE_CONTROLS
export type MapsControlId = MapRouteControlId

const MAP_ROUTE_NAV_ITEM = {
  id: "map-route",
  title: "Map Route",
  controls: ["mapRouteProgress"],
  section: {
    eyebrow: "Maps",
    description: "Preview the Chengdu to Beijing route and auto-fit bounds.",
    render: ({ mapRouteProgress }) => (
      <MapRoutePreview progress={mapRouteProgress} />
    ),
  },
} satisfies ComponentsGalleryNavItem<MapsControlId>

const MAP_ROUTE_VERTICAL_TIMELINE_NAV_ITEM = {
  id: "map-route-vertical-timeline",
  title: "Map Route Vertical Timeline",
  controls: [],
  section: {
    eyebrow: "Maps",
    description: "Scroll the vertical timeline to trace the route progression.",
    render: () => <MapRouteVerticalTimelineDemo />,
  },
} satisfies ComponentsGalleryNavItem<MapsControlId>

const MAP_ROUTE_HORIZONTAL_TIMELINE_NAV_ITEM = {
  id: "map-route-horizontal-timeline",
  title: "Map Route Horizontal Timeline",
  controls: [],
  section: {
    eyebrow: "Maps",
    description: "Scan the horizontal timeline to follow the route path.",
    render: () => <MapRouteHorizontalTimelineDemo />,
  },
} satisfies ComponentsGalleryNavItem<MapsControlId>

export const MAPS_NAV_ITEMS = [
  MAP_ROUTE_NAV_ITEM,
  MAP_ROUTE_VERTICAL_TIMELINE_NAV_ITEM,
  MAP_ROUTE_HORIZONTAL_TIMELINE_NAV_ITEM,
] satisfies ComponentsGalleryNavItem<MapsControlId>[]
